import { Sia } from "@timeleap/sia";

export interface Signature {
  signer: Uint8Array | Buffer;
  signature: Uint8Array | Buffer;
}

export function encodeSignature(sia: Sia, signature: Signature): Sia {
  sia.addByteArrayN(signature.signer);
  sia.addByteArrayN(signature.signature);
  return sia;
}

export function decodeSignature(sia: Sia): Signature {
  return {
    signer: sia.readByteArrayN(32),
    signature: sia.readByteArrayN(64),
  };
}

export interface Fee {
  amount: number;
  currency: string;
}

export function encodeFee(sia: Sia, fee: Fee): Sia {
  sia.addUInt64(fee.amount);
  sia.addString8(fee.currency);
  return sia;
}

export function decodeFee(sia: Sia): Fee {
  return {
    amount: sia.readUInt64(),
    currency: sia.readString8(),
  };
}

export interface Credit {
  uuid: Uint8Array | Buffer;
  amount: number;
  currency: string;
  user: Uint8Array | Buffer;
  subnet: Uint8Array | Buffer;
  proof: Signature;
}

export function encodeCredit(sia: Sia, credit: Credit): Sia {
  sia.addByteArray8(credit.uuid);
  sia.addUInt64(credit.amount);
  sia.addString8(credit.currency);
  sia.addByteArrayN(credit.user);
  sia.addByteArrayN(credit.subnet);
  encodeSignature(sia, credit.proof);
  return sia;
}

export function decodeCredit(sia: Sia): Credit {
  return {
    uuid: sia.readByteArray8(),
    amount: sia.readUInt64(),
    currency: sia.readString8(),
    user: sia.readByteArrayN(32),
    subnet: sia.readByteArrayN(32),
    proof: decodeSignature(sia),
  };
}

export interface Refund {
  uuid: Uint8Array | Buffer;
  debit: Uint8Array | Buffer;
  amount: number;
  currency: string;
  user: Uint8Array | Buffer;
  subnet: Uint8Array | Buffer;
  proof: Signature;
}

export function encodeRefund(sia: Sia, refund: Refund): Sia {
  sia.addByteArray8(refund.uuid);
  sia.addByteArray8(refund.debit);
  sia.addUInt64(refund.amount);
  sia.addString8(refund.currency);
  sia.addByteArrayN(refund.user);
  sia.addByteArrayN(refund.subnet);
  encodeSignature(sia, refund.proof);
  return sia;
}

export function decodeRefund(sia: Sia): Refund {
  return {
    uuid: sia.readByteArray8(),
    debit: sia.readByteArray8(),
    amount: sia.readUInt64(),
    currency: sia.readString8(),
    user: sia.readByteArrayN(32),
    subnet: sia.readByteArrayN(32),
    proof: decodeSignature(sia),
  };
}

export interface Debit {
  uuid: Uint8Array | Buffer;
  amount: number;
  currency: string;
  user: Signature;
  subnet: Uint8Array | Buffer;
  proof: Signature;
}

export function encodeDebit(sia: Sia, debit: Debit): Sia {
  sia.addByteArray8(debit.uuid);
  sia.addUInt64(debit.amount);
  sia.addString8(debit.currency);
  encodeSignature(sia, debit.user);
  sia.addByteArrayN(debit.subnet);
  encodeSignature(sia, debit.proof);
  return sia;
}

export function decodeDebit(sia: Sia): Debit {
  return {
    uuid: sia.readByteArray8(),
    amount: sia.readUInt64(),
    currency: sia.readString8(),
    user: decodeSignature(sia),
    subnet: sia.readByteArrayN(32),
    proof: decodeSignature(sia),
  };
}

export interface Authorize {
  user: Uint8Array | Buffer;
  subnet: Uint8Array | Buffer;
  proof: Signature;
}

export function encodeAuthorize(sia: Sia, authorize: Authorize): Sia {
  sia.addByteArrayN(authorize.user);
  sia.addByteArrayN(authorize.subnet);
  encodeSignature(sia, authorize.proof);
  return sia;
}

export function decodeAuthorize(sia: Sia): Authorize {
  return {
    user: sia.readByteArrayN(32),
    subnet: sia.readByteArrayN(32),
    proof: decodeSignature(sia),
  };
}

export interface UnAuthorize {
  user: Uint8Array | Buffer;
  subnet: Uint8Array | Buffer;
  proof: Signature;
}

export function encodeUnAuthorize(sia: Sia, unAuthorize: UnAuthorize): Sia {
  sia.addByteArrayN(unAuthorize.user);
  sia.addByteArrayN(unAuthorize.subnet);
  encodeSignature(sia, unAuthorize.proof);
  return sia;
}

export function decodeUnAuthorize(sia: Sia): UnAuthorize {
  return {
    user: sia.readByteArrayN(32),
    subnet: sia.readByteArrayN(32),
    proof: decodeSignature(sia),
  };
}

export interface FunctionCall {
  uuid: Uint8Array | Buffer;
  plugin: string;
  method: string;
  timeout: number;
  fee: Fee;
}

export function encodeFunctionCall(sia: Sia, functionCall: FunctionCall): Sia {
  sia.addByteArray8(functionCall.uuid);
  sia.addString8(functionCall.plugin);
  sia.addString8(functionCall.method);
  sia.addUInt64(functionCall.timeout);
  encodeFee(sia, functionCall.fee);
  return sia;
}

export function decodeFunctionCall(sia: Sia): FunctionCall {
  return {
    uuid: sia.readByteArray8(),
    plugin: sia.readString8(),
    method: sia.readString8(),
    timeout: sia.readUInt64(),
    fee: decodeFee(sia),
  };
}

export interface Error {
  opcode: number;
  uuid: Uint8Array | Buffer;
  error: number;
}

export function encodeError(sia: Sia, error: Error): Sia {
  sia.addUInt8(error.opcode);
  sia.addByteArray8(error.uuid);
  sia.addUInt16(error.error);
  return sia;
}

export function decodeError(sia: Sia): Error {
  return {
    opcode: sia.readUInt8(),
    uuid: sia.readByteArray8(),
    error: sia.readUInt16(),
  };
}

export interface Success {
  opcode: number;
  uuid: Uint8Array | Buffer;
  error?: number;
  status: boolean;
}

export function encodeSuccess(sia: Sia, success: Success): Sia {
  sia.addUInt8(success.opcode);
  sia.addByteArray8(success.uuid);
  sia.addUInt16(success.error ?? 0);
  sia.addBool(success.status);
  return sia;
}

export function decodeSuccess(sia: Sia): Success {
  return {
    opcode: sia.readUInt8(),
    uuid: sia.readByteArray8(),
    error: sia.readUInt16(),
    status: sia.readBool(),
  };
}
