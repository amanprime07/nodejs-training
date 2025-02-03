const { readFile, writeFile, listFiles} = require('./fileHandler')
const encryptContent = require('./caeserCipher')




const process = async(inputDir, outputDir) =>{
    const files = await listFiles(inputDir);
    for(f in files){
        const content = await readFile(inputDir, files[f]);
        const encryptedContent = await encryptContent(content);
        await writeFile(outputDir, files[f], encryptedContent);
    }
}

process(__dirname + '/input', __dirname+'/output')