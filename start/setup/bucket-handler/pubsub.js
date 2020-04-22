
// Call pub/sub GCP library
const { PubSub } = require('@google-cloud/pubsub');

// Call pub/sub GCP library
const pubsub = new PubSub({
    projectId: process.env.PROJECT_ID
});

const visionTopic       = pubsub.topic(process.env.QUEUE_API_VISION);
const languageTopic     = pubsub.topic(process.env.QUEUE_API_LANGUAGE);

function publishMessage(data, topic)
{
    const dataBuffer = Buffer.from(JSON.stringify(data));

    if (topic === process.env.QUEUE_API_VISION)     return visionTopic.publish(dataBuffer);
    if (topic === process.env.QUEUE_API_LANGUAGE)   return languageTopic.publish(dataBuffer);
}

// exports
module.exports = {
    publishMessage
};
