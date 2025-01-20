const { WatsonXAI } = require('@ibm-cloud/watsonx-ai');
const extract = require('extract-json-from-string');

const watsonxAIService = WatsonXAI.newInstance({
    version: '2023-05-29',
    serviceUrl: "https://us-south.ml.cloud.ibm.com/",
});

async function init(prompt){
    const textGenRequestParametersModel = {
        max_new_tokens: 1000,
    };
    const genParams = {
        input: prompt,
        modelId: 'ibm/granite-3-8b-instruct',
        projectId: "5dcfc15a-c8b6-46ad-b359-219981131560",
        parameters: textGenRequestParametersModel,
    };

    const extractedJson = await askWinstonToDo(genParams);

    return extractedJson;


}


async function askWinstonToDo(genParams) {
    const textGenerationResult = await watsonxAIService.generateText(genParams);
    console.log('\n\n***** TEXT INPUT INTO MODEL *****');
    console.log(genParams.input);
    console.log('\n\n***** TEXT RESPONSE FROM MODEL *****');
    const inputString = textGenerationResult.result.results[0].generated_text;
    console.log(inputString)

    const extractedJsonArray = extract(inputString);
    if (extractedJsonArray.length > 0) {
        const extractedJson = extractedJsonArray[0];
        return extractedJson;
    } else {
        console.log("No JSON object found in the input string.");
        return null;
    }
}

async function askWinstonSuggestion(prompt) {
    const textGenRequestParametersModel = {
        max_new_tokens: 1000,
    };
    const genParams = {
        input: prompt,
        modelId: 'ibm/granite-3-8b-instruct',
        projectId: "5dcfc15a-c8b6-46ad-b359-219981131560",
        parameters: textGenRequestParametersModel,
    };
    const textGenerationResult = await watsonxAIService.generateText(genParams);
    console.log('\n\n***** TEXT INPUT INTO MODEL *****');
    console.log(genParams.input);
    console.log('\n\n***** TEXT RESPONSE FROM MODEL *****');
    const inputString = textGenerationResult.result.results[0].generated_text;

    const extractedJsonArray = extract(inputString);
    if (extractedJsonArray.length > 0) {
        const extractedJson = extractedJsonArray[0];
        return extractedJson;
    } else {
        console.log("No JSON object found in the input string.");
        return null;
    }
}

module.exports = {
    init,
    askWinstonSuggestion
};