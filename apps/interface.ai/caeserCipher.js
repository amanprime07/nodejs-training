const shiftValue = 3;

const encrypt = (str) => {
  if (str.match(/[a-z]/)) {
    const shift = (str.charCodeAt(0) - 97 + shiftValue) % 26;
    ascii = 97 + shift;
  } else if (str.match(/[A-Z]/)) {
    const shift = (str.charCodeAt(0) - 65 + shiftValue) % 26;
    ascii = 65 + shift;
  } else {
    ascii = str.charCodeAt(0);
  }
  return String.fromCharCode(ascii);
};

const encryptContent = async (data) => {
  let encodedData = data.split("").map((c) => encrypt(c));
  return encodedData;
};

const decrypt = (str) => {
  if (str.match(/[a-z]/)) {
    const shift = (str.charCodeAt(0) - 97 - shiftValue + 26) % 26;
    ascii = 97 + shift;
  } else if (str.match(/[A-Z]/)) {
    const shift = (str.charCodeAt(0) - 65 - shiftValue + 26) % 26;
    ascii = 65 + shift;
  } else {
    ascii = str.charCodeAt(0);
  }
  return String.fromCharCode(ascii);
};

const decryptContent = async (data) => {
  let decodedData = data.split("").map((c) => decrypt(c));
  return decodedData;
};

// console.log(encrypt("z"));
// console.log(decrypt("c"));

module.exports = { encryptContent, decryptContent };
