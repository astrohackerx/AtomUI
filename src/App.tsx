import { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';
import './styles/global.css';

import Header from './components/Header';
import Home from './pages/Home';
import Create from './pages/Create';
import Upgrade from './pages/Upgrade';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import HallOfFlame from './pages/HallOfFlame';
import Docs from './pages/Docs';
import Token from './pages/Token';
import Atomrs from './pages/Atomrs';
import { RPC_ENDPOINT } from './lib/constants';

function App() {
  const endpoint = useMemo(() => RPC_ENDPOINT, []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/upgrade" element={<Upgrade />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/hall-of-flame" element={<HallOfFlame />} />
                  <Route path="/docs" element={<Docs />} />
                  <Route path="/token" element={<Token />} />
                  <Route path="/atomrs" element={<Atomrs />} />
                </Routes>
              </main>
            </div>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
