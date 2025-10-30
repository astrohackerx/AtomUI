# AtomID dApp - Frontend Application

A comprehensive decentralized application for the AtomID protocol - identity through sacrifice on the Lost Bitcoin Layer.

## Overview

This React + TypeScript application provides a complete interface for users to interact with the AtomID protocol on Solana. Users can create, upgrade, and manage their on-chain identities by burning $ATOM tokens.

## Features

### Core Functionality

- **Create AtomID**: Burn $ATOM tokens to mint a permanent on-chain identity
- **Upgrade AtomID**: Increase your rank by burning additional $ATOM
- **Profile Management**: View your AtomID stats, rank, oath, and burn history
- **Leaderboard**: Real-time ranking of all AtomIDs by total burn amount
- **Hall of Flame**: Showcase of top burners and protocol statistics

### Key Highlights

- Full Solana wallet integration (Phantom, Solflare)
- Real-time on-chain data fetching via Anchor
- Supabase integration for leaderboard and burn history
- Responsive design with modern UI/UX
- Cypherpunk aesthetic with flame-themed branding

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Blockchain**: Solana Web3.js, Anchor, SPL Token
- **Wallet**: Solana Wallet Adapter
- **Database**: Supabase
- **Styling**: Custom CSS with CSS variables
- **Routing**: React Router v7

## Getting Started

### Prerequisites

- Node.js 18+
- A Solana wallet (Phantom, Solflare, etc.)
- $ATOM tokens on devnet

### Installation

```bash
cd app
npm install
```

### Environment Variables

Create a `.env` file in the app directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SOLANA_NETWORK=devnet
VITE_PROGRAM_ID=9ntZFb85wU5zng1rM6pTnzbcm9S4s8iTMvhBUYyLZQc1
VITE_ATOM_MINT=DEmAM5nQE5fpAwu3xotx5N19FG6GiDt3e3o6ysDYmaqT
VITE_MIN_CREATE_BURN=1000000000
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Application Structure

```
app/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── Header.tsx    # Navigation and wallet connection
│   ├── pages/            # Main application pages
│   │   ├── Home.tsx      # Landing page with philosophy
│   │   ├── Create.tsx    # AtomID creation workflow
│   │   ├── Upgrade.tsx   # AtomID upgrade workflow
│   │   ├── Profile.tsx   # User profile and stats
│   │   ├── Leaderboard.tsx   # All AtomIDs ranked
│   │   └── HallOfFlame.tsx   # Top burners showcase
│   ├── lib/              # Core utilities and config
│   │   ├── constants.ts  # Program IDs and configuration
│   │   ├── supabase.ts   # Database client and types
│   │   └── anchor-program.ts  # Anchor program interface
│   ├── styles/           # Global styles
│   │   └── global.css    # CSS variables and base styles
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx          # Application entry point
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## User Workflows

### Creating an AtomID

1. Connect your Solana wallet
2. Navigate to "Create" page
3. Enter burn amount (minimum 1000 $ATOM)
4. Optionally add an oath/message (max 200 characters)
5. Sign transaction to burn tokens and mint AtomID
6. View your new identity on the Profile page

### Upgrading Your AtomID

1. Navigate to "Upgrade" page
2. Enter additional burn amount
3. Optionally update your oath
4. Sign transaction to upgrade
5. Your rank automatically updates based on total burned

### Viewing the Leaderboard

- See all AtomIDs ranked by total burn amount
- View each user's rank tier, wallet address, and oath
- Click addresses to view on Solscan
- Real-time updates from Supabase

## Design Philosophy

The application embodies the cypherpunk ethos:

- **Identity without control**: No admin can revoke your AtomID
- **Trust through burn**: Proof of sacrifice is permanent and verifiable
- **Minimalist aesthetic**: Focus on function over decoration
- **Flame motif**: Visual representation of burning as transformation

## Database Schema

The app uses Supabase with two main tables:

### atomid_accounts
- `owner_pubkey`: Solana wallet address
- `total_burned`: Total $ATOM burned
- `rank`: Calculated rank tier
- `metadata`: User's oath/message
- `created_at`, `updated_at`: Timestamps

### burn_transactions
- `owner_pubkey`: User who burned
- `burn_amount`: Amount burned in transaction
- `transaction_signature`: Solana tx signature
- `transaction_type`: 'create' or 'upgrade'
- `previous_rank`, `new_rank`: Rank progression

## Mainnet Deployment

To switch to mainnet:

1. Update `.env`:
   ```
   VITE_SOLANA_NETWORK=mainnet
   VITE_PROGRAM_ID=<mainnet_program_id>
   VITE_ATOM_MINT=<mainnet_atom_mint>
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

3. Deploy `dist/` to your hosting provider

## Contributing

This dApp is built in the Satoshi Nakamoto style:

- Code is law
- Simplicity over complexity
- Trustless by design
- Permanent and immutable

## License

ISC

## Links

- Solana Program ID: `9ntZFb85wU5zng1rM6pTnzbcm9S4s8iTMvhBUYyLZQc1`
- Devnet Explorer: https://solscan.io/?cluster=devnet

---

*"We don't store users. We store legacies."*
