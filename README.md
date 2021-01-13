The price aggregator for CoinMarketCap and OpenExchangeRate. This component shared by rwallet-server Dogfood and Production environments and use Google Pub/Sub for communication.

## Usage

before run app, should update .env file

- development
    1. npm run dev
- production
    1. npm run build
    2. npm run start

## Deployment
1. create .env file
1. ```gcloud config get-value project``` to check which project is currently active
1. ```gcloud config set project my-project``` to change current project
1. ```gcloud projects list``` to get the project names list
1. ```gcloud app deploy``` to deployed app for the current project 

## TODO
1. complete typescript types [enhancement]
1. add docker support [enhancement]
1. add google secret manager support [enhancement]
1. use dependency injection by TSyringe [enhancement]
1. use agenda to replace setInterval [enhancement]
