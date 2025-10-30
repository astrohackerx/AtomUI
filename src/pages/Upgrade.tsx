import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { AnchorProvider, BN } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { ComputeBudgetProgram, SystemProgram } from '@solana/web3.js';
import { getProgram, getAtomIdPDA, getConfigPDA, getSasAttestationPDA, getSasEventAuthorityPDA, getSasAuthorityPDA } from '../lib/anchor-program';
import { ATOM_MINT, formatAtom, parseAtom, getRankName, ATOM_DECIMALS, SAS_CREDENTIAL, SAS_SCHEMA, SAS_PROGRAM_ID } from '../lib/constants';
import SuccessModal from '../components/SuccessModal';

export default function Upgrade() {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const { connection } = useConnection();
  const navigate = useNavigate();

  const [burnAmount, setBurnAmount] = useState('');
  const [metadata, setMetadata] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [txSignature, setTxSignature] = useState('');
  const [currentAtomId, setCurrentAtomId] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState<number>(0);

  useEffect(() => {
    if (publicKey) {
      fetchCurrentAtomId();
    }
  }, [publicKey, connection]);

  const fetchCurrentAtomId = async () => {
    if (!publicKey) return;

    setFetchLoading(true);
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
        const atomId = await (program.account as any).atomId.fetch(atomIdPda);
        setCurrentAtomId(atomId);
        setMetadata(atomId.metadata || '');

        try {
          const userTokenAccount = await getAssociatedTokenAddress(ATOM_MINT, publicKey);
          const tokenAccount = await getAccount(connection, userTokenAccount);
          const balance = Number(tokenAccount.amount);
          console.log('Wallet balance fetched:', balance, 'formatted:', formatAtom(balance));
          setWalletBalance(balance);
        } catch (balanceErr) {
          console.log('Error fetching balance, setting to 0:', balanceErr);
          setWalletBalance(0);
        }
      } catch (err) {
        setError('You do not have an AtomID yet. Please create one first.');
      }
    } catch (err: any) {
      console.error('Error fetching AtomID:', err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowSuccessModal(false);

    if (!publicKey || !signTransaction || !signAllTransactions) {
      setError('Please connect your wallet');
      return;
    }

    if (!currentAtomId) {
      setError('You need to create an AtomID first');
      return;
    }

    if (!burnAmount || burnAmount.trim() === '') {
      setError('Please enter a burn amount');
      return;
    }

    const parsedAmount = parseAtom(burnAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid burn amount greater than 0');
      return;
    }

    if (metadata.length > 200) {
      setError('Metadata must be 200 characters or less');
      return;
    }

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
      const [configPda] = getConfigPDA();

      const userTokenAccount = await getAssociatedTokenAddress(
        ATOM_MINT,
        publicKey
      );

      const [sasAttestation] = getSasAttestationPDA(
        SAS_CREDENTIAL,
        SAS_SCHEMA,
        publicKey
      );

      const [sasEventAuthority] = getSasEventAuthorityPDA();
      const [sasAuthority] = getSasAuthorityPDA();

      console.log('Upgrading AtomID with burn amount:', parsedAmount, 'Type:', typeof parsedAmount);
      console.log('SAS Attestation:', sasAttestation.toString());
      console.log('SAS Authority PDA:', sasAuthority.toString());
      const burnAmountBN = new BN(parsedAmount.toString());
      console.log('BN created successfully:', burnAmountBN.toString());

      const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: 400_000
      });

      const latestBlockhash = await connection.getLatestBlockhash('confirmed');

      const tx = await program.methods
        .upgradeAtomid(burnAmountBN, metadata || null)
        .accounts({
          atomId: atomIdPda,
          atomConfig: configPda,
          user: publicKey,
          userTokenAccount,
          atomMint: ATOM_MINT,
          oldSasAttestation: sasAttestation,
          newSasAttestation: sasAttestation,
          sasCredential: SAS_CREDENTIAL,
          sasSchema: SAS_SCHEMA,
          sasAuthority,
          sasEventAuthority,
          sasProgram: SAS_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .preInstructions([modifyComputeUnits])
        .rpc({
          skipPreflight: false,
          maxRetries: 3,
        });

      console.log('Transaction successful:', tx);
      setTxSignature(tx);
      setShowSuccessModal(true);
      await fetchCurrentAtomId();
    } catch (err: any) {
      console.error('Error upgrading AtomID:', err);

      if (err.message && err.message.includes('already been processed')) {
        setShowSuccessModal(true);
        await fetchCurrentAtomId();
      } else {
        setError(err.message || 'Failed to upgrade AtomID');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
        <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <h1 className="text-4xl font-special mb-5">Upgrade Your AtomID</h1>
          <p className="text-gray-400">Please connect your wallet to upgrade your AtomID</p>
        </div>
      </div>
    );
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
        <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <div className="loading-spinner mx-auto mb-5"></div>
          <p className="text-gray-400">Loading your AtomID...</p>
        </div>
      </div>
    );
  }

  if (!currentAtomId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
        <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <h1 className="text-4xl font-special mb-5">No AtomID Found</h1>
          <p className="text-gray-400 mb-5">You need to create an AtomID before you can upgrade it.</p>
          <button
            onClick={() => navigate('/create')}
            className="px-10 py-4 text-base font-mono uppercase tracking-wider border-2 border-white bg-white text-black hover:-translate-y-0.5 transition-transform"
          >
            Create AtomID
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[clamp(32px,5vw,56px)] font-special mb-4 sm:mb-5 px-4">Upgrade Your AtomID</h1>
          <p className="text-lg sm:text-xl text-gray-400 px-4">Burn more $ATOM to increase your rank</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
            <h3 className="text-2xl font-special mb-5">Current Status</h3>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 flex justify-between items-center">
                <span className="text-gray-400">Wallet Balance:</span>
                <span className="font-mono text-xl">{formatAtom(walletBalance)} $ATOM</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 flex justify-between items-center">
                <span className="text-gray-400">Total Burned:</span>
                <span className="font-mono text-xl text-orange-500">{formatAtom(currentAtomId.totalBurned.toNumber())} $ATOM</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 flex justify-between items-center">
                <span className="text-gray-400">Current Rank:</span>
                <span className="font-mono text-xl">{getRankName(currentAtomId.rank)}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4">
                <div className="text-gray-400 mb-2">Your Oath:</div>
                <div className="font-mono text-sm">{currentAtomId.metadata || '(No message)'}</div>
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleUpgrade} className="space-y-5 sm:space-y-6">
              {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded">{error}</div>}

              <div>
                <label htmlFor="burnAmount" className="block mb-2 text-gray-300 font-mono uppercase text-sm tracking-wider">
                  Additional Burn Amount (any amount)
                </label>
                <input
                  id="burnAmount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  placeholder="100.00"
                  required
                  disabled={loading}
                  className="w-full bg-black border border-white/30 text-white px-4 py-3 font-mono focus:border-white focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="metadata" className="block mb-2 text-gray-300 font-mono uppercase text-sm tracking-wider">
                  Update Your Oath / Message (optional, max 200 characters)
                </label>
                <textarea
                  id="metadata"
                  value={metadata}
                  onChange={(e) => setMetadata(e.target.value)}
                  placeholder="Update your message..."
                  maxLength={200}
                  rows={4}
                  disabled={loading}
                  className="w-full bg-black border border-white/30 text-white px-4 py-3 font-mono focus:border-white focus:outline-none transition-colors disabled:opacity-50 resize-none"
                />
                <div className="text-right text-sm text-gray-400 mt-1">
                  {metadata.length} / 200 characters
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">New Total Burned:</span>
                  <span className="font-mono text-xl text-orange-500">
                    {burnAmount && !isNaN(parseAtom(burnAmount))
                      ? formatAtom(
                          currentAtomId.totalBurned.toNumber() +
                            parseAtom(burnAmount)
                        )
                      : formatAtom(currentAtomId.totalBurned.toNumber())}{' '}
                    $ATOM
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-10 py-4 text-base font-mono uppercase tracking-wider border-2 border-white bg-white text-black hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="loading-spinner"></span>
                    Upgrading AtomID...
                  </span>
                ) : (
                  'Burn & Upgrade'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        title="AtomID Upgraded!"
        message="Your AtomID has been successfully upgraded. Your new burn amount has been recorded on the blockchain."
        txSignature={txSignature}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/profile');
        }}
      />
    </div>
  );
}
