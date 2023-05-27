import * as cbor from "https://deno.land/x/cbor@v1.5.2/index.js";

export type TopicMessage = {
  type: "message" | "open";
  topic: string;
  data?: Uint8Array;
};

class Topic {
  createdAt = new Date();
  socket: WebSocket;
  topic: string;
  #subscribers: Set<WebSocket> = new Set();

  constructor(topic: string, socket: WebSocket) {
    this.topic = topic;
    this.socket = socket;

    this.socket.binaryType = "arraybuffer";
  }

  addSubscriber(socket: WebSocket) {
    this.#subscribers.add(socket);
    this.addListeners(socket);
  }

  addListeners(socket: WebSocket) {
    socket.addEventListener("message", (ev) => {
      const data = cbor.decode(new Uint8Array(ev.data));
      if (data.type === "broadcast") {
        return;
      }

      this.#subscribers.forEach((subscriber) => {
        subscriber.send(ev.data);
      });
    });

    socket.addEventListener("open", () => {
      console.log("a user joined");
    });

    socket.addEventListener("close", () => {
      this.#subscribers.delete(socket);
      console.log("a user left");
    });
  }

  get subscriberSize() {
    return this.#subscribers.size;
  }

  toJSON() {
    return {
      socket: this.socket.url,
      topic: this.topic,
    };
  }
}

export default Topic;
