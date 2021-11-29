export function uuid(): string {
  let id = "";
  let random: number;

  for (let i = 0; i < 32; i += 1) {
    const { crypto } = window;
    const array = new Uint8Array(1);
    // eslint-disable-next-line no-bitwise
    random = (crypto.getRandomValues(array)[0] | 0) % 16;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      id += "-";
    }

    // eslint-disable-next-line no-bitwise
    const num = i === 16 ? (random & 3) | 8 : random;
    id += (i === 12 ? 4 : num).toString(16);
  }

  return id;
}
