const shiftValue = 3

const encrypt = (str) => {
    const shift = str.charCodeAt(0) - 97 + shiftValue < 26? ((str.charCodeAt(0)-97 + shiftValue)) : (str.charCodeAt(0)-97 + shiftValue)%26
    ascii = 97 + shift
    return String.fromCharCode(ascii)
}


const encryptContent = async(data)=>{
    let encodedData = data.split('').map(c=>encrypt(c))
    return encodedData;
}

const decrypt = async(str) => {
// todo: add algo
    return str - shiftValue;
}


// console.log(ascii('a')+2)


const map = {
    'a': 'c',
    'b': 'd',
    'c': 'e',
}


module.exports = encryptContent;