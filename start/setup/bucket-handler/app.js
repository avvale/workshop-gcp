// get pub sub functionality
const publisher = require('pubsub');

exports.bucketHandler = (data, context) => 
{
    /* // set topic where will be published
    let topic = 'queue.api.vision';
    if (true) topic = 'queue.api.language';

    // publish data in topic
    publisher.publishMessage('', topic).then(() => {
        res.json('Message received');
    })
    .catch(err => {
        next(err);
    }); */

    const file = data;
    console.log(`  Event ${context.eventId}`);
    console.log(`  Event Type: ${context.eventType}`);
    console.log(`  Bucket: ${file.bucket}`);
    console.log(`  File: ${file.name}`);
    console.log(`  Metageneration: ${file.metageneration}`);
    console.log(`  Created: ${file.timeCreated}`);
    console.log(`  Updated: ${file.updated}`);
    console.log(`  contentType: ${file.contentType}`);
    console.log(`  mediaLink: ${file.mediaLink}`);
    console.log(`  selfLink: ${file.selfLink}`);

    // test
    console.log(process.env.FOO);
    console.log(process.env);

};