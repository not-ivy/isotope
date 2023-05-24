import * as cbor from "https://deno.land/x/cbor@v1.5.2/index.js";

import Magic from "../types/magic.ts";
import BaseEvent from "./base.ts";

class MessageEvent extends BaseEvent {
  content: Uint8Array;
  sharedSecret?: Uint8Array;
  publicKey: Uint8Array;

  constructor(publicKey: Uint8Array, sharedSecret: Uint8Array, content: {
    message: string;
    attachment?: Uint8Array[];
  }) {
    super(Magic.Message);

    this.sharedSecret = sharedSecret;
    this.publicKey = publicKey;
    this.content = cbor.encode(content);
  }

  async init() {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ecdhSubtlePublic = await crypto.subtle.importKey(
      "raw",
      this.publicKey,
      {
        name: "ECDH",
        namedCurve: "P-256",
      },
      false,
      [],
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: "ECDH",
        public: ecdhSubtlePublic,
      },
      ecdhSubtleSecret,
      {
        name: "AES-GCM",
        length: 256,
      },
      false,
      ["encrypt", "decrypt"],
    );
    console.log(iv, key);
    // return crypto.subtle.encrypt(
    //   { name: "ECDH", iv },
    //   key,
    //   this.#content,
    // );
  }

  into(): Uint8Array {
    throw new Error("Method not implemented.");
  }
}

export default MessageEvent;
