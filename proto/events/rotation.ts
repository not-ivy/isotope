import BaseEvent from "./base.ts";
import Magic from "../types/magic.ts";

class RequestRotationEvent extends BaseEvent {
  constructor() {
    super(Magic.Rotation);
    this.ready = true;
  }

  into() {
    return new Uint8Array([this.magic]);
  }
}

export default RequestRotationEvent;
