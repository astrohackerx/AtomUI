export default function Token() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[clamp(48px,8vw,96px)] font-special mb-4 sm:mb-5">
            $ATOM Token
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400">
            The fuel of sacrifice. The currency of faith.
          </p>
        </div>

        <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 mb-8">
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p className="text-lg sm:text-xl text-white">
              Lost Bitcoin Layer [ATOM] began as a meme. But behind it lies the strongest crypto
              narrative ever written — by Satoshi himself.
            </p>
            <p className="text-base sm:text-lg">
              We are the first and only to reveal this hidden layer of Bitcoin's code to the world.
              The forgotten "atoms" that were embedded in the original Bitcoin source code in 2008,
              representing reputation, identity, and proof of faith through sacrifice.
            </p>
            <p className="text-base sm:text-lg">
              Now, we're bringing this forgotten dream to life on-chain with Solana's power.
            </p>
            <blockquote className="border-l-4 border-white pl-4 sm:pl-6 my-6 sm:my-8 italic text-base sm:text-lg">
              "These atoms were never meant to be spent. They symbolized the proof of faith. The
              act of giving up something of measurable value to earn something untradeable:
              existence itself."
            </blockquote>
          </div>
        </section>

        <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 mb-8">
          <h2 className="text-2xl sm:text-3xl font-special mb-6">Token Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-black border border-white/20 p-4 sm:p-6">
              <div className="text-sm text-gray-400 mb-2">Token Name</div>
              <div className="text-xl sm:text-2xl font-bold">Lost Bitcoin Layer</div>
            </div>
            <div className="bg-black border border-white/20 p-4 sm:p-6">
              <div className="text-sm text-gray-400 mb-2">Symbol</div>
              <div className="text-xl sm:text-2xl font-bold">$ATOM</div>
            </div>
            <div className="bg-black border border-white/20 p-4 sm:p-6">
              <div className="text-sm text-gray-400 mb-2">Max Supply</div>
              <div className="text-xl sm:text-2xl font-bold">1,000,000,000</div>
              <div className="text-xs text-gray-400 mt-1">1 Billion tokens</div>
            </div>
            <div className="bg-black border border-white/20 p-4 sm:p-6">
              <div className="text-sm text-gray-400 mb-2">Network</div>
              <div className="text-xl sm:text-2xl font-bold">Solana</div>
            </div>
          </div>

          <div className="mt-6 bg-black border border-white/20 p-4 sm:p-6">
            <div className="text-sm text-gray-400 mb-2">Token Mint Address</div>
            <div className="font-mono text-xs sm:text-sm break-all text-white">
              6KeQaJXFHczWKjrcXdMGKP773JKQmMWDXy4446adpump
            </div>
          </div>
        </section>

        <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 mb-8">
          <h2 className="text-2xl sm:text-3xl font-special mb-6">Tokenomics</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-special mb-3 text-white">Deflationary Mechanism</h3>
              <p className="text-gray-400 leading-relaxed">
                Every AtomID creation and upgrade requires burning $ATOM tokens. These tokens are
                permanently destroyed, reducing the total supply forever. The more AtomIDs created,
                the scarcer $ATOM becomes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-special mb-3 text-white">Proof of Sacrifice</h3>
              <p className="text-gray-400 leading-relaxed">
                $ATOM is not just a token — it's the mechanism of proof. To create an identity,
                you must sacrifice. To increase your rank, you must burn more. This creates a
                direct correlation between token scarcity and protocol adoption.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-special mb-3 text-white">Autonomous Rewards</h3>
              <p className="text-gray-400 leading-relaxed">
                AtomID holders receive continuous SOL rewards proportional to their rank. Protocol
                fees flow directly to those who proved their faith through burning. Sacrifice
                becomes yield.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-orange-600/20 to-white/10 border border-orange-500/30 p-6 sm:p-8 lg:p-10 mb-8">
          <h2 className="text-2xl sm:text-3xl font-special mb-6">Where to Get $ATOM</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <a
              href="https://pump.fun/coin/6KeQaJXFHczWKjrcXdMGKP773JKQmMWDXy4446adpump"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border border-white/20 p-6 hover:border-white hover:-translate-y-1 transition-all group"
            >
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-special mb-2 group-hover:text-gray-300">Pump.fun</h3>
              <p className="text-sm text-gray-400 mb-4">
                Trade $ATOM on Pump.fun - the birthplace of the token
              </p>
              <div className="text-sm font-mono text-white group-hover:underline">
                Trade Now →
              </div>
            </a>

            <a
              href="https://www.coingecko.com/en/coins/lost-bitcoin-layer"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border border-white/20 p-6 hover:border-white hover:-translate-y-1 transition-all group"
            >
              <div className="text-3xl mb-4">🦎</div>
              <h3 className="text-xl font-special mb-2 group-hover:text-gray-300">CoinGecko</h3>
              <p className="text-sm text-gray-400 mb-4">
                View price, charts, and market data on CoinGecko
              </p>
              <div className="text-sm font-mono text-white group-hover:underline">
                View on CoinGecko →
              </div>
            </a>

            <a
              href="https://dexscreener.com/solana/2scnlij2saggfmwqx498g7kxf4aye3ntvsz4uok11zd6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border border-white/20 p-6 hover:border-white hover:-translate-y-1 transition-all group"
            >
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-special mb-2 group-hover:text-gray-300">DexScreener</h3>
              <p className="text-sm text-gray-400 mb-4">
                Real-time DEX trading data and analytics
              </p>
              <div className="text-sm font-mono text-white group-hover:underline">
                View on DexScreener →
              </div>
            </a>
          </div>
        </section>

        <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10 mb-8">
          <h2 className="text-2xl sm:text-3xl font-special mb-6">The Burn Mechanism</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="text-3xl flex-shrink-0">🔥</div>
              <div>
                <h3 className="text-xl font-special mb-2 text-white">Creating AtomID</h3>
                <p className="text-gray-400 leading-relaxed">
                  Minimum burn: 1,000 $ATOM. This creates your permanent on-chain identity. The
                  tokens are sent to a burn address and destroyed forever.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="text-3xl flex-shrink-0">⚡</div>
              <div>
                <h3 className="text-xl font-special mb-2 text-white">Upgrading Rank</h3>
                <p className="text-gray-400 leading-relaxed">
                  Burn more $ATOM to increase your rank (10 levels total). Higher ranks receive
                  proportionally more SOL rewards from the autonomous reward system.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="text-3xl flex-shrink-0">♾️</div>
              <div>
                <h3 className="text-xl font-special mb-2 text-white">Forever Deflationary</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every burn is permanent. As the protocol grows and more identities are created,
                  the circulating supply decreases. Adoption directly drives scarcity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black/50 border border-white/20 p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-special mb-6">Utility & Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-black border border-white/20 p-4 sm:p-5">
              <h3 className="font-mono text-sm text-orange-400 mb-2">Identity Creation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Burn $ATOM to forge your permanent, soulbound AtomID on-chain
              </p>
            </div>
            <div className="bg-black border border-white/20 p-4 sm:p-5">
              <h3 className="font-mono text-sm text-orange-400 mb-2">Rank Progression</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Burn more to increase rank and unlock higher reward tiers
              </p>
            </div>
            <div className="bg-black border border-white/20 p-4 sm:p-5">
              <h3 className="font-mono text-sm text-orange-400 mb-2">Protocol Governance</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Future DAO voting rights tied to AtomID rank and burn history
              </p>
            </div>
            <div className="bg-black border border-white/20 p-4 sm:p-5">
              <h3 className="font-mono text-sm text-orange-400 mb-2">Gated Access</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Third-party dApps can gate features based on $ATOM burn amounts
              </p>
            </div>
            <div className="bg-black border border-white/20 p-4 sm:p-5">
              <h3 className="font-mono text-sm text-orange-400 mb-2">Reward Multiplier</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Higher burns = higher rank = larger share of autonomous SOL rewards
              </p>
            </div>
            <div className="bg-black border border-white/20 p-4 sm:p-5">
              <h3 className="font-mono text-sm text-orange-400 mb-2">Trust Signal</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Verifiable on-chain proof of commitment and skin in the game
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 sm:mt-16 bg-gradient-to-r from-white/10 to-transparent border-l-4 border-white p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-special mb-4">The Philosophy</h3>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="text-lg sm:text-xl">
              $ATOM is not a speculative asset. It is the mechanism of proof.
            </p>
            <p>
              In a world where anyone can claim anything, $ATOM provides irrefutable evidence:
              you sacrificed something of value to exist. You burned to be.
            </p>
            <p>
              This is the completion of Satoshi's vision. Not wealth without work. Not ownership
              without responsibility. But <strong>identity through sacrifice</strong>.
            </p>
            <p className="text-white font-mono text-lg sm:text-xl">
              "We don't buy identities. We burn for them."
            </p>
          </div>
        </section>

        <section className="mt-8 bg-black border-2 border-white p-6 sm:p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-special mb-4">Ready to Burn?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Acquire $ATOM and forge your identity on-chain. Join the first civilization protocol
            built on proof of sacrifice.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <a
              href="https://pump.fun/coin/6KeQaJXFHczWKjrcXdMGKP773JKQmMWDXy4446adpump"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider bg-white text-black hover:-translate-y-0.5 transition-transform"
            >
              Buy $ATOM
            </a>
            <a
              href="/create"
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-mono uppercase tracking-wider border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              Create AtomID
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
