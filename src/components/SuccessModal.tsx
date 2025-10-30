import { SOLANA_NETWORK } from '../lib/constants';

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  txSignature?: string;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, title, message, txSignature, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-5" onClick={onClose}>
      <div className="bg-black border-2 border-white p-10 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center mb-5">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <h2 className="text-3xl font-special text-center mb-5">{title}</h2>
        <p className="text-gray-400 text-center mb-8">{message}</p>
        {txSignature && txSignature.length > 0 && (
          <div className="bg-white/5 border border-white/10 p-5 mb-8">
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">Transaction Signature:</p>
            <code className="font-mono text-xs break-all block mb-5">{txSignature}</code>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href={`https://explorer.solana.com/tx/${txSignature}${SOLANA_NETWORK === 'mainnet' ? '' : '?cluster=devnet'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-sm font-mono uppercase tracking-wider border border-white/30 hover:border-white transition-colors"
              >
                Solana Explorer
              </a>
              <a
                href={`https://solscan.io/tx/${txSignature}${SOLANA_NETWORK === 'mainnet' ? '' : '?cluster=devnet'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-sm font-mono uppercase tracking-wider border border-white/30 hover:border-white transition-colors"
              >
                Solscan
              </a>
            </div>
          </div>
        )}
        <button onClick={onClose} className="w-full px-10 py-4 text-base font-mono uppercase tracking-wider border-2 border-white bg-white text-black hover:-translate-y-0.5 transition-transform">
          Close
        </button>
      </div>
    </div>
  );
}
