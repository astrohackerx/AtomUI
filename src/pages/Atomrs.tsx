import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Stats {
  total_sol_paid: number;
  last_payout_amount: number;
  last_payout_at: string | null;
}

interface Log {
  id: number;
  timestamp: string;
  level: string;
  message: string;
  sol_amount: number | null;
  tx_signature: string | null;
}

export default function Atomrs() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, logsRes] = await Promise.all([
        supabase
          .from('fee_collector_stats')
          .select('*')
          .eq('id', '00000000-0000-0000-0000-000000000001')
          .maybeSingle(),
        supabase
          .from('collector_logs')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(200),
      ]);

      if (statsRes.data) {
        setStats(statsRes.data);
      }

      if (logsRes.data) {
        setLogs(logsRes.data);
      }
    } catch (err) {
      console.error('Failed to load ATOMRS data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return '•';
    }
  };

  return (
    <div className="fade-in min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[clamp(48px,8vw,80px)] font-special mb-4">ATOM_RS</h1>
          <p className="text-xl text-gray-400">
            Autonomous Reward System
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-black/50 border border-white/20 p-6 hover:border-white/60 transition-all">
                <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Total SOL Paid
                </div>
                <div className="text-3xl font-bold font-mono">
                  {stats?.total_sol_paid.toFixed(9) || '0.000000000'} SOL
                </div>
              </div>

              <div className="bg-black/50 border border-white/20 p-6 hover:border-white/60 transition-all">
                <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Last Payout
                </div>
                <div className="text-3xl font-bold font-mono">
                  {stats?.last_payout_amount.toFixed(9) || '0.000000000'} SOL
                </div>
              </div>

              <div className="bg-black/50 border border-white/20 p-6 hover:border-white/60 transition-all">
                <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Last Payout Time
                </div>
                <div className="text-lg font-mono break-words">
                  {formatDate(stats?.last_payout_at || null)}
                </div>
              </div>
            </div>

            <div className="bg-black border border-white/20">
              <div className="border-b border-white/20 p-4 bg-white/5">
                <h2 className="text-xl font-special flex items-center gap-2">
                  <span>⚡</span>
                  Collector Logs
                  <span className="text-sm font-mono text-gray-400 ml-2">
                    (Last 200)
                  </span>
                </h2>
              </div>

              <div className="p-4 bg-black font-mono text-sm overflow-x-auto">
                <div className="min-w-[600px]">
                  {logs.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                      No logs available
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {logs.map((log) => (
                        <div
                          key={log.id}
                          className="flex gap-4 hover:bg-white/5 px-2 py-1 transition-colors"
                        >
                          <span className="text-gray-500 flex-shrink-0">
                            {new Date(log.timestamp).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            })}
                          </span>
                          <span
                            className={`flex-shrink-0 ${getLevelColor(log.level)}`}
                          >
                            {getLevelIcon(log.level)}
                          </span>
                          <span className="flex-1 break-words">{log.message}</span>
                          {log.sol_amount && (
                            <span className="text-green-400 flex-shrink-0">
                              {log.sol_amount.toFixed(9)} SOL
                            </span>
                          )}
                          {log.tx_signature && (
                            <a
                              href={`https://solscan.io/tx/${log.tx_signature}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex-shrink-0 truncate max-w-[100px]"
                              title={log.tx_signature}
                            >
                              {log.tx_signature.slice(0, 8)}...
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/5 border border-white/10 p-6">
              <h3 className="text-lg font-special mb-4">About ATOMRS</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                The Autonomous Reward System automatically
                collects trading fees from the ATOM token and distributes them to
                AtomID holders based on their burn rank and $ATOM burned. The system runs every 12
                hours, ensuring continuous rewards for believers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white font-mono">Distribution:</span>{' '}
                  <span className="text-gray-400">80% to holders, 20% protocol</span>
                </div>
                <div>
                  <span className="text-white font-mono">Frequency:</span>{' '}
                  <span className="text-gray-400">Every 12 hours</span>
                </div>
                <div>
                  <span className="text-white font-mono">Asset:</span>{' '}
                  <span className="text-gray-400">SOL</span>
                </div>
                <div>
                  <span className="text-white font-mono">Status:</span>{' '}
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
