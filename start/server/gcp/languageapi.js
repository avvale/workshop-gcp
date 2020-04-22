// Import the config module
const config = require('../config');

// Load the Natural Language ML API module
const Language = require('@google-cloud/language');

// Create a client object against the Language API
const language = new Language.LanguageServiceClient({
    projectId: config.get('GCLOUD_PROJECT')
});


function analyze(text) {
    
    // create document
    const document = {
        content: text,
        type: 'PLAIN_TEXT'
    };

    return language.analyzeSentiment({ document })
        // TODO: Chain then
        // When the results come back
        // The sentiment data is the first element
       .then(results => {
            console.log(results);
            const sentiment = results[0];
            // TODO: Get the sentiment score (-1 to +1)
            return sentiment.documentSentiment.score;
       });
        // END TODO
}

module.exports = {
    analyze
};