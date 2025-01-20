const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: 'Vr10wDCJs7rwuovXhBG30qxOm7_jEj32sIeywOUFJHR4',
    }),
    serviceUrl: 'https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/0210a367-84e7-4f4f-aae5-717febaeeb2f',
});

async function textSpeech(text,path) {
    console.log(text,path)
    const synthesizeParams = {
        text: text,
        accept: 'audio/wav',
        voice: 'en-US_MichaelV3Voice',
    };
    
    await textToSpeech.synthesize(synthesizeParams)
        .then(response => {
            // The following line is necessary only for
            // wav formats; otherwise, `response.result`
            // can be directly piped to a file.
            return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
            fs.writeFileSync(path, buffer);
        })
        .catch(err => {
            console.log('error:', err);
        });
    
}

module.exports = textSpeech;