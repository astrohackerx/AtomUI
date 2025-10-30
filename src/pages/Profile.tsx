import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Link } from 'react-router-dom';
import { AnchorProvider } from '@coral-xyz/anchor';
import { getProgram, getAtomIdPDA, getSasAttestationPDA } from '../lib/anchor-program';
import { formatAtom, getRankName, SAS_CREDENTIAL, SAS_SCHEMA, SOLANA_NETWORK } from '../lib/constants';

export default function Profile() {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const { connection } = useConnection();

  const [loading, setLoading] = useState(true);
  const [atomId, setAtomId] = useState<any>(null);
  const [sasAttestationPda, setSasAttestationPda] = useState<string>('');

  useEffect(() => {
    if (publicKey) {
      fetchProfile();
    }
  }, [publicKey, connection]);

  const fetchProfile = async () => {
    if (!publicKey) return;

    setLoading(true);

    try {
      const wallet = {
        publicKey,
        signTransaction,
        signAllTransactions,
      };

      const provider = new AnchorProvider(connection, wallet as any, {
        commitment: 'confirmed',
      });

      const program = getProgram(provider);
      const [atomIdPda] = getAtomIdPDA(publicKey);

      try {
        const atomIdData = await (program.account as any).atomId.fetch(atomIdPda);
        setAtomId(atomIdData);

        const [sasAttestation] = getSasAttestationPDA(
          SAS_CREDENTIAL,
          SAS_SCHEMA,
          publicKey
        );
        setSasAttestationPda(sasAttestation.toBase58());
      } catch (err) {
        setAtomId(null);
        setSasAttestationPda('');
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
        <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <h1 className="text-4xl font-special mb-5">Your Profile</h1>
          <p className="text-gray-400">Please connect your wallet to view your profile</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
        <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <div className="loading-spinner mx-auto mb-5"></div>
          <p className="text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!atomId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
        <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <h1 className="text-4xl font-special mb-5">No AtomID Found</h1>
          <p className="text-gray-400 mb-5">You haven't created an AtomID yet. Start your journey by burning $ATOM.</p>
          <Link to="/create" className="px-10 py-4 text-base font-mono uppercase tracking-wider border-2 border-white bg-white text-black hover:-translate-y-0.5 transition-transform inline-block">
            Create Your AtomID
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[clamp(32px,5vw,56px)] font-special mb-4 sm:mb-5 px-4">Your AtomID</h1>
          <p className="font-mono text-gray-400 text-xs sm:text-sm break-all px-4">{publicKey.toBase58()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 mx-4">
          <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
            <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">Total Burned</div>
            <div className="text-3xl font-bold text-orange-500 font-mono">
              {formatAtom(atomId.totalBurned.toNumber())} $ATOM
            </div>
          </div>

          <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
            <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">Current Rank</div>
            <div className="text-3xl font-bold font-special">{getRankName(atomId.rank)}</div>
            <div className="text-sm text-gray-400 mt-2">Level {atomId.rank}</div>
          </div>

          <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
            <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">Created At</div>
            <div className="text-xl font-mono">
              Slot {atomId.createdAtSlot.toString()}
            </div>
          </div>
        </div>

        <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 mx-4">
          <h3 className="text-2xl font-special mb-5">Your Oath</h3>
          <blockquote className="font-mono text-lg text-gray-300 italic border-l-4 border-white pl-5">
            {atomId.metadata || '(No oath recorded)'}
          </blockquote>
        </div>

        <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 mx-4">
          <h3 className="text-2xl font-special mb-5">SAS Attestation</h3>
          <p className="text-gray-400 mb-5">
            Your AtomID rank is verified through a Solana Attestation Service (SAS) credential.
            This attestation serves as an independent, verifiable proof of your rank that any dApp can check.
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4">
              <span className="text-gray-400">Attestation Address:</span>
              <a
                href={`https://explorer.solana.com/address/${sasAttestationPda}?cluster=${SOLANA_NETWORK}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm hover:text-gray-400 transition-colors"
              >
                {sasAttestationPda.slice(0, 8)}...{sasAttestationPda.slice(-8)}
              </a>
            </div>
            <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4">
              <span className="text-gray-400">Verified Rank:</span>
              <span className="font-special text-xl">{getRankName(atomId.rank)}</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4">
              <span className="text-gray-400">Total Burned (Verified):</span>
              <span className="font-mono text-xl text-orange-500">{formatAtom(atomId.totalBurned.toNumber())} $ATOM</span>
            </div>
          </div>
        </div>

        <div className="text-center mx-4">
          <Link to="/upgrade" className="px-10 py-4 text-base font-mono uppercase tracking-wider border-2 border-white bg-white text-black hover:-translate-y-0.5 transition-transform inline-block">
            Upgrade Your AtomID
          </Link>
        </div>
      </div>
    </div>
  );
}
