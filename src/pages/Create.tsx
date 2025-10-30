import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { AnchorProvider, BN } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { SystemProgram, ComputeBudgetProgram } from '@solana/web3.js';
import { getProgram, getAtomIdPDA, getConfigPDA, getSasAttestationPDA, getSasAuthorityPDA } from '../lib/anchor-program';
import { ATOM_MINT, MIN_CREATE_BURN, formatAtom, parseAtom, SAS_CREDENTIAL, SAS_SCHEMA, SAS_PROGRAM_ID } from '../lib/constants';
import SuccessModal from '../components/SuccessModal';

export default function Create() {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const { connection } = useConnection();
  const navigate = useNavigate();

  const [burnAmount, setBurnAmount] = useState('');
  const [metadata, setMetadata] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [txSignature, setTxSignature] = useState('');
  const [checking, setChecking] = useState(true);
  const [walletBalance, setWalletBalance] = useState<number>(0);

  useEffect(() => {
    const checkExistingAtomId = async () => {
      if (!publicKey || !signTransaction || !signAllTransactions) {
        setChecking(false);
        return;
      }

      try {
        const [atomIdPda] = getAtomIdPDA(publicKey);
        const accountInfo = await connection.getAccountInfo(atomIdPda);

        if (accountInfo) {
          navigate('/profile');
        } else {
          try {
            const userTokenAccount = await getAssociatedTokenAddress(ATOM_MINT, publicKey);
            const tokenAccount = await getAccount(connection, userTokenAccount);
            const balance = Number(tokenAccount.amount);
            setWalletBalance(balance);
          } catch (balanceErr) {
            setWalletBalance(0);
          }
        }
      } catch (err) {
        console.error('Error checking AtomID:', err);
      } finally {
        setChecking(false);
      }
    };

    checkExistingAtomId();
  }, [publicKey, signTransaction, signAllTransactions, connection, navigate]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowSuccessModal(false);

    if (!publicKey || !signTransaction || !signAllTransactions) {
      setError('Please connect your wallet');
      return;
    }

    if (!burnAmount || burnAmount.trim() === '') {
      setError('Please enter a burn amount');
      return;
    }

    const parsedAmount = parseAtom(burnAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid burn amount');
      return;
    }

    if (parsedAmount < MIN_CREATE_BURN) {
      setError(`Minimum burn amount is ${formatAtom(MIN_CREATE_BURN)} $ATOM`);
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

      const [sasAuthority] = getSasAuthorityPDA();

      const burnAmountBN = new BN(parsedAmount.toString());

      const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: 400_000
      });

      const tx = await program.methods
        .createAtomid(burnAmountBN, metadata || null)
        .accounts({
          atomId: atomIdPda,
          atomConfig: configPda,
          user: publicKey,
          userTokenAccount,
          atomMint: ATOM_MINT,
          sasAttestation,
          sasCredential: SAS_CREDENTIAL,
          sasSchema: SAS_SCHEMA,
          sasAuthority,
          sasProgram: SAS_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .preInstructions([modifyComputeUnits])
        .rpc({
          skipPreflight: false,
          maxRetries: 3,
        });

      setTxSignature(tx);
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error('Error creating AtomID:', err);
      setError(err.message || 'Failed to create AtomID');
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
        <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <h1 className="text-4xl font-special mb-5">Create Your AtomID</h1>
          <p className="text-gray-400">Please connect your wallet to create an AtomID</p>
        </div>
      </div>
    );
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
        <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <h1 className="text-4xl font-special mb-5">Create Your AtomID</h1>
          <div className="loading-spinner mx-auto mb-5"></div>
          <p className="text-gray-400">Checking for existing AtomID...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[clamp(32px,5vw,56px)] font-special mb-4 sm:mb-5 px-4">Create Your AtomID</h1>
          <p className="text-lg sm:text-xl text-gray-400 px-4">Burn $ATOM and forge your on-chain identity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
            <h3 className="text-2xl font-special mb-5">The Ritual of Creation</h3>
            <div className="bg-white/5 border border-white/10 p-4 mb-5 flex justify-between items-center">
              <span className="text-gray-400">Your Balance:</span>
              <span className="font-mono text-xl">{formatAtom(walletBalance)} $ATOM</span>
            </div>
            <p className="text-gray-400 mb-5">
              Creating an AtomID requires burning at least <span className="text-white font-mono">{formatAtom(MIN_CREATE_BURN)} $ATOM</span>.
            </p>
            <p className="text-gray-400 mb-5">
              These tokens will be permanently destroyed, reducing the total supply forever.
              In return, you receive a soulbound identity that proves your commitment to the Lost Bitcoin Layer.
            </p>
            <div className="bg-black border border-white/20 p-5 mt-8">
              <h4 className="text-xl font-special mb-4">What You'll Receive:</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-2"><span className="text-white">▸</span> Permanent on-chain identity linked to your wallet</li>
                <li className="flex gap-2"><span className="text-white">▸</span> Initial rank based on burn amount</li>
                <li className="flex gap-2"><span className="text-white">▸</span> Verifiable SAS attestation with your rank proof</li>
                <li className="flex gap-2"><span className="text-white">▸</span> Ability to store a message or oath (up to 200 characters)</li>
                <li className="flex gap-2"><span className="text-white">▸</span> Eligibility for future DAO voting and gated features</li>
                <li className="flex gap-2"><span className="text-white">▸</span> Position on the eternal leaderboard</li>
              </ul>
            </div>
          </div>

          <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleCreate} className="space-y-5 sm:space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="burnAmount" className="block mb-2 text-gray-300 font-mono uppercase text-sm tracking-wider">
                  Burn Amount (minimum {formatAtom(MIN_CREATE_BURN)} $ATOM)
                </label>
                <input
                  id="burnAmount"
                  type="number"
                  step="0.01"
                  min={MIN_CREATE_BURN / 1_000_000}
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  placeholder={`${MIN_CREATE_BURN / 1_000_000}`}
                  required
                  disabled={loading}
                  className="w-full bg-black border border-white/30 text-white px-4 py-3 font-mono focus:border-white focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="metadata" className="block mb-2 text-gray-300 font-mono uppercase text-sm tracking-wider">
                  Your Oath / Message (optional, max 200 characters)
                </label>
                <textarea
                  id="metadata"
                  value={metadata}
                  onChange={(e) => setMetadata(e.target.value)}
                  placeholder="I burn for truth..."
                  maxLength={200}
                  rows={4}
                  disabled={loading}
                  className="w-full bg-black border border-white/30 text-white px-4 py-3 font-mono focus:border-white focus:outline-none transition-colors disabled:opacity-50 resize-none"
                />
                <div className="text-right text-sm text-gray-400 mt-1">
                  {metadata.length} / 200 characters
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
                    Creating AtomID...
                  </span>
                ) : (
                  'Burn & Create AtomID'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        title="AtomID Created!"
        message="Your AtomID has been successfully created and the tokens have been burned. Your identity is now permanent on the blockchain."
        txSignature={txSignature}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/profile');
        }}
      />
    </div>
  );
}
