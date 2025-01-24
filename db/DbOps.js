const { client, DbName } = require("./InitDB");

async function insertData(params) {
    try {
        const docId = params.id;
        const doc = {
            _id: docId + '',
            log: params.data
        }

        const createDocumentResponse = await client.postDocument({
            db: DbName,
            document: doc,
        });
        return true;
    }
    catch (err) {
        // console.log(err)
        console.log("DB insertion failed")
        return false;
    }

}

async function getData(docId) {
    try{
        const getDocParams = {
            db: DbName,
            docId: docId + '',
        };
        const {result} = await client.getDocument(getDocParams);
        return true;
    }
    catch(err){
        // console.log(err);
        console.log("DB extraction failed!")
        return false;
    }
}

module.exports = {
    getData, insertData
};