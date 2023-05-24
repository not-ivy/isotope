import * as cbor from "https://deno.land/x/cbor@v1.5.2/index.js";

import * as subtleUtils from "../utils/subtle.ts";
import Magic from "../types/magic.ts";
import BaseEvent from "./base.ts";

export type MessageContent = {
  message: string;
  attachment?: Uint8Array[];
};

export type MessageEventPayload = {
  ciphertext: Uint8Array;
  iv: Uint8Array;
};

class MessageEvent extends BaseEvent {
  rawContent: Uint8Array;
  gcmKey: CryptoKey;
  ciphertext?: Uint8Array;
  iv?: Uint8Array;

  constructor(
    gcmKey: CryptoKey,
    content: MessageContent,
  ) {
    super(Magic.Message);

    this.gcmKey = gcmKey;
    this.rawContent = cbor.encode(content);
  }

  async init() {
    const { ciphertext, iv } = await subtleUtils.encryptGCM(
      this.gcmKey,
      this.rawContent,
    );
    this.ciphertext = ciphertext;
    this.iv = iv;
  }

  into() {
    return new Uint8Array([
      this.magic,
      ...cbor.encode({
        ciphertext: this.ciphertext,
        iv: this.iv,
      }),
    ]);
  }

  get decodedContent(): MessageContent {
    return cbor.decode(this.rawContent);
  }
}

export default MessageEvent;
