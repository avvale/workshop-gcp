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

echo "Creating Cloud Pub/Sub topics"
gcloud pubsub topics create queue.persistence.storage.finalize
gcloud pubsub topics create queue.api.vision
gcloud pubsub topics create queue.api.language
gcloud pubsub topics create queue.persistence.datastorage
gcloud pubsub topics create queue.persistence.spanner

echo "Deploy bucketTrigger cloud function with bucket trigger"
gcloud functions deploy bucketTrigger --runtime nodejs8 --trigger-resource $DEVSHELL_PROJECT_ID-media --set-env-vars PROJECT_ID=$DEVSHELL_PROJECT_ID --trigger-event google.storage.object.finalize --trigger-topic=TRIGGER_TOPIC --source ./setup/bucket-trigger-cloud-function --region "europe-west2"

echo "Project ID: $DEVSHELL_PROJECT_ID"