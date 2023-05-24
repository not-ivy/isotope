import * as cbor from "https://esm.sh/cbor-x@1.5.3";

import BaseEvent from "./base.ts";
import Magic from "../types/magic.ts";
import * as subtleUtils from "../utils/subtle.ts";
import { JoinEventPayload } from "./join.ts";

export type AcceptedEventPayload = {
  ecdsaPublicKey: Uint8Array;
  ecdhPublicKey: Uint8Array;
  signature: Uint8Array;
};

class AcceptedEvent extends BaseEvent {
  joinEventPayload: JoinEventPayload;
  signature?: Uint8Array;
  ecdsaPair?: CryptoKeyPair;
  ecdhPair?: CryptoKeyPair;
  ecdsaRawPublicKey?: Uint8Array;
  ecdhRawPublicKey?: Uint8Array;

  constructor(
    joinEventPayload: Uint8Array,
  ) {
    super(Magic.Accepted);
    if (joinEventPayload[0] !== Magic.Join) throw Error("Invalid join event.");
    this.joinEventPayload = cbor.decode(joinEventPayload.slice(1));
  }

  into() {
    if (!this.ready) throw Error("Event not initialized.");
    return new Uint8Array([
      this.magic,
      ...cbor.encode({
        ecdsaPublicKey: this.ecdsaRawPublicKey,
        ecdhPublicKey: this.ecdhRawPublicKey,
        signature: this.signature,
      } as AcceptedEventPayload),
    ]);
  }

  async init() {
    const importedEcdsa = await subtleUtils.importRawPublicECDSA(
      this.joinEventPayload.ecdsaPublicKey,
    );

    if (
      !await subtleUtils.verifyECDSA(
        importedEcdsa,
        this.joinEventPayload.signature,
        this.joinEventPayload.ecdhPublicKey,
      )
    ) throw Error("Invalid signature.");

    this.ecdsaPair = await subtleUtils.newECDSAPair();
    this.ecdsaRawPublicKey = await subtleUtils.exportRawKey(
      this.ecdsaPair.publicKey,
    );
    this.ecdhPair = await subtleUtils.newECDHPair();
    this.ecdhRawPublicKey = await subtleUtils.exportRawKey(
      this.ecdhPair.publicKey,
    );

    this.signature = await subtleUtils.signECDSA(
      this.ecdsaPair.privateKey,
      this.ecdhRawPublicKey,
    );

    this.ready = true;
  }

  async getSharedSecret() {
    const importedEcdh = await subtleUtils.importRawPublicECDH(
      this.joinEventPayload.ecdhPublicKey,
    );
    return subtleUtils.performECDH(importedEcdh, this.ecdhPair!.privateKey);
  }
}

export default AcceptedEvent;
