# Copyright 2020 Techedge España.

echo "Creating App Engine app"
gcloud app create --region "europe-west2"

echo "Making bucket: gs://$DEVSHELL_PROJECT_ID-media"
gsutil mb gs://$DEVSHELL_PROJECT_ID-media

echo "Exporting GCLOUD_PROJECT and GCLOUD_BUCKET"
export GCLOUD_PROJECT=$DEVSHELL_PROJECT_ID
export GCLOUD_BUCKET=$DEVSHELL_PROJECT_ID-media

echo "Installing dependencies"
npm install -g npm@6.11.3
npm update

echo "Creating Datastore entities"
node setup/datastore-entities.js

echo "Creating Cloud Pub/Sub topic"
gcloud pubsub topics create bucket-actions

echo "Load bucket trigger cloud function"
node setup/bucket-trigger.js

echo "Deploy bucketTrigger cloud function"
gcloud functions deploy bucketTrigger --runtime nodejs8 --trigger-resource $DEVSHELL_PROJECT_ID-media --trigger-event google.storage.object.finalize

echo "Project ID: $DEVSHELL_PROJECT_ID"