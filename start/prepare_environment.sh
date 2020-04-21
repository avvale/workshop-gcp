# Copyright 2020 Techedge España.

echo "Creating App Engine app"
gcloud app create --region "europe-west2"

echo "Exporting GCLOUD_PROJECT"
export GCLOUD_PROJECT=$DEVSHELL_PROJECT_ID

echo "Installing dependencies"
npm install -g npm@6.11.3
npm update

echo "Project ID: $DEVSHELL_PROJECT_ID"