export function newECDSAPair() {
  return crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["sign", "verify"],
  );
}

export async function signECDSA(secretKey: CryptoKey, data: Uint8Array) {
  const signature = await crypto.subtle.sign(
    {
      name: "ECDSA",
      hash: { name: "SHA-256" },
    },
    secretKey,
    data,
  );

  return new Uint8Array(signature);
}

export function verifyECDSA(
  publicKey: CryptoKey,
  signature: Uint8Array,
  data: Uint8Array,
) {
  return crypto.subtle.verify(
    {
      name: "ECDSA",
      hash: { name: "SHA-256" },
    },
    publicKey,
    signature,
    data,
  );
}

export function importRawPublicECDSA(raw: Uint8Array) {
  return crypto.subtle.importKey(
    "raw",
    raw,
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["verify"],
  );
}

export function newECDHPair() {
  return crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"],
  );
}

export async function exportRawKey(publicKey: CryptoKey) {
  const raw = await crypto.subtle.exportKey("raw", publicKey);
  return new Uint8Array(raw);
}

export function importRawPublicECDH(raw: Uint8Array) {
  return crypto.subtle.importKey(
    "raw",
    raw,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    [],
  );
}

export async function performECDH(publicKey: CryptoKey, secretKey: CryptoKey) {
  const sharedSecret = await crypto.subtle.deriveBits(
    {
      name: "ECDH",
      public: publicKey,
    },
    secretKey,
    256,
  );

  return new Uint8Array(sharedSecret);
}

export function gcmFromECDH(sharedSecret: Uint8Array) {
  return crypto.subtle.importKey(
    "raw",
    sharedSecret,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptGCM(key: CryptoKey, data: Uint8Array) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipherText = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data,
  );

  return {
    iv,
    ciphertext: new Uint8Array(cipherText),
  };
}

export async function decryptGCM(
  iv: Uint8Array,
  key: CryptoKey,
  data: Uint8Array,
) {
  const plain = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data,
  );
  return new Uint8Array(plain);
}
