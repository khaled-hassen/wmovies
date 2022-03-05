A movie watching website made **to learn VueJs + Nuxtjs** made with:
* Typescript
* Apollo GraphQL
* Vue + NuxtJs + Bootstrap
* NodeJs + ExpressJS
* MongoDB


## Getting Started

1. clone the repo

```bash
git clone https://github.com/khaled-hassen/wmovies.git
cd wmovies
```
2. setup the api
```bash
# dir: wmovies/api
npm install
# or
yarn install
```
3. add environment variables
```
# dir: wmovies/api
# create .env file
# add these variables:
	CLIENT=<client-url> # for local development it's http://localhost:3000
	DB_NAME=<mongodb-db-name>
	DB_USERNAME=<your-mongodb-username> # db access username
	DB_PASSWORD=<your-mongodb-password> # db access password
```
4. start the api server
```bash
#dir: wmovies/api
npm run dev
# or
yarn dev
```
The api will be on [http://localhost:5000](http://localhost:5000)

5. setup the client
```bash
# dir: wmovies/client
npm install
# or
yarn install
```
6. add environment variables
```bash
# dir: wmovies/client
# create .env file
# add these variables:
	API_URL=<api-url> # for local development it's http://localhost:5000
```
7. start the client server

```bash
# dir: wmovies/client
npm start
# or
yarn start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building the app
```bash
# dir: wmovies/client
npm run build
# or
yarn build
```
