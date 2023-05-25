import BaseEvent from "./base.ts";
import Magic from "../types/magic.ts";

type BeatEventPayload = {
  timestamp: number;
  to: Uint8Array; // ecdsa public key
};

class BeatEvent extends BaseEvent {
  constructor() {
    super(Magic.Beat);
    this.ready = true;
  }

  into() {
    return new Uint8Array([this.magic]);
  }
}

export default BeatEvent;
