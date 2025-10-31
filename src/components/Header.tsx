import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { getAtomIdPDA } from '../lib/anchor-program';
import { SOLANA_NETWORK } from '../lib/constants';

export default function Header() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const location = useLocation();
  const [hasAtomId, setHasAtomId] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [atomIdDropdownOpen, setAtomIdDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAtomId = async () => {
      if (!publicKey) {
        setHasAtomId(false);
        return;
      }

      try {
        const [atomIdPda] = getAtomIdPDA(publicKey);
        const accountInfo = await connection.getAccountInfo(atomIdPda);
        setHasAtomId(!!accountInfo);
      } catch (err) {
        setHasAtomId(false);
      }
    };

    checkAtomId();
  }, [publicKey, connection, location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAtomIdDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold font-special flex items-center gap-2 sm:gap-3">
          🜂 ATOM
          <span className="text-xs px-2 py-1 bg-white/10 border border-white/20 rounded uppercase tracking-wider font-mono">
            {SOLANA_NETWORK}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-8 text-sm uppercase tracking-wider font-mono">
            <Link to="/" className="hover:text-gray-400 transition-colors">
              Home
            </Link>
            <Link to="/token" className="hover:text-gray-400 transition-colors">
              $ATOM
            </Link>
            
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setAtomIdDropdownOpen(!atomIdDropdownOpen)}
                  className="hover:text-gray-400 transition-colors flex items-center gap-1"
                >
                  ATOMID
                  <svg
                    className={`w-4 h-4 transition-transform ${atomIdDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {atomIdDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-black border border-white/20 min-w-[160px] shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/10"
                      onClick={() => setAtomIdDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    {!hasAtomId && publicKey ? (
                      <Link
                        to="/create"
                        className="block px-4 py-3 hover:bg-white/10 transition-colors"
                        onClick={() => setAtomIdDropdownOpen(false)}
                      >
                        Create
                      </Link>
                    ) : hasAtomId && publicKey ? (
                      <Link
                        to="/upgrade"
                        className="block px-4 py-3 hover:bg-white/10 transition-colors"
                        onClick={() => setAtomIdDropdownOpen(false)}
                      >
                        Upgrade
                      </Link>
                    ): null}
                  </div>
                )}
              </div>
           
            <Link to="/leaderboard" className="hover:text-gray-400 transition-colors">
              REGISTRY
            </Link>
            <Link to="/hall-of-flame" className="hover:text-gray-400 transition-colors">
              Hall of Flame
            </Link>
            <Link to="/atomrs" className="hover:text-gray-400 transition-colors">
              ATOMRS
            </Link>
            <Link to="/docs" className="hover:text-gray-400 transition-colors">
              Docs
            </Link>
          </div>
          <WalletMultiButton />
        </div>

        <button
          className="lg:hidden flex flex-col gap-1.5 w-7 z-[60] relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed md:hidden inset-0 bg-black z-[55] overflow-hidden">
          <div className="h-screen flex flex-col pt-[65px]">
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="flex flex-col gap-6 text-base uppercase tracking-wider font-mono">
                <Link
                  to="/"
                  className="hover:text-gray-400 transition-colors py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/token"
                  className="hover:text-gray-400 transition-colors py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  $ATOM
                </Link>
                {publicKey && (
                  <div className="py-2 border-b border-white/10">
                    <button
                      onClick={() => setAtomIdDropdownOpen(!atomIdDropdownOpen)}
                      className="w-full text-left hover:text-gray-400 transition-colors flex items-center justify-between"
                    >
                      AtomID
                      <svg
                        className={`w-4 h-4 transition-transform ${atomIdDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {atomIdDropdownOpen && (
                      <div className="mt-3 ml-4 space-y-3">
                        <Link
                          to="/profile"
                          className="block hover:text-gray-400 transition-colors"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setAtomIdDropdownOpen(false);
                          }}
                        >
                          Profile
                        </Link>
                        {!hasAtomId ? (
                          <Link
                            to="/create"
                            className="block hover:text-gray-400 transition-colors"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setAtomIdDropdownOpen(false);
                            }}
                          >
                            Create
                          </Link>
                        ) : (
                          <Link
                            to="/upgrade"
                            className="block hover:text-gray-400 transition-colors"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setAtomIdDropdownOpen(false);
                            }}
                          >
                            Upgrade
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <Link
                  to="/leaderboard"
                  className="hover:text-gray-400 transition-colors py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Leaderboard
                </Link>
                <Link
                  to="/hall-of-flame"
                  className="hover:text-gray-400 transition-colors py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hall of Flame
                </Link>
                <Link
                  to="/atomrs"
                  className="hover:text-gray-400 transition-colors py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ATOMRS
                </Link>
                <Link
                  to="/docs"
                  className="hover:text-gray-400 transition-colors py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Docs
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <WalletMultiButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
