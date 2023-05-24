export function uint8arrayToHex(array: Uint8Array) {
  const hashArray = Array.from(new Uint8Array(array));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
