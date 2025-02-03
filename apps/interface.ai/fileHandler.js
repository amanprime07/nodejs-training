const fs = require('fs').promises;


// Read File

const readFile = async (directory, fileName) => {
    try {
        const path = `${directory}/${fileName}`;
        return fs.readFile(path, 'utf-8');
    } catch(err){
        console.log("Error while reading file :" + fileName);
        throw err;
    }
}


const writeFile = async(directory, fileName, content) => {
    try{
        console.log(`Writing file ${fileName} in directory ${directory}`)
        const path = `${directory}/${fileName}`;
        fs.writeFile(path, content);
    } catch(err){
        console.log("Error occurred while writing file " + fileName + " err message: " + err)
        throw err;
    }
}

const listFiles = async(directory) => {
    try {
        const files = fs.readdir(directory);
        return files;
    } catch (err){
        console.log(`Error reading files list from dir: ${directory}`)
        return Promise.resolve([]);
    }
}

module.exports  = { readFile, writeFile, listFiles }