import Magic from "../types/magic.ts";
import BaseEvent from "./base.ts";

class TerminateEvent extends BaseEvent {
  constructor() {
    super(Magic.Terminate);
  }

  into() {
    return new Uint8Array([this.magic]);
  }
}

export default TerminateEvent;
