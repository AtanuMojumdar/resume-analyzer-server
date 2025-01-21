const axios = require('axios');
async function getJobListings(params) {

    const options = {
        method: 'GET',
        url: 'https://jobs-api14.p.rapidapi.com/v2/list',
        params: {
            query: params.fresher ? params.jobTitle+" fresher": params.jobTitle,
            location: params.city,
            autoTranslateLocation: 'false',
            acceptLanguage: 'en-GB',
            remoteOnly: 'false',
            employmentTypes: 'fulltime;parttime;intern;contractor'
        },
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'jobs-api14.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = getJobListings;