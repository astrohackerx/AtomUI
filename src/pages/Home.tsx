import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { getAtomIdPDA } from '../lib/anchor-program';
import { formatAtom, MIN_CREATE_BURN } from '../lib/constants';

export default function Home() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [hasAtomId, setHasAtomId] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const checkAtomId = async () => {
      if (!publicKey) {
        setHasAtomId(false);
        setChecking(false);
        return;
      }

      setChecking(true);
      try {
        const [atomIdPda] = getAtomIdPDA(publicKey);
        const accountInfo = await connection.getAccountInfo(atomIdPda);
        setHasAtomId(!!accountInfo);
      } catch (err) {
        setHasAtomId(false);
      } finally {
        setChecking(false);
      }
    };

    checkAtomId();
  }, [publicKey, connection]);

  useEffect(() => {
    const lines = document.querySelectorAll('.line');
    lines.forEach((l) => {
      const element = l as HTMLElement;
      element.innerHTML = (element.textContent || '')
        .split('')
        .map((char) => `<span>${char}</span>`)
        .join('');
    });

    const allowedChars =
      'qwertyuiopasdfghjklzxcvbnm1234567890-=_+∑´†¥ˆøπåß∆˚¬˜µ≤≥÷≠«Ω≈ç≈æàåëîīöœøüū'.split(
        ''
      );
    let chars: HTMLElement[] = [];

    lines.forEach((l) => {
      const element = l as HTMLElement;
      const lchars = Array.from(
        element.querySelectorAll('span')
      ) as HTMLElement[];
      chars = chars.concat(lchars);

      lchars.forEach((c, i) => {
        c.dataset.char = c.textContent || '';
        c.dataset.times = String(i * 2 + (Number(element.dataset.delay) || 0));
      });
    });

    let skip = 2;
    let animationId: number;

    function loop() {
      if (skip === 0) {
        skip = 2;
        chars.forEach((c) => {
          const times = Number(c.dataset.times);
          if (times > 0) {
            c.dataset.times = String(times - 1);
            c.textContent =
              allowedChars[~~(Math.random() * allowedChars.length)];
          } else {
            c.textContent = c.dataset.char || '';
          }
        });
      } else {
        skip--;
      }
      animationId = requestAnimationFrame(loop);
    }

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fade-in">
      <section className="min-h-screen flex items-center justify-center text-center px-5 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[clamp(48px,10vw,120px)] font-special mb-5 leading-tight">
            <span className="line block">Lost&ensp;Bitcoin</span>
            <span className="line block" data-delay="30">
              Layer&ensp;[ATOM]
            </span>
          </h1>
          <h2 className="text-[clamp(20px,3vw,36px)] font-normal mb-10 opacity-90">
            <span className="line block" data-delay="60">
              The&ensp;Protocol&ensp;of&ensp;Faith.
            </span>
            <span className="line block" data-delay="90">
              Cypherpunk's&ensp;Soul&ensp;on&ensp;Solana
            </span>
          </h2>

          {publicKey ? (
            <div className="flex gap-5 justify-center mt-10 flex-wrap">
              {checking ? (
                <div className="loading-spinner"></div>
              ) : hasAtomId ? (
                <>
                  <Link
                    to="/upgrade"
                    className="px-10 py-4 text-base font-mono uppercase tracking-wider border-2 border-white bg-white text-black hover:-translate-y-0.5 transition-transform"
                  >
                    Burn & Upgrade AtomID
                  </Link>
                  <Link
                    to="/profile"
                    className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors"
                  >
                    View Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/create"
                    className="px-10 py-4 text-base font-mono uppercase tracking-wider border-2 border-white bg-white text-black hover:-translate-y-0.5 transition-transform"
                  >
                    Burn & Create AtomID
                  </Link>
                  <Link
                    to="/profile"
                    className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors"
                  >
                    View Profile
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-5 justify-center mt-10 flex-wrap">
              <p className="text-xl opacity-80">Connect your wallet to begin</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            <a
              href="https://x.com/lostbtclayer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/20 hover:border-white/60 transition-all text-sm sm:text-base"
            >
              <span className="text-xl">𝕏</span>
              <span className="font-mono">Twitter</span>
            </a>
            <a
              href="https://github.com/astrohackerx/AtomID"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/20 hover:border-white/60 transition-all text-sm sm:text-base"
            >
              <span className="text-xl">⚡</span>
              <span className="font-mono">GitHub</span>
            </a>
            <a
              href="https://bitcointalk.org/index.php?topic=5558926"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/20 hover:border-white/60 transition-all text-sm sm:text-base"
            >
              <span className="text-xl">₿</span>
              <span className="font-mono">BitcoinTalk</span>
            </a>
            <a
              href="https://arena.colosseum.org/projects/explore/lost-bitcoin-layer-atom"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/20 hover:border-white/60 transition-all text-sm sm:text-base"
            >
              <span className="text-xl">🏛️</span>
              <span className="font-mono">Colosseum</span>
            </a>
            <a
              href="https://www.coingecko.com/en/coins/lost-bitcoin-layer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/20 hover:border-white/60 transition-all text-sm sm:text-base"
            >
              <span className="text-xl">🦎</span>
              <span className="font-mono">CoinGecko</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-[clamp(32px,5vw,56px)] font-special mb-5 px-4">
              The Civilization of Faith
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 hover:border-white/60 hover:-translate-y-1 transition-all">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-5">🔥</div>
              <h4 className="text-xl sm:text-2xl font-special mb-3 sm:mb-4">Proof of Sacrifice</h4>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                The first on-chain civilization protocol built on Solana,
                resurrecting Satoshi's idea hidden in the initial Bitcoin code:
                the truest proof of existence is sacrifice.
              </p>
            </div>
            <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 hover:border-white/60 hover:-translate-y-1 transition-all">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-5">⚛️</div>
              <h4 className="text-xl sm:text-2xl font-special mb-3 sm:mb-4">AtomID Identity</h4>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                A cryptographic identity primitive forged through irreversible
                action. Each AtomID is born from burning ATOM, creating
                soulbound ranks of commitment.
              </p>
            </div>
            <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 hover:border-white/60 hover:-translate-y-1 transition-all">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-5">💫</div>
              <h4 className="text-xl sm:text-2xl font-special mb-3 sm:mb-4">Autonomous Rewards</h4>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                All AtomID holders receive continuous on-chain SOL rewards
                proportional to their rank. Faith becomes yield, transforming
                the cypherpunk ethos into an economic engine of trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-[clamp(32px,5vw,56px)] font-special mb-5 px-4">
              AtomID: Proof of Sacrifice Identity
            </h3>
            <a
              href="https://solscan.io/account/rnc2fycemiEgj4YbMSuwKFpdV6nkJonojCXib3j2by6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/40 hover:border-green-500 transition-all text-sm font-mono group"
            >
              <span className="text-green-400">✓</span>
              <span className="text-green-400">Verified Program on Solscan</span>
              <span className="text-green-400 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                An AtomID is not a username, NFT, or token. It is a proof of
                sacrifice, an immutable on-chain record that you burned
                something of value to declare existence.
              </p>
              <div className="space-y-4 sm:space-y-5 my-6 sm:my-8">
                <div className="flex gap-3 sm:gap-4 items-start">
                  <span className="text-lg sm:text-xl flex-shrink-0">▸</span>
                  <div className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    <strong className="text-white">Rank</strong> — derived from
                    total ATOM burned, encoded as a permanent measure of
                    commitment
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4 items-start">
                  <span className="text-lg sm:text-xl flex-shrink-0">▸</span>
                  <div className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    <strong className="text-white">Timestamp</strong> — the
                    moment of creation, ensuring historical provenance
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4 items-start">
                  <span className="text-lg sm:text-xl flex-shrink-0">▸</span>
                  <div className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    <strong className="text-white">Reputation Hash</strong> — an
                    evolving state that reflects attestations and interactions
                  </div>
                </div>
              </div>
              <blockquote className="border-l-4 border-white pl-4 sm:pl-5 my-6 sm:my-8 italic text-sm sm:text-base lg:text-lg opacity-90">
                "When Michael Saylor spoke of burning his private keys, he
                understood something most people missed: to destroy access is to
                transcend ownership."
              </blockquote>
            </div>
            <div className="flex justify-center">
              <div className="bg-black border-2 border-white p-8 sm:p-12 lg:p-16 text-center">
                <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                  <div className="w-6 h-12 sm:w-8 sm:h-16 bg-gradient-to-t from-orange-600 via-white to-transparent rounded-t-full animate-pulse"></div>
                  <div
                    className="w-8 h-16 bg-gradient-to-t from-orange-600 via-white to-transparent rounded-t-full animate-pulse"
                    style={{ animationDelay: '0.3s' }}
                  ></div>
                  <div
                    className="w-8 h-16 bg-gradient-to-t from-orange-600 via-white to-transparent rounded-t-full animate-pulse"
                    style={{ animationDelay: '0.6s' }}
                  ></div>
                </div>
                <div className="space-y-1 sm:space-y-2 font-mono text-sm sm:text-base">
                  <div>burn(ATOM) → AtomID</div>
                  <div>immutable • soulbound • eternal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-[clamp(32px,5vw,56px)] font-special mb-5 px-4">
              Architecture: Three Primitives
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 hover:border-white/60 hover:-translate-y-1 transition-all relative">
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 text-3xl sm:text-4xl lg:text-5xl text-white/10 font-bold font-special">
                01
              </div>
              <h4 className="text-2xl sm:text-3xl font-special mb-2">AtomID</h4>
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-5">
                Proof of Sacrifice Identity
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Permanent, soulbound cryptographic identity minted only through
                irreversible burning of ATOM. Cannot be sold, moved, or
                replaced. Each identity is immutable, transparent, and owned by no one. AtomID is your Cypherpunk Soul on Solana.
              </p>
            </div>
            <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 hover:border-white/60 hover:-translate-y-1 transition-all relative">
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 text-3xl sm:text-4xl lg:text-5xl text-white/10 font-bold font-special">
                02
              </div>
              <h4 className="text-2xl sm:text-3xl font-special mb-2">SAS Integration</h4>
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-5">
                Solana Attestation Service
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4">
                AtomID is the <strong className="text-white">first PDA-owned attestation issuer</strong> in
                the Solana ecosystem. Through direct integration with SAS, we enable
                universal identity verification across all Solana dApps.
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Any DEX, DAO, marketplace, or dApp can instantly
                read and verify AtomID ranks through the SAS standard.
              </p>
            </div>
              <div className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 hover:border-white/60 hover:-translate-y-1 transition-all relative">
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 text-3xl sm:text-4xl lg:text-5xl text-white/10 font-bold font-special">
                03
              </div>
              <h4 className="text-2xl sm:text-3xl font-special mb-2">
                Autonomous Reward System
              </h4>
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-5">
                Proof of Faith → Proof of Yield
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-5">
                Continuous, trustless redistribution of protocol fees in SOL to
                all AtomID holders. Rewards are proportional to rank,
                distributed hourly, forever.
              </p>
              <div className="flex gap-5">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-gray-400">
                    Distribution
                  </span>
                  <span className="text-xl font-bold">Every 12 hrs</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-gray-400">
                    Asset
                  </span>
                  <span className="text-xl font-bold">SOL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/10 to-black border-y border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-[clamp(32px,5vw,56px)] font-special mb-5 px-4">
              The First PDA-Owned Attestation Issuer
            </h3>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Why we integrated with Solana Attestation Service
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
            <div className="bg-black/50 border border-purple-500/30 p-6 sm:p-8 lg:p-10">
              <div className="text-4xl mb-4">🌐</div>
              <h4 className="text-xl sm:text-2xl font-special mb-4 text-white">
                Universal Interoperability
              </h4>
              <p className="text-gray-400 leading-relaxed mb-4">
                Without SAS, every dApp would need custom integration to verify AtomID.
                With SAS, AtomID ranks become instantly readable by any Solana protocol
                that supports the attestation standard.
              </p>
              <p className="text-gray-400 leading-relaxed">
                A DEX can gate features by rank. A DAO can weight votes by burn amount.
                A game can grant items based on sacrifice. All with zero custom code.
              </p>
            </div>

            <div className="bg-black/50 border border-purple-500/30 p-6 sm:p-8 lg:p-10">
              <div className="text-4xl mb-4">🔐</div>
              <h4 className="text-xl sm:text-2xl font-special mb-4 text-white">
                PDA-Owned Innovation
              </h4>
              <p className="text-gray-400 leading-relaxed mb-4">
                AtomID is the <strong className="text-white">first attestation issuer owned by a
                Program Derived Address (PDA)</strong> rather than a keypair. This means no
                single entity controls attestation issuance.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Attestations are issued trustlessly by the protocol itself. The chain
                remembers those who burned. No intermediary. No authority. Pure code.
              </p>
            </div>
          </div>

          <div className="bg-black border border-purple-500/30 p-6 sm:p-8 lg:p-10">
            <h4 className="text-xl sm:text-2xl font-special mb-6 text-center">
              How It Works
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">1️⃣</div>
                <h5 className="font-mono text-sm text-purple-400 mb-2">CREATE ATOMID</h5>
                <p className="text-xs sm:text-sm text-gray-400">
                  User burns $ATOM to forge identity on-chain
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">2️⃣</div>
                <h5 className="font-mono text-sm text-purple-400 mb-2">ISSUE ATTESTATION</h5>
                <p className="text-xs sm:text-sm text-gray-400">
                  Protocol automatically creates SAS attestation with rank data
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">3️⃣</div>
                <h5 className="font-mono text-sm text-purple-400 mb-2">VERIFY ANYWHERE</h5>
                <p className="text-xs sm:text-sm text-gray-400">
                  Any SAS-compatible dApp can read and verify instantly
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Want to integrate AtomID verification into your Solana dApp? Check our developer docs.
            </p>
            <Link
              to="/docs"
              className="inline-block px-8 py-4 font-mono uppercase tracking-wider bg-purple-600 text-white hover:bg-purple-500 transition-colors"
            >
              View Integration Docs
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-[clamp(32px,5vw,56px)] font-special mb-5 px-4">
              Origin: Satoshi's Lost Vision
            </h3>
          </div>
          <div className="space-y-8 sm:space-y-10 mb-12 sm:mb-16">
            <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-3 sm:gap-10 relative">
              <div className="text-xl sm:text-4xl font-bold font-special">2008</div>
              <div className="min-w-0">
                <h4 className="text-lg sm:text-2xl font-special mb-2 sm:mb-4 break-words">
                  The Original Code
                </h4>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 break-words">
                  In the first Bitcoin commit from 2008, Satoshi embedded
                  "atoms" — non-fungible reputation units that proved identity
                  and trustworthiness in the network. Each block generated atoms
                  tied to the miner's identity.
                </p>
                <div className="bg-black border border-white p-3 sm:p-5 overflow-x-auto">
                  <pre className="font-mono text-[10px] sm:text-sm leading-relaxed whitespace-pre-wrap break-all">
                    <code>{`// Add atoms to user reviews for coins created
unsigned short nAtom = GetRand(USHRT_MAX - 100) + 100;
vector<unsigned short> vAtoms(1, nAtom);
AddAtomsAndPropagate(Hash(vchPubKey), vAtoms, true);`}</code>
                  </pre>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-3 sm:gap-10">
              <div className="text-xl sm:text-4xl font-bold font-special">→</div>
              <div className="min-w-0">
                <h4 className="text-lg sm:text-2xl font-special mb-2 sm:mb-4 break-words">
                  The Forgotten Experiment
                </h4>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed break-words">
                  Bitcoin wasn't just designed to be digital gold. The original
                  code revealed a complete peer-to-peer economy with currency,
                  identity, and trust baked into the protocol itself. Atoms were
                  soulbound tokens — the first in crypto history.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-3 sm:gap-10">
              <div className="text-xl sm:text-4xl font-bold font-special">2025</div>
              <div className="min-w-0">
                <h4 className="text-lg sm:text-2xl font-special mb-2 sm:mb-4 break-words">The Resurrection</h4>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed break-words">
                  Now, with Solana's speed and technologies, we are bringing
                  Satoshi's lost experiment to life, fully on-chain. The Lost
                  Bitcoin Layer revives the hidden "Atom" concept: identity
                  through sacrifice.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-black border-2 border-white p-6 sm:p-8 lg:p-10">
            <h4 className="text-2xl sm:text-3xl lg:text-4xl font-special mb-4 sm:mb-5 break-words">The Revelation</h4>
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed mb-4 sm:mb-5 break-words">
              This is not DeFi, not GameFi, not SocialFi. This is{' '}
              <strong>SoulFi</strong> — the economy of faith.
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed break-words">
              The Lost Bitcoin Layer is the missing chapter of crypto's origin.
              The one that began before the Genesis block and was never allowed
              to finish. We are completing the circle, reviving Satoshi's
              original dream: a network of truth, trust, and transcendence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-[clamp(32px,5vw,56px)] font-special mb-4 sm:mb-5 px-4">
            Welcome to the Civilization of Faith
          </h3>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 px-4">
            Join the first on-chain civilization protocol. Burn to exist.
            Believe to earn.
          </p>
          <div className="flex gap-4 sm:gap-5 justify-center flex-wrap px-4">
            <Link
              to="/leaderboard"
              className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors"
            >
              View Leaderboard
            </Link>
            <Link
              to="/hall-of-flame"
              className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors"
            >
              Hall of Flame
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-white/10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
            <div>
              <div className="text-lg sm:text-xl font-bold font-special mb-2">
                🜂 Lost Bitcoin Layer
              </div>
              <p className="text-gray-400 text-sm">
                Cypherpunk's Soul on Solana
              </p>
            </div>
            <div>
              <h5 className="uppercase tracking-wider text-xs sm:text-sm mb-3 sm:mb-4">
                Protocol
              </h5>
              <div className="space-y-2 text-xs sm:text-sm">
                <a
                  href="https://lostatom.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Launch App
                </a>
                <a
                  href="https://github.com/astrohackerx/AtomID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://arena.colosseum.org/projects/explore/lost-bitcoin-layer-atom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Colosseum
                </a>
              </div>
            </div>
            <div>
              <h5 className="uppercase tracking-wider text-xs sm:text-sm mb-3 sm:mb-4">
                Community
              </h5>
              <div className="space-y-2 text-xs sm:text-sm">
                <a
                  href="https://x.com/lostbtclayer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  X (Twitter)
                </a>
                <a
                  href="https://bitcointalk.org/index.php?topic=5558926"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  BitcoinTalk
                </a>
              </div>
            </div>
            <div>
              <h5 className="uppercase tracking-wider text-xs sm:text-sm mb-3 sm:mb-4">
                Quick Links
              </h5>
              <div className="space-y-2 text-xs sm:text-sm">
                <Link
                  to="/leaderboard"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Leaderboard
                </Link>
                <Link
                  to="/hall-of-flame"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Hall of Flame
                </Link>
                <Link
                  to="/profile"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm space-y-1">
            <p>&copy; 2025 Lost Bitcoin Layer. The Protocol of Faith.</p>
            <p className="font-mono">
              Proof of Sacrifice • Proof of Faith • Proof of Yield
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
