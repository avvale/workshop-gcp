

'use strict';

const { Datastore } = require('@google-cloud/datastore');
const config = require('../config');

// [START config]
const ds = new Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});
// [END config]

// [START create]
function create(kind, data) 
{
    const key = ds.key(kind);

    const dsData = [];
    for (let index in data)
    { 
        dsData.push({
            name: index,
            value: data[index]
        })
    }

    const entity = {
        key,
        data: dsData
    };

    return ds.save(entity);
}
// [END create]

// [START exports]
module.exports = {
  create
};
// [END exports]