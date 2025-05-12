export function encryptCaesar(text: string, shiftValue: number): string {
  let encText = "";
  const shift = shiftValue % 26; // Ensure the shift is within the range of 0-25
  for (let i = 0; i < text.length; i++) {
    const c = text[i].charCodeAt(0);
    if (65 <= c && c <= 90) {
      encText += String.fromCharCode(((c - 65 + shift) % 26) + 65);
    } else if (97 <= c && c <= 122) {
      encText += String.fromCharCode(((c - 97 + shift) % 26) + 97);
    } else {
      encText += text[i];
    }
  }

  return encText;
}

export function decryptCaesar(text: string, shiftValue: number): string {
  let decText = "";
  const shift = shiftValue % 26;

  for (let i = 0; i < text.length; i++) {
    const c = text[i].charCodeAt(0);
    if (65 <= c && c <= 90) {
      decText += String.fromCharCode(((c - 65 - shift + 26) % 26) + 65);
    } else if (97 <= c && c <= 122) {
      decText += String.fromCharCode(((c - 97 - shift + 26) % 26) + 97);
    } else {
      decText += text[i];
    }
  }
  return decText;
}

// console.log(process.argv);
// const t = process.argv[2];
// const shift = parseInt(process.argv[3]);
// const res = encryptCaesar(t, shift);
// console.log(res);
// console.log(decryptCaesar(res, shift));
