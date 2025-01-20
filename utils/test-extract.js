const fs = require('fs');
const pdf = require('pdf-parse');

async function readPDF(path){
    try{
        let dataBuffer = fs.readFileSync(path);
        const data = await pdf(dataBuffer);
        return {
            text: data.text,
            numpages: data.numpages,
    
        }
    }
    catch(err){
        return null;
    }

}
module.exports = readPDF;