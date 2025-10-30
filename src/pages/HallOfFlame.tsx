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

export default function HallOfFlame() {
  const { connection } = useConnection();
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const [topBurners, setTopBurners] = useState<AtomIdData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalBurned, setTotalBurned] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);

  useEffect(() => {
    fetchStats();
  }, [connection]);

  const fetchStats = async () => {
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
      let total = 0;

      for (const { pubkey, account } of atomIdAccounts) {
        try {
          const atomIdData = (program.coder.accounts as any).decode('atomId', account.data);
          if (atomIdData && atomIdData.owner) {
            const burned = atomIdData.totalBurned.toNumber();
            parsedAccounts.push({
              owner: atomIdData.owner.toBase58(),
              totalBurned: burned,
              rank: atomIdData.rank,
              metadata: atomIdData.metadata || '',
            });
            total += burned;
          }
        } catch (err) {
        }
      }

      parsedAccounts.sort((a, b) => b.totalBurned - a.totalBurned);

      setTopBurners(parsedAccounts.slice(0, 10));
      setTotalBurned(total);
      setTotalAccounts(parsedAccounts.length);
    } catch (err: any) {
      console.error('Error fetching stats:', err);
      setError('Failed to load Hall of Flame');
    } finally {
      setLoading(false);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
        <div className="max-w-2xl mx-auto bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <div className="loading-spinner mx-auto mb-5"></div>
          <p className="text-gray-400">Loading Hall of Flame...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[clamp(32px,5vw,56px)] font-special mb-4 sm:mb-5 text-orange-500 px-4">Hall of Flame</h1>
          <p className="text-lg sm:text-xl text-gray-400 px-4">The eternal legends who burned the brightest</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded mb-8 mx-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 mx-4">
          <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
            <div className="text-4xl font-bold font-mono text-orange-500 mb-2">
              {formatAtom(totalBurned)} $ATOM
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-400">Total Burned Forever</div>
          </div>

          <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
            <div className="text-4xl font-bold font-special mb-2">{totalAccounts}</div>
            <div className="text-sm uppercase tracking-wider text-gray-400">Total AtomIDs Created</div>
          </div>

          <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
            <div className="text-4xl font-bold font-mono mb-2">
              {totalAccounts > 0 ? formatAtom(Math.floor(totalBurned / totalAccounts)) : '0'} $ATOM
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-400">Average Burn Per ID</div>
          </div>
        </div>

        <div className="mb-12 sm:mb-16 mx-4">
          <h2 className="text-2xl sm:text-3xl font-special mb-6 sm:mb-8 text-center">Top 10 Eternal Burners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {topBurners.map((burner, index) => (
              <div key={burner.owner} className="bg-black/50 border border-white/20 p-6 sm:p-8 hover:border-white/60 hover:-translate-y-1 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && <span className="font-special text-2xl">#{index + 1}</span>}
                  </div>
                  <a
                    href={`https://solscan.io/account/${burner.owner}${SOLANA_NETWORK === 'mainnet' ? '' : '?cluster=devnet'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm hover:text-gray-400 transition-colors"
                  >
                    {truncateAddress(burner.owner)}
                  </a>
                </div>

                <div className="text-3xl font-bold font-mono text-orange-500 mb-2">
                  {formatAtom(burner.totalBurned)} $ATOM
                </div>

                <div className="text-lg font-special mb-4">{getRankName(burner.rank)}</div>

                {burner.metadata && (
                  <div className="font-mono text-sm text-gray-400 italic">&ldquo;{burner.metadata}&rdquo;</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black border-2 border-white p-6 sm:p-8 lg:p-10 text-center mx-4">
          <h3 className="text-3xl font-special mb-5">Join the Eternal Registry</h3>
          <p className="text-lg text-gray-400 mb-5">
            Every burn is permanent. Every sacrifice is recorded. Your identity becomes legend.
          </p>
          <blockquote className="font-mono text-xl italic border-l-4 border-white pl-5 inline-block">
            "When all ownership fades, what remains are the burned marks of belief."
          </blockquote>
        </div>
      </div>
    </div>
  );
}
