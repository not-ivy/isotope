import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.188.0/testing/asserts.ts";
import JoinEvent, { JoinEventPayload } from "../events/join.ts";
import AcceptedEvent from "../events/accepted.ts";
import * as subtleUtils from "../utils/subtle.ts";
import * as cbor from "https://esm.sh/cbor-x@1.5.3";

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
    acceptedEvent.getSharedSecret(),
    subtleUtils.performECDH(
      acceptedEvent.ecdhPair!.publicKey,
      joinEvent.ecdhPair!.privateKey,
    ),
  );
});
