// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {Datastore} = require('@google-cloud/datastore');
const config = require('../config');

// [START config]
const ds = new Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});
// [END config]


// Lists all questions in a Quiz (defaults to 'gcp').
// Returns a promise
// [START list]
function list(quiz = 'gcp', redact = true) {
  const q = ds.createQuery([kind])
    .filter('quiz', '=', quiz);

  const p = ds.runQuery(q);

  return p.then(([results, { moreResults, endCursor }]) => {
    const questions = results.map(item => {
      item.id = item[Datastore.KEY].id;
      if (redact) {
        delete item.correctAnswer;
      }
      return item;
    });
    return {
      questions,
      nextPageToken: moreResults != 'NO_MORE_RESULTS' ? endCursor : false
    };
  });
}
// [END list]

// [START create]
function create(kind, data) 
{
    const key = ds.key(kind);

    const dsData = [];
    for (index in data)
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
  create,
  list
};
// [END exports]