#!/bin/bash

sudo apt-get update
sudo apt-get install build-essential libssl-dev
curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
nvm install v5.0.0
nvm use v5.0.0
npm run start
