import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, CorsOptions } from 'apollo-server-express';

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

// ? Add movies to database
// import {
// 	addMoviesToDb,
// 	groupMoviesPerLetter,
// 	getMoviesGenres,
// 	groupMoviesPerGenre,
// } from './db/add-movies';

config();
const app = express();

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const corsConfig: CorsOptions = { origin: process.env.CLIENT };
server.applyMiddleware({ app, cors: corsConfig });

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-3itfd.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

// ? Add movies to database
// addMoviesToDb()
// groupMoviesPerLetter()
// getMoviesGenres()
// groupMoviesPerGenre()
// 	.then(() => {
// 		console.log('Done');
// 		process.exit(0);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 		process.exit(1);
// 	});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
