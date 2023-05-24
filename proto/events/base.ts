abstract class BaseEvent {
  ready = false;

  constructor(public magic: number) {}

  abstract into(): Uint8Array;

  init(): void {
    this.ready = true;
  }
}

export default BaseEvent;