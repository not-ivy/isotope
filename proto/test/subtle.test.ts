import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.188.0/testing/asserts.ts";
import * as subtleUtils from "../utils/subtle.ts";

Deno.test("utils/subtle", async (t) => {
  await t.step("ecdsa", async (t) => {
    await t.step("sign/verify", async () => {
      const pair = await subtleUtils.newECDSAPair();
      const message = new TextEncoder().encode("Hello, World!");
      const signature = await subtleUtils.signECDSA(pair.privateKey, message);
      const verified = await subtleUtils.verifyECDSA(
        pair.publicKey,
        signature,
        message,
      );
      assert(verified);
    });

    await t.step("import/export", async () => {
      const pair = await subtleUtils.newECDSAPair();
      const raw = await subtleUtils.exportRawKey(pair.publicKey);
      const imported = await subtleUtils.importRawPublicECDSA(raw);
      assertEquals(pair.publicKey, imported);
    });
  });

  await t.step("ecdh", async (t) => {
    await t.step("exchange", async () => {
      const party1 = await subtleUtils.newECDHPair();
      const party2 = await subtleUtils.newECDHPair();

      const party1Shared = await subtleUtils.performECDH(
        party2.publicKey,
        party1.privateKey,
      );

      const party2Shared = await subtleUtils.performECDH(
        party1.publicKey,
        party2.privateKey,
      );

      assertEquals(party1Shared, party2Shared);
    });

    await t.step("import/export", async () => {
      const pair = await subtleUtils.newECDHPair();
      const raw = await subtleUtils.exportRawKey(pair.publicKey);
      const imported = await subtleUtils.importRawPublicECDH(raw);
      assertEquals(pair.publicKey, imported);
    });
  });

  await t.step("gcm", async () => {
    const party1 = await subtleUtils.newECDHPair();
    const party2 = await subtleUtils.newECDHPair();

    const party1Shared = await subtleUtils.performECDH(
      party2.publicKey,
      party1.privateKey,
    );

    const party2Shared = await subtleUtils.performECDH(
      party1.publicKey,
      party2.privateKey,
    );

    assertEquals(party1Shared, party2Shared);

    const party1GCM = await subtleUtils.gcmFromECDH(party1Shared);
    const party2GCM = await subtleUtils.gcmFromECDH(party2Shared);

    assertEquals(party1GCM, party2GCM);

    const message = new TextEncoder().encode("Hello, World!");
    const encrypted = await subtleUtils.encryptGCM(party1GCM, message);

    const decrypted = await subtleUtils.decryptGCM(
      encrypted.iv,
      party2GCM,
      encrypted.ciphertext,
    );

    assertEquals(decrypted, message);
  });
});
