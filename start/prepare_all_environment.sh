# Copyright 2020 Techedge España.

echo "Exporting shell variables"
export GCLOUD_PROJECT=$DEVSHELL_PROJECT_ID
export GCLOUD_BUCKET=$DEVSHELL_PROJECT_ID-media
export QUEUE_PERSISTENCE_STORAGE=queue.persistence.storage
export QUEUE_PERSISTENCE_DATASTORAGE=queue.persistence.datastorage
export QUEUE_PERSISTENCE_SPANNER=queue.persistence.spanner
export QUEUE_API_VISION=queue.api.vision
export QUEUE_API_LANGUAGE=queue.api.language
export GCLOUD_REGION=europe-west2
export CF_BUCKET_HANDLER=bucketHandler

echo "Creating App Engine app"
gcloud app create --region $GCLOUD_REGION

echo "Making bucket: gs://$GCLOUD_BUCKET"
gsutil mb gs://$GCLOUD_BUCKET

echo "Installing dependencies"
npm install -g npm@6.11.3
npm update

echo "Creating Datastore entities"
node setup/datastore-entities.js

echo "Creating Cloud Pub/Sub topics"
gcloud pubsub topics create $QUEUE_PERSISTENCE_STORAGE
gcloud pubsub topics create $QUEUE_PERSISTENCE_DATASTORAGE
gcloud pubsub topics create $QUEUE_PERSISTENCE_SPANNER
gcloud pubsub topics create $QUEUE_API_VISION
gcloud pubsub topics create $QUEUE_API_LANGUAGE

gsutil notification create -t $QUEUE_PERSISTENCE_STORAGE -e OBJECT_FINALIZE -f json gs://$GCLOUD_BUCKET

echo "Deploy $CF_BUCKET_HANDLER cloud function with bucket trigger"
gcloud functions deploy $CF_BUCKET_HANDLER --runtime nodejs8 --set-env-vars PROJECT_ID=$GCLOUD_PROJECT --trigger-topic $QUEUE_PERSISTENCE_STORAGE --source ./setup/bucket-handler --region $GCLOUD_REGION

echo "Project ID: $GCLOUD_PROJECT"