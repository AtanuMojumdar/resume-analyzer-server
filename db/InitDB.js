const { CloudantV1 } = require("@ibm-cloud/cloudant")
const exampleDbName = 'resume-analyzer';
const client = CloudantV1.newInstance({});

module.exports = {
    CloudantV1,
    exampleDbName,
    client
}