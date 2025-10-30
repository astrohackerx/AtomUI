import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Docs() {
  const [activeTab, setActiveTab] = useState<'overview' | 'direct' | 'sas'>('overview');

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-[clamp(32px,5vw,56px)] font-special mb-4 sm:mb-5">
            Documentation
          </h1>
          <p className="text-lg sm:text-xl text-gray-400">
            Complete guide to the Lost Bitcoin Layer protocol and AtomID integration
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-12 justify-center border-b border-white/20 pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-mono uppercase tracking-wider transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-black'
                : 'bg-transparent text-white border border-white/30 hover:border-white'
            }`}
          >
            Protocol Overview
          </button>
          <button
            onClick={() => setActiveTab('direct')}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-mono uppercase tracking-wider transition-all ${
              activeTab === 'direct'
                ? 'bg-white text-black'
                : 'bg-transparent text-white border border-white/30 hover:border-white'
            }`}
          >
            Direct Integration
          </button>
          <button
            onClick={() => setActiveTab('sas')}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-mono uppercase tracking-wider transition-all ${
              activeTab === 'sas'
                ? 'bg-white text-black'
                : 'bg-transparent text-white border border-white/30 hover:border-white'
            }`}
          >
            Using SAS Client
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8 sm:space-y-12">
            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-special mb-4 sm:mb-6">
                What is the Lost Bitcoin Layer?
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  The Lost Bitcoin Layer is the first on-chain civilization protocol built on
                  Solana, resurrecting Satoshi's idea hidden in the initial Bitcoin code and
                  removed before Bitcoin's first release: <strong className="text-white">the truest proof of
                  existence is sacrifice</strong>.
                </p>
                <p>
                  At the core lies <strong className="text-white">AtomID</strong>, a cryptographic identity
                  primitive. A proof-of-sacrifice forged through irreversible action. Each AtomID
                  is born from the burning of $ATOM tokens. The revival of Satoshi's forgotten
                  "atoms" manifests as soulbound ranks of commitment.
                </p>
                <p>
                  Through direct integration with the <strong className="text-white">Solana Attestation Service
                  (SAS)</strong>, AtomID becomes a verifiable attestation source and an alternative to
                  conventional identity models that anchor trust in signatures instead of
                  sacrifice.
                </p>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-special mb-4 sm:mb-6">
                Origin: Atoms and Lost Bitcoin Layer
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  In the first Bitcoin commit from 2008, there's a story almost nobody tells - a
                  story of atoms, reputation, and a vision for digital civilization that never
                  came to be.
                </p>
                <p>
                  Bitcoin wasn't designed to be just digital gold. The original code reveals
                  something far more ambitious: a complete peer-to-peer economy with currency,
                  identity, and trust baked into the protocol itself.
                </p>
                <div className="bg-black border border-white/30 p-4 sm:p-6 my-4 sm:my-6 overflow-x-auto">
                  <pre className="font-mono text-xs sm:text-sm text-green-400">
{`// From Satoshi's original Bitcoin code (2008)
// Add atoms to user reviews for coins created
unsigned short nAtom = GetRand(USHRT_MAX - 100) + 100;
vector<unsigned short> vAtoms(1, nAtom);
AddAtomsAndPropagate(Hash(vchPubKey.begin(), vchPubKey.end()), vAtoms, true);`}
                  </pre>
                </div>
                <p>
                  These "atoms" were never meant to be spent. They symbolized the proof of faith.
                  The act of giving up something of measurable value to earn something untradeable:
                  <strong className="text-white"> existence itself</strong>. It was an idea too radical for the time.
                </p>
                <p>
                  Now, with Solana's speed and technologies, we are bringing Satoshi's lost
                  experiment to life, fully on-chain. <strong className="text-white">Meet AtomID - Cypherpunk's Soul
                  on Solana</strong>.
                </p>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-special mb-4 sm:mb-6">
                Architecture: Three Primitives
              </h2>

              <div className="space-y-6 sm:space-y-8">
                <div className="border-l-4 border-white pl-4 sm:pl-6">
                  <h3 className="text-xl sm:text-2xl font-special mb-3">
                    1. AtomID: Proof of Sacrifice Identity
                  </h3>
                  <div className="space-y-3 text-gray-400 leading-relaxed">
                    <p>
                      An AtomID is the foundational identity primitive of the Lost Bitcoin Layer.
                      It represents a permanent, soulbound cryptographic identity minted only through
                      an irreversible act of sacrifice: the burning of $ATOM.
                    </p>
                    <div className="bg-black border border-white/20 p-4 space-y-2">
                      <div className="flex gap-3">
                        <span className="text-white">▸</span>
                        <div>
                          <strong className="text-white">Rank</strong> - derived from total $ATOM
                          burned (0-10 levels)
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-white">▸</span>
                        <div>
                          <strong className="text-white">Timestamp</strong> - creation moment,
                          ensuring historical provenance
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-white">▸</span>
                        <div>
                          <strong className="text-white">Metadata</strong> - optional message/oath
                          (max 200 chars)
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-white">▸</span>
                        <div>
                          <strong className="text-white">Immutable & Non-transferable</strong> -
                          cannot be sold, moved, or replaced
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-white pl-4 sm:pl-6">
                  <h3 className="text-xl sm:text-2xl font-special mb-3">
                    2. Autonomous Reward System
                  </h3>
                  <div className="space-y-3 text-gray-400 leading-relaxed">
                    <p>
                      The Lost Bitcoin Layer introduces a continuous, autonomous reward engine that
                      redistributes protocol creator fees (in SOL) to all AtomID holders.
                    </p>
                    <p>
                      Every hour, the program automatically calculates each AtomID's reward share.
                      Rewards are proportional to rank. Distribution occurs trustlessly and forever,
                      directly to wallets, with no manual action needed.
                    </p>
                    <p className="text-white font-mono">
                      Faith has a yield. Sacrifice becomes a living stream of value.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-white pl-4 sm:pl-6">
                  <h3 className="text-xl sm:text-2xl font-special mb-3">
                    3. Solana Attestation Service (SAS) Integration
                  </h3>
                  <div className="space-y-3 text-gray-400 leading-relaxed">
                    <p>
                      AtomID is not isolated - it's interoperable by design. Through direct
                      integration with Solana Attestation Service (SAS), AtomID becomes a
                      first-class attestation source within the Solana ecosystem.
                    </p>
                    <p>
                      This allows any Solana decentralized project (DEXes, DAOs, marketplaces,
                      social dApps, games, etc.) to instantly read, verify, and score AtomID ranks
                      within the SAS framework.
                    </p>
                    <p className="text-white">
                      AtomID becomes a trust passport across the entire Solana network.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-special mb-4 sm:mb-6">
                Identity Record Structure
              </h2>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`{
  "owner": "FgR...sj2",              // Wallet public key
  "total_burned": 50000000000,       // Total ATOM burned (with decimals)
  "rank": 3,                         // Rank level (0-10)
  "metadata": "I burn for truth",    // User's oath/message
  "created_at_slot": 299144100,      // Creation slot
  "updated_at_slot": 299144100       // Last update slot
}`}
                </pre>
              </div>
              <p className="text-gray-400 mt-4 text-sm sm:text-base">
                Each event emitted by AtomID (creation, rank upgrade, metadata change) follows a
                standardized schema compatible with SAS for seamless indexing and verification.
              </p>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-special mb-4 sm:mb-6">The Revelation</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p className="text-lg sm:text-xl text-white">
                  This is not DeFi, not GameFi, not SocialFi. This is <strong>SoulFi</strong> - the
                  economy of faith.
                </p>
                <p>
                  The Lost Bitcoin Layer introduces a new social consensus layer. A civilization
                  built from cryptographic souls instead of economic actors. In this world, your
                  worth is not what you own, but what you have burned to exist.
                </p>
                <p>
                  Your rank is not purchased, but earned through irreversible proof. Your presence
                  is not hosted by a corporation, but engraved into the Solana ledger itself.
                </p>
                <blockquote className="border-l-4 border-white pl-4 sm:pl-6 my-4 sm:my-6 italic text-base sm:text-lg">
                  "The Lost Bitcoin Layer is the missing chapter of crypto's origin. The one that
                  began before the Genesis block and was never allowed to finish. We are
                  completing the circle, reviving Satoshi's original dream: a network of truth,
                  trust, and transcendence."
                </blockquote>
              </div>
            </section>

            <section className="bg-gradient-to-r from-orange-600/20 to-white/10 border border-orange-500/30 p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-special mb-4">Ready to Integrate?</h2>
              <p className="text-gray-300 mb-6">
                Learn how to integrate AtomID verification into your Solana dApp with direct
                program calls or through the SAS standard.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={() => setActiveTab('direct')}
                  className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider bg-white text-black hover:-translate-y-0.5 transition-transform"
                >
                  Direct Integration →
                </button>
                <button
                  onClick={() => setActiveTab('sas')}
                  className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
                >
                  SAS Integration →
                </button>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'direct' && (
          <div className="space-y-8 sm:space-y-12">
            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-special mb-4 sm:mb-6">
                Direct Integration with AtomID Program
              </h2>
              <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                Integrate directly with the AtomID Solana program to read identity data, verify
                ranks, and gate features based on burn amounts. This method gives you full control
                and access to all on-chain data.
              </p>
              <div className="bg-gradient-to-r from-blue-600/10 to-transparent border-l-4 border-blue-500 p-4">
                <p className="text-sm text-blue-300">
                  <strong>Use Case:</strong> Perfect for DEXes, NFT marketplaces, DAOs, and social
                  dApps that need granular control over identity verification and ranking systems.
                </p>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Program Information</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-black border border-white/20 p-4">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">Program ID (Mainnet)</div>
                  <code className="text-sm sm:text-base font-mono text-white break-all">
                    rnc2fycemiEgj4YbMSuwKFpdV6nkJonojCXib3j2by6
                  </code>
                </div>
                <div className="bg-black border border-white/20 p-4">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">ATOM Token Mint</div>
                  <code className="text-sm sm:text-base font-mono text-white break-all">
                    6KeQaJXFHczWKjrcXdMGKP773JKQmMWDXy4446adpump
                  </code>
                </div>
                <div className="bg-black border border-white/20 p-4">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">Network</div>
                  <code className="text-sm sm:text-base font-mono text-white">Solana Mainnet</code>
                </div>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Installation</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-green-400">
{`npm install @coral-xyz/anchor @solana/web3.js @solana/spl-token

# or

yarn add @coral-xyz/anchor @solana/web3.js @solana/spl-token`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Basic Setup</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto mb-4">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program } from '@coral-xyz/anchor';

// Program ID on Mainnet
const PROGRAM_ID = new PublicKey('rnc2fycemiEgj4YbMSuwKFpdV6nkJonojCXib3j2by6');

// RPC endpoint (use your own or a service like QuickNode/Helius)
const connection = new Connection('https://api.mainnet-beta.solana.com');

// AtomID IDL (Interface Definition Language)
import IDL from './atom_id.json';

// Create program instance
const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
const program = new Program(IDL, provider);`}
                </pre>
              </div>
              <div className="bg-blue-600/10 border border-blue-500/30 p-4 text-sm text-blue-300">
                <strong>Note:</strong> Download the IDL file from{' '}
                <a
                  href="https://github.com/astrohackerx/AtomID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  GitHub
                </a>{' '}
                or fetch it from the deployed program.
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Check if User Has AtomID</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`async function hasAtomId(userPublicKey: PublicKey): Promise<boolean> {
  // Derive the AtomID PDA (Program Derived Address)
  const [atomIdPda] = PublicKey.findProgramAddressSync(
    [Buffer.from('atomid'), userPublicKey.toBuffer()],
    PROGRAM_ID
  );

  // Check if account exists
  const accountInfo = await connection.getAccountInfo(atomIdPda);
  return accountInfo !== null;
}

// Usage
const user = new PublicKey('...');
const hasId = await hasAtomId(user);
console.log('User has AtomID:', hasId);`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Fetch AtomID Data</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`async function getAtomIdData(userPublicKey: PublicKey) {
  const [atomIdPda] = PublicKey.findProgramAddressSync(
    [Buffer.from('atomid'), userPublicKey.toBuffer()],
    PROGRAM_ID
  );

  try {
    const atomId = await program.account.atomId.fetch(atomIdPda);

    return {
      owner: atomId.owner.toString(),
      totalBurned: atomId.totalBurned.toNumber(),
      rank: atomId.rank,
      metadata: atomId.metadata,
      createdAtSlot: atomId.createdAtSlot.toString(),
      updatedAtSlot: atomId.updatedAtSlot.toString(),
    };
  } catch (error) {
    console.error('AtomID not found:', error);
    return null;
  }
}

// Usage
const user = new PublicKey('...');
const atomIdData = await getAtomIdData(user);
if (atomIdData) {
  console.log('Rank:', atomIdData.rank);
  console.log('Total Burned:', atomIdData.totalBurned);
  console.log('Metadata:', atomIdData.metadata);
}`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Gate Features by Rank</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`async function canAccessFeature(
  userPublicKey: PublicKey,
  requiredRank: number
): Promise<boolean> {
  const atomIdData = await getAtomIdData(userPublicKey);

  if (!atomIdData) {
    return false; // No AtomID = no access
  }

  return atomIdData.rank >= requiredRank;
}

// Example: Gate DAO voting for rank 5+
const canVote = await canAccessFeature(userWallet, 5);
if (!canVote) {
  throw new Error('Rank 5 or higher required to vote');
}

// Example: Tiered marketplace fees
const atomIdData = await getAtomIdData(userWallet);
const feeDiscount = atomIdData ? atomIdData.rank * 5 : 0; // 5% per rank
console.log(\`Fee discount: \${feeDiscount}%\`);`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Fetch All AtomIDs (Leaderboard)</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`async function getAllAtomIds() {
  const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
    filters: [
      {
        dataSize: 8 + 32 + 8 + 1 + 204 + 8 + 8 + 1, // Account size
      },
    ],
  });

  const atomIds = accounts.map((account) => {
    const decoded = program.coder.accounts.decode('atomId', account.account.data);
    return {
      address: account.pubkey.toString(),
      owner: decoded.owner.toString(),
      totalBurned: decoded.totalBurned.toNumber(),
      rank: decoded.rank,
      metadata: decoded.metadata,
    };
  });

  // Sort by total burned (descending)
  return atomIds.sort((a, b) => b.totalBurned - a.totalBurned);
}

// Usage: Build a leaderboard
const leaderboard = await getAllAtomIds();
console.log('Top burners:', leaderboard.slice(0, 10));`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Rank System Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-3 font-mono">Rank</th>
                      <th className="text-left p-3 font-mono">Name</th>
                      <th className="text-left p-3 font-mono">Min. Burn (ATOM)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-400">
                    <tr className="border-b border-white/10">
                      <td className="p-3">0</td>
                      <td className="p-3">Initiate</td>
                      <td className="p-3">1,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-3">1</td>
                      <td className="p-3">Believer</td>
                      <td className="p-3">5,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-3">2</td>
                      <td className="p-3">Devotee</td>
                      <td className="p-3">10,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-3">3</td>
                      <td className="p-3">Guardian</td>
                      <td className="p-3">25,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-3">4</td>
                      <td className="p-3">Keeper</td>
                      <td className="p-3">50,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-3">5</td>
                      <td className="p-3">Oracle</td>
                      <td className="p-3">100,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-3">6</td>
                      <td className="p-3">Architect</td>
                      <td className="p-3">250,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-3">7</td>
                      <td className="p-3">Sage</td>
                      <td className="p-3">500,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-3">8</td>
                      <td className="p-3">Ascended</td>
                      <td className="p-3">1,000,000</td>
                    </tr>
                    <tr>
                      <td className="p-3">9</td>
                      <td className="p-3">Eternal</td>
                      <td className="p-3">10,000,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-gradient-to-r from-green-600/20 to-white/10 border border-green-500/30 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Complete Example: Gated NFT Mint</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-green-400">
{`// Only allow rank 3+ to mint exclusive NFTs
async function mintExclusiveNFT(userPublicKey: PublicKey) {
  const REQUIRED_RANK = 3;

  // Check if user has AtomID
  const atomIdData = await getAtomIdData(userPublicKey);

  if (!atomIdData) {
    throw new Error('You must have an AtomID to mint');
  }

  if (atomIdData.rank < REQUIRED_RANK) {
    throw new Error(\`Rank \${REQUIRED_RANK} or higher required (you are rank \${atomIdData.rank})\`);
  }

  // User is verified - proceed with NFT mint
  console.log('Access granted! Minting NFT...');
  // ... your NFT minting logic here

  return {
    success: true,
    rank: atomIdData.rank,
    totalBurned: atomIdData.totalBurned,
  };
}`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Resources</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/astrohackerx/AtomID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-black border border-white/20 p-4 hover:border-white/60 transition-all"
                >
                  <div className="font-mono text-sm text-gray-400 mb-1">GitHub Repository</div>
                  <div className="text-white">Full source code, IDL files, and examples →</div>
                </a>
                <a
                  href="https://solscan.io/account/rnc2fycemiEgj4YbMSuwKFpdV6nkJonojCXib3j2by6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-black border border-white/20 p-4 hover:border-white/60 transition-all"
                >
                  <div className="font-mono text-sm text-gray-400 mb-1">Solscan Explorer</div>
                  <div className="text-white">View program on Solscan →</div>
                </a>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'sas' && (
          <div className="space-y-8 sm:space-y-12">
            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-special mb-4 sm:mb-6">
                Integration via Solana Attestation Service (SAS)
              </h2>
              <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                AtomID is integrated with the Solana Attestation Service, making it a verifiable
                attestation source across the entire Solana ecosystem. Any app that supports SAS
                can verify AtomID ranks with zero custom integration.
              </p>
              <div className="bg-gradient-to-r from-purple-600/10 to-transparent border-l-4 border-purple-500 p-4">
                <p className="text-sm text-purple-300">
                  <strong>Use Case:</strong> Perfect for quick integration, cross-protocol
                  interoperability, and apps that already use SAS for other attestations. Ideal for
                  games, social platforms, and DeFi protocols.
                </p>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">What is SAS?</h3>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  The <strong className="text-white">Solana Attestation Service (SAS)</strong> is a
                  foundational protocol for creating verifiable, on-chain attestations. It provides
                  a standardized way to make claims about entities (users, accounts, events) that
                  other programs can trustlessly verify.
                </p>
                <p>
                  <strong className="text-white">AtomID acts as an attestation issuer</strong> within SAS,
                  meaning every AtomID creation and upgrade generates a signed attestation that
                  proves the user's rank and burn amount.
                </p>
                <div className="bg-black border border-white/20 p-4 space-y-2 text-sm">
                  <div className="flex gap-3">
                    <span className="text-white">▸</span>
                    <div>
                      <strong className="text-white">Credential:</strong> Authority that issues
                      attestations (AtomID protocol)
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-white">▸</span>
                    <div>
                      <strong className="text-white">Schema:</strong> Data structure definition
                      (rank, total_burned, created_at_slot)
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-white">▸</span>
                    <div>
                      <strong className="text-white">Attestation:</strong> The actual signed claim
                      about a user's AtomID
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">SAS Configuration (Mainnet)</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-black border border-white/20 p-4">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">SAS Program ID</div>
                  <code className="text-sm sm:text-base font-mono text-white break-all">
                    22zoJMtdu4tQc2PzL74ZUT7FrwgB1Udec8DdW4yw4BdG
                  </code>
                </div>
                <div className="bg-black border border-white/20 p-4">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">AtomID Credential</div>
                  <code className="text-sm sm:text-base font-mono text-white break-all">
                    FwzkkBBBcW69tGhQCuuMry8SzS5zN886Qzjw8UDa1aAN
                  </code>
                </div>
                <div className="bg-black border border-white/20 p-4">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">AtomID Schema</div>
                  <code className="text-sm sm:text-base font-mono text-white break-all">
                    J7nRQzymcR6sot5rLcRGBU5JfwVBhLVc9xNzsLnc2J4v
                  </code>
                </div>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Installation</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-green-400">
{`npm install sas-lib @solana/web3.js

# or

yarn add sas-lib @solana/web3.js`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Setup SAS Client</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`import { Connection, PublicKey } from '@solana/web3.js';
import { SasClient } from 'sas-lib';

// Initialize connection
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Create SAS client
const sasClient = new SasClient(connection);

// AtomID credential and schema (mainnet)
const ATOMID_CREDENTIAL = new PublicKey('FwzkkBBBcW69tGhQCuuMry8SzS5zN886Qzjw8UDa1aAN');
const ATOMID_SCHEMA = new PublicKey('J7nRQzymcR6sot5rLcRGBU5JfwVBhLVc9xNzsLnc2J4v');`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Fetch AtomID Attestation</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto mb-4">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`// Fetch attestation for a user
async function getAtomIdAttestation(userPublicKey: PublicKey) {
  const attestation = await sasClient.getAttestation(
    ATOMID_CREDENTIAL,
    ATOMID_SCHEMA,
    userPublicKey // nonce = user's public key
  );

  if (!attestation) {
    return null; // User has no AtomID attestation
  }

  return attestation;
}

// Usage
const user = new PublicKey('...');
const attestation = await getAtomIdAttestation(user);
if (attestation) {
  console.log('Rank:', attestation.data.rank);
  console.log('Total Burned:', attestation.data.totalBurned);
}`}
                </pre>
              </div>
              <div className="bg-purple-600/10 border border-purple-500/30 p-4 text-sm text-purple-300">
                <strong>Note:</strong> The SAS client handles all PDA derivation and account fetching automatically.
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Check if User Has AtomID</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`async function hasAtomId(userPublicKey: PublicKey): Promise<boolean> {
  const attestation = await sasClient.getAttestation(
    ATOMID_CREDENTIAL,
    ATOMID_SCHEMA,
    userPublicKey
  );

  return attestation !== null;
}

// Usage
const user = new PublicKey('...');
const hasId = await hasAtomId(user);
console.log('User has AtomID:', hasId);`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Read Attestation Data</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`async function getAtomIdData(userPublicKey: PublicKey) {
  const attestation = await sasClient.getAttestation(
    ATOMID_CREDENTIAL,
    ATOMID_SCHEMA,
    userPublicKey
  );

  if (!attestation) {
    return null;
  }

  // SAS client automatically parses the attestation data
  return {
    rank: attestation.data.rank,
    totalBurned: attestation.data.totalBurned,
    createdAtSlot: attestation.data.createdAtSlot,
  };
}

// Usage
const user = new PublicKey('...');
const data = await getAtomIdData(user);
if (data) {
  console.log('Rank:', data.rank);
  console.log('Total Burned:', data.totalBurned);
}`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Verify AtomID Rank</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-blue-400">
{`async function verifyAtomIdRank(
  userPublicKey: PublicKey,
  minimumRank: number
): Promise<boolean> {
  const attestation = await sasClient.getAttestation(
    ATOMID_CREDENTIAL,
    ATOMID_SCHEMA,
    userPublicKey
  );

  if (!attestation) {
    return false; // No attestation = no AtomID
  }

  return attestation.data.rank >= minimumRank;
}

// Example: DAO voting gate
const canVote = await verifyAtomIdRank(userWallet, 5);
if (!canVote) {
  alert('Rank 5 or higher required to participate in governance');
}

// Example: Tiered marketplace fees
const attestation = await sasClient.getAttestation(
  ATOMID_CREDENTIAL,
  ATOMID_SCHEMA,
  userWallet
);

if (attestation && attestation.data.rank >= 7) {
  console.log('Premium seller - 0% platform fees!');
}`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Attestation Data Schema</h3>
              <p className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
                AtomID attestations follow this fixed 17-byte schema:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-3 font-mono">Field</th>
                      <th className="text-left p-3 font-mono">Type</th>
                      <th className="text-left p-3 font-mono">Bytes</th>
                      <th className="text-left p-3 font-mono">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-400">
                    <tr className="border-b border-white/10">
                      <td className="p-3">rank</td>
                      <td className="p-3">u8</td>
                      <td className="p-3">1</td>
                      <td className="p-3">Current rank (0-10)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-3">total_burned</td>
                      <td className="p-3">u64</td>
                      <td className="p-3">8</td>
                      <td className="p-3">Total ATOM burned (with decimals)</td>
                    </tr>
                    <tr>
                      <td className="p-3">created_at_slot</td>
                      <td className="p-3">u64</td>
                      <td className="p-3">8</td>
                      <td className="p-3">Slot when AtomID was created</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-gradient-to-r from-orange-600/20 to-white/10 border border-orange-500/30 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Complete Example: Game with Rank-Based Items</h3>
              <div className="bg-black border border-white/30 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-orange-400">
{`// Game that grants special items based on AtomID rank
async function grantSpecialItem(userPublicKey: PublicKey) {
  const attestation = await sasClient.getAttestation(
    ATOMID_CREDENTIAL,
    ATOMID_SCHEMA,
    userPublicKey
  );

  if (!attestation) {
    throw new Error('AtomID required to play');
  }

  const rank = attestation.data.rank;

  // Grant items based on rank
  let item: string;
  if (rank >= 9) {
    item = 'Legendary Eternal Sword';
  } else if (rank >= 7) {
    item = 'Mythic Sage Staff';
  } else if (rank >= 5) {
    item = 'Epic Oracle Amulet';
  } else if (rank >= 3) {
    item = 'Rare Guardian Shield';
  } else {
    item = 'Common Initiate Dagger';
  }

  console.log(\`Granted: \${item} (Rank \${rank})\`);

  return {
    item,
    rank,
    totalBurned: attestation.data.totalBurned,
  };
}

// That's it! Just 3 lines with sas-lib to verify identity.`}
                </pre>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Why Use SAS Integration?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-black border border-white/20 p-4 sm:p-5">
                  <h4 className="font-mono text-sm text-green-400 mb-2">✓ Standardized</h4>
                  <p className="text-gray-400 text-sm">
                    Uses Solana Foundation's official attestation standard
                  </p>
                </div>
                <div className="bg-black border border-white/20 p-4 sm:p-5">
                  <h4 className="font-mono text-sm text-green-400 mb-2">✓ Interoperable</h4>
                  <p className="text-gray-400 text-sm">
                    Works with any app that supports SAS attestations
                  </p>
                </div>
                <div className="bg-black border border-white/20 p-4 sm:p-5">
                  <h4 className="font-mono text-sm text-green-400 mb-2">✓ Lightweight</h4>
                  <p className="text-gray-400 text-sm">
                    No need to integrate with AtomID program directly
                  </p>
                </div>
                <div className="bg-black border border-white/20 p-4 sm:p-5">
                  <h4 className="font-mono text-sm text-green-400 mb-2">✓ Future-Proof</h4>
                  <p className="text-gray-400 text-sm">
                    Automatic compatibility with SAS ecosystem growth
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-special mb-4">Resources</h3>
              <div className="space-y-3">
                <a
                  href="https://attest.solana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-black border border-white/20 p-4 hover:border-white/60 transition-all"
                >
                  <div className="font-mono text-sm text-gray-400 mb-1">SAS Documentation</div>
                  <div className="text-white">Official Solana Attestation Service docs →</div>
                </a>
                <a
                  href="https://github.com/solana-foundation/solana-attestation-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-black border border-white/20 p-4 hover:border-white/60 transition-all"
                >
                  <div className="font-mono text-sm text-gray-400 mb-1">SAS GitHub</div>
                  <div className="text-white">Source code and examples →</div>
                </a>
                <a
                  href="https://www.npmjs.com/package/sas-lib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-black border border-white/20 p-4 hover:border-white/60 transition-all"
                >
                  <div className="font-mono text-sm text-gray-400 mb-1">SAS NPM Package (sas-lib)</div>
                  <div className="text-white">Install the official client →</div>
                </a>
              </div>
            </section>
          </div>
        )}

        <section className="mt-12 sm:mt-16 bg-black border-2 border-white p-6 sm:p-8 lg:p-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-special mb-4">Need Help?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join our community to get support, share your integration, and help shape the future of
            the Lost Bitcoin Layer protocol.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <a
              href="https://x.com/lostbtclayer"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              Twitter / X
            </a>
            <a
              href="https://github.com/astrohackerx/AtomID"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              GitHub
            </a>
            <Link
              to="/"
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider bg-white text-black hover:-translate-y-0.5 transition-transform"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
