const { CloudantV1 } = require("@ibm-cloud/cloudant")
const DbName = 'resume-analyzer';
const client = CloudantV1.newInstance({});

module.exports = {
    CloudantV1,
    DbName,
    client
}