import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider } from '@coral-xyz/anchor';
import { getProgram } from '../lib/anchor-program';
import { PROGRAM_ID, SOLANA_NETWORK } from '../lib/constants';
import { formatAtom, getRankName } from '../lib/constants';

interface AtomIdData {
  owner: string;
  totalBurned: number;
  rank: number;
  metadata: string;
}

export default function Leaderboard() {
  const { connection } = useConnection();
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const [accounts, setAccounts] = useState<AtomIdData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, [connection]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError('');

    try {
      const wallet = publicKey && signTransaction && signAllTransactions
        ? { publicKey, signTransaction, signAllTransactions }
        : null;

      const provider = new AnchorProvider(
        connection,
        wallet as any,
        { commitment: 'confirmed' }
      );

      const program = getProgram(provider);

      const atomIdAccounts = await connection.getProgramAccounts(PROGRAM_ID);

      const parsedAccounts: AtomIdData[] = [];

      for (const { pubkey, account } of atomIdAccounts) {
        try {
          const atomIdData = (program.coder.accounts as any).decode('atomId', account.data);
          if (atomIdData && atomIdData.owner) {
            parsedAccounts.push({
              owner: atomIdData.owner.toBase58(),
              totalBurned: atomIdData.totalBurned.toNumber(),
              rank: atomIdData.rank,
              metadata: atomIdData.metadata || '',
            });
          }
        } catch (err) {
        }
      }

      parsedAccounts.sort((a, b) => b.totalBurned - a.totalBurned);
      setAccounts(parsedAccounts.slice(0, 100));
    } catch (err: any) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
        <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <div className="loading-spinner mx-auto mb-5"></div>
          <p className="text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[clamp(32px,5vw,56px)] font-special mb-4 sm:mb-5 px-4">Leaderboard</h1>
          <p className="text-lg sm:text-xl text-gray-400 px-4">The eternal registry of burned $ATOM</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded mb-8 mx-4">{error}</div>}

        {accounts.length === 0 ? (
          <div className="bg-black/50 border border-white/20 p-8 sm:p-10 text-center mx-4">
            <p className="text-gray-400">No AtomIDs found yet. Be the first to create one!</p>
          </div>
        ) : (
          <div className="bg-black/50 border border-white/20 p-4 sm:p-6 lg:p-10 overflow-x-auto mx-4">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-mono uppercase text-xs sm:text-sm text-gray-400">Rank</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-mono uppercase text-xs sm:text-sm text-gray-400">Address</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-mono uppercase text-xs sm:text-sm text-gray-400">Total Burned</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-mono uppercase text-xs sm:text-sm text-gray-400">Tier</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-mono uppercase text-xs sm:text-sm text-gray-400">Oath</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => (
                  <tr key={account.owner} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="text-xl sm:text-2xl">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && <span className="font-mono text-sm sm:text-base">#{index + 1}</span>}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <a
                        href={`https://solscan.io/account/${account.owner}${SOLANA_NETWORK === 'mainnet' ? '' : '?cluster=devnet'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs sm:text-sm hover:text-gray-400 transition-colors"
                      >
                        {truncateAddress(account.owner)}
                      </a>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className="font-mono text-orange-500 text-xs sm:text-sm">
                        {formatAtom(account.totalBurned)} $ATOM
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className="font-special text-xs sm:text-base">
                        {getRankName(account.rank)}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className="text-gray-400 text-xs sm:text-sm italic">
                        {account.metadata || '—'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center mt-8 sm:mt-10 px-4">
          <button onClick={fetchLeaderboard} className="px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors">
            Refresh Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
