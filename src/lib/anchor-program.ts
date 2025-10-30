import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { PROGRAM_ID, SAS_PROGRAM_ID } from './constants';
import IDL from './atom_id.json';

export function getProgram(provider: AnchorProvider): Program {
  return new Program(IDL as any, provider);
}

export function getAtomIdPDA(owner: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([Buffer.from('atomid'), owner.toBuffer()], PROGRAM_ID);
}

export function getConfigPDA(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([Buffer.from('atomid_config')], PROGRAM_ID);
}

export function getSasAttestationPDA(
  credential: PublicKey,
  schema: PublicKey,
  nonce: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('attestation'),
      credential.toBuffer(),
      schema.toBuffer(),
      nonce.toBuffer(),
    ],
    SAS_PROGRAM_ID
  );
}

export function getSasEventAuthorityPDA(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('__event_authority')],
    SAS_PROGRAM_ID
  );
}

export function getSasAuthorityPDA(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('sas_authority')],
    PROGRAM_ID
  );
}

export async function fetchAtomIdAccount(connection: Connection, owner: PublicKey) {
  const [pda] = getAtomIdPDA(owner);
  const accountInfo = await connection.getAccountInfo(pda);

  if (!accountInfo) {
    return null;
  }

  return {
    address: pda,
    data: accountInfo.data,
  };
}
