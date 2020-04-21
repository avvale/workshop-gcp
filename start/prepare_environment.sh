# Copyright 2020 Techedge España.


echo "Exporting GCLOUD_PROJECT"
export GCLOUD_PROJECT=$DEVSHELL_PROJECT_ID

echo "Installing dependencies"
npm install -g npm@6.11.3
npm update

echo "Project ID: $DEVSHELL_PROJECT_ID"