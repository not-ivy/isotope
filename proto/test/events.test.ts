import { assertEquals } from "https://deno.land/std@0.188.0/testing/asserts.ts";
import JoinEvent from "../events/join.ts";
import AcceptedEvent from "../events/accepted.ts";
import MessageEvent from "../events/message.ts";
import * as subtleUtils from "../utils/subtle.ts";

Deno.test("flow", async (t) => {
  const joinEvent = new JoinEvent();
  await joinEvent.init();

  const acceptedEvent = new AcceptedEvent(joinEvent.into());
  await acceptedEvent.init();

  assertEquals(
    joinEvent.ecdhRawPublicKey,
    acceptedEvent.joinEventPayload.ecdhPublicKey,
  );
  assertEquals(
    joinEvent.ecdsaRawPublicKey,
    acceptedEvent.joinEventPayload.ecdsaPublicKey,
  );
  assertEquals(
    joinEvent.signature,
    acceptedEvent.joinEventPayload.signature,
  );
  assertEquals(
    await acceptedEvent.getSharedSecret(),
    await subtleUtils.performECDH(
      acceptedEvent.ecdhPair!.publicKey,
      joinEvent.ecdhPair!.privateKey,
    ),
  );

  const gcmPair1 = await subtleUtils.gcmFromECDH(
    await acceptedEvent.getSharedSecret(),
  );
  const gcmPair2 = await subtleUtils.gcmFromECDH(
    await subtleUtils.performECDH(
      joinEvent.ecdhPair!.publicKey,
      acceptedEvent.ecdhPair!.privateKey,
    ),
  );

  const messageEvent = new MessageEvent(gcmPair1, { message: "Hello, World!" });
  await messageEvent.init();
});
