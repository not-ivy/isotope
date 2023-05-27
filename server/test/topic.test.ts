import * as cbor from "https://deno.land/x/cbor@v1.5.2/index.js";
import { uid } from "https://esm.sh/uid@2.0.2";

const topic = "amongus";
const senderId = uid();

const ws = new WebSocket(`ws://localhost:8000/${topic}`);
ws.binaryType = "arraybuffer";

ws.addEventListener("open", () => {
  console.log("connected.");

  setInterval(() => {
    ws.send(cbor.encode({
      type: "test",
      senderId,
      message: "ping!",
    }));
  }, 3000);
});

ws.addEventListener("message", (ev) => {
  const msg = cbor.decode(new Uint8Array(ev.data));
  if (msg.senderId === senderId) return;
  console.log(msg);
});
