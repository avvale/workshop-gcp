
// Call pub/sub GCP library
const { PubSub } = require('@google-cloud/pubsub');

// Call pub/sub GCP library
const pubsub = new PubSub({
    projectId: config.get(process.env.PROJECT_ID)
});

const visionTopic       = pubsub.topic('queue.api.vision');
const languageTopic     = pubsub.topic('queue.api.language');

function publishMessage(data, topic)
{
    const dataBuffer = Buffer.from(JSON.stringify(data));

    if (topic === 'queue.api.vision')     return visionTopic.publish(dataBuffer);
    if (topic === 'queue.api.language')   return languageTopic.publish(dataBuffer);
}

// exports
module.exports = {
    publishMessage
};
