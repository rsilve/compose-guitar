export function uuid(): string {
    let id = ""
    let random: number;

    for (let i = 0; i < 32; i++) {
        const crypto = window.crypto;
        const array = new Uint32Array(1);
        random = crypto.getRandomValues(array)[0] * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            id += "-";
        }

        const num = i == 16 ? (random & 3 | 8) : random;
        id += (i == 12 ? 4 : num).toString(16);
    }

    return id;
}
