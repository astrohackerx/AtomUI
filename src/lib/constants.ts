import { PublicKey } from '@solana/web3.js';

type NetworkType = 'devnet' | 'mainnet';

const USE_MAINNET: NetworkType = 'mainnet';

const NETWORK_CONFIG = {
  devnet: {
    programId: '334fZWRf33wfDSuF1837w4mSQTgTd6r4XjgdLX8TNRjo',
    atomMint: 'DEmAM5nQE5fpAwu3xotx5N19FG6GiDt3e3o6ysDYmaqT',
    minCreateBurn: 1000000000,
    rpcEndpoint: 'https://api.devnet.solana.com',
    sasCredential: '5Ldy7HgzHqmQvX6xQJShzzinmM6yj7bQWLSzAAbUE4Nr',
    sasSchema: '833nW63cXf3q14uz1otraFknAeMAfw8yFwEPGmAhG8xA',
  },
  mainnet: {
    programId: 'rnc2fycemiEgj4YbMSuwKFpdV6nkJonojCXib3j2by6',
    atomMint: '6KeQaJXFHczWKjrcXdMGKP773JKQmMWDXy4446adpump',
    minCreateBurn: 1000000000,
    rpcEndpoint: 'https://broken-fittest-wave.solana-mainnet.quiknode.pro/93f43b5d1f507f1468eeafccc4c861ce5e7bbe03/',
    sasCredential: 'FwzkkBBBcW69tGhQCuuMry8SzS5zN886Qzjw8UDa1aAN',
    sasSchema: 'J7nRQzymcR6sot5rLcRGBU5JfwVBhLVc9xNzsLnc2J4v',
  },
} as const;

const currentConfig = NETWORK_CONFIG[USE_MAINNET];

export const SOLANA_NETWORK: string = USE_MAINNET;
export const PROGRAM_ID = new PublicKey(currentConfig.programId);
export const ATOM_MINT = new PublicKey(currentConfig.atomMint);
export const MIN_CREATE_BURN = currentConfig.minCreateBurn;
export const RPC_ENDPOINT = currentConfig.rpcEndpoint;
export const SAS_PROGRAM_ID = new PublicKey('22zoJMtdu4tQc2PzL74ZUT7FrwgB1Udec8DdW4yw4BdG');
export const SAS_CREDENTIAL = new PublicKey(currentConfig.sasCredential);
export const SAS_SCHEMA = new PublicKey(currentConfig.sasSchema);

export const ATOM_DECIMALS = 6;

export const RANK_NAMES = [
  'Initiate',
  'Believer',
  'Devotee',
  'Guardian',
  'Keeper',
  'Oracle',
  'Architect',
  'Sage',
  'Ascended',
  'Eternal',
];

export const RANK_THRESHOLDS = [
  1000 * 10 ** ATOM_DECIMALS,
  5000 * 10 ** ATOM_DECIMALS,
  10000 * 10 ** ATOM_DECIMALS,
  25000 * 10 ** ATOM_DECIMALS,
  50000 * 10 ** ATOM_DECIMALS,
  100000 * 10 ** ATOM_DECIMALS,
  250000 * 10 ** ATOM_DECIMALS,
  500000 * 10 ** ATOM_DECIMALS,
  1000000 * 10 ** ATOM_DECIMALS,
];

export function getRankName(rank: number): string {
  return RANK_NAMES[rank] || 'Unranked';
}

export function formatAtom(amount: number): string {
  return (amount / 10 ** ATOM_DECIMALS).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function parseAtom(amount: string): number {
  const parsed = parseFloat(amount);
  if (isNaN(parsed)) {
    return NaN;
  }
  return Math.floor(parsed * 10 ** ATOM_DECIMALS);
}
