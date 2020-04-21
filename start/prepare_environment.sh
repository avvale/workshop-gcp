# Copyright 2020 Techedge España.


echo "Exporting GCLOUD_PROJECT"
export GCLOUD_PROJECT=$DEVSHELL_PROJECT_ID

echo "Installing node dependencies"
npm install

echo "Project ID: $DEVSHELL_PROJECT_ID"