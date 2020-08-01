import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export const genres = [
	'War',
	'Drama',
	'Comedy',
	'Horror',
	'Romance',
	'Thriller',
	'History',
	'Action',
	'Documentary',
	'Animation',
	'Western',
	'Crime',
	'Action & Adventure',
	'Adventure',
	'Sci-Fi',
	'Mystery',
	'Music',
	'Musical',
	'Biography',
	'Family',
	'Fantasy',
	'Sport',
	'News',
	'TV Movie',
	'Talk',
	'Reality',
	'Soap',
	'Science Fiction',
	'Foreign',
] as const;
export type Genre = typeof genres[number];

interface IMovie extends Document {
	index: number;
	title: string;
	year: string;
	genre: string[];
	director: string;
	streamLink: string;
	rating: string;
	img: { src: string; alt: string };
	description: string;
	duration: string;
}

export type Letter =
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'H'
	| 'I'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'U'
	| 'V'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z';

interface IMoviesPerLetter extends Document {
	letter: Letter;
	movies: Schema.Types.ObjectId[];
}

interface IMoviesPerGenre extends Document {
	genre: Genre;
	movies: Schema.Types.ObjectId[];
}

const movieSchema = new Schema({
	index: { required: true, type: Number, unique: true },
	title: { required: true, type: String, unique: true },
	year: { default: '', type: String },
	genre: { type: [String], default: [] },
	director: { type: String, default: '' },
	streamLink: { type: String, default: '' },
	rating: { default: 'Not rated yet', type: String },
	img: {
		default: { src: '', alt: '' },
		type: { src: String, alt: String },
	},
	description: { default: 'No description', type: String },
	duration: { default: 'Unknown', type: String },
});
movieSchema.plugin(uniqueValidator);

const moviesPerLetterSchema = new Schema({
	letter: { type: String, required: true, unique: true },
	movies: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Movie',
		},
	],
});
moviesPerLetterSchema.plugin(uniqueValidator);

const moviesPerGenreSchema = new Schema({
	genre: { type: String, required: true, unique: true },
	movies: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Movie',
		},
	],
});
moviesPerGenreSchema.plugin(uniqueValidator);

export const Movie = mongoose.model<IMovie>('Movie', movieSchema);

export const MoviesPerLetter = mongoose.model<IMoviesPerLetter>(
	'MoviesPerLetter',
	moviesPerLetterSchema,
	'movies-per-letter'
);

export const MoviesPerGenre = mongoose.model<IMoviesPerGenre>(
	'MoviesPerGenre',
	moviesPerGenreSchema,
	'movies-per-genre'
);
