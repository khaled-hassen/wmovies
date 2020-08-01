import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	type Image {
		src: String
		alt: String
	}

	type Movie {
		id: ID!
		title: String!
		year: String!
		genre: [String!]!
		director: String!
		streamLink: String!
		rating: String!
		img: Image!
		description: String!
		duration: String!
	}

	type Query {
		movie(id: ID!): Movie!
		movies(pos: Int!, count: Int!): [Movie!]!
		moviesNumber: Int!
		moviesByLetterNumber(letter: String!): Int!
		moviesByGenreNumber(genre: String!): Int!
		top30Rated: [Movie!]!
		moviesByLetter(letter: String!, pos: Int!, count: Int!): [Movie!]!
		moviesByGenre(genre: String!, pos: Int!, count: Int!): [Movie!]!
		search(title: String!): [Movie!]!
	}
`;
