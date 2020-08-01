import axios from 'axios';

import {
	Movie,
	MoviesPerGenre,
	MoviesPerLetter,
	Letter,
	Genre,
} from '../db/movie-model';

const movie = async (_: any, { id }: { id: string }) => {
	let foundMovie;
	try {
		foundMovie = await Movie.findById(id).lean();
	} catch (error) {
		throw new Error('Something went wrong, please try again.');
	}
	if (!foundMovie) throw new Error("This movies doesn't exist.");

	const rating = +foundMovie.rating > 10 ? 'N/A' : foundMovie.rating;
	return { ...foundMovie, rating: isNaN(+rating) ? 'N/A' : rating };
};

const movies = async (_: any, { pos, count }: { [k: string]: number }) => {
	let foundMovies;
	try {
		foundMovies = await Movie.find({
			index: { $gte: pos, $lt: pos + count },
		});
	} catch (error) {
		throw new Error('Something went wrong, please try again.');
	}
	if (!foundMovies || foundMovies.length === 0)
		throw new Error("Can't find any movie, please try again.");

	return foundMovies;
};

const moviesNumber = async () => {
	let number;
	try {
		number = await Movie.estimatedDocumentCount();
	} catch (error) {
		throw new Error('Something went wrong, please try again.');
	}
	if (!number) throw new Error('Something went wrong, please try again.');

	return number;
};

const top30Rated = async () => {
	let foundMovies;
	try {
		foundMovies = await Movie.find({
			rating: { $regex: /^[0-9]\.[0-9]*/i },
		})
			.sort({ rating: -1 })
			.limit(30);
	} catch (error) {
		throw new Error('Something went wrong, please try again.');
	}
	if (!foundMovies || foundMovies.length === 0)
		throw new Error("Can't find any movie, please try again.");

	return foundMovies;
};

interface IMoviePerLetterArgs {
	letter: Letter;
	pos: number;
	count: number;
}
const moviesByLetter = async (
	_: any,
	{ letter, count, pos }: IMoviePerLetterArgs
) => {
	let foundMovies;
	try {
		foundMovies = await MoviesPerLetter.findOne({
			letter,
		})
			.slice('movies', [pos, count])
			.populate('movies');
	} catch (error) {
		throw new Error('Something went wrong, please try again.');
	}
	if (!foundMovies)
		throw new Error("Can't find any movie, please try again.");

	return foundMovies.movies;
};

interface IMoviePerGenreArgs {
	genre: Genre;
	pos: number;
	count: number;
}
const moviesByGenre = async (
	_: any,
	{ genre, count, pos }: IMoviePerGenreArgs
) => {
	let foundMovies;
	try {
		foundMovies = await MoviesPerGenre.findOne({
			genre: new RegExp(`^${genre}`, 'i'),
		})
			.slice('movies', [pos, count])
			.populate('movies');
	} catch (error) {
		throw new Error('Something went wrong, please try again.');
	}
	if (!foundMovies)
		throw new Error("Can't find any movie, please try again.");
	return foundMovies.movies;
};

const moviesByLetterNumber = async (_: any, { letter }: { letter: string }) => {
	let result;
	try {
		result = await MoviesPerLetter.aggregate([
			{ $match: { letter } },
			{ $project: { _id: 0, total: { $size: '$movies' } } },
		]);
	} catch (error) {
		throw new Error('Something went wrong, please try again.');
	}
	if (!result) throw new Error('Something went wrong, please try again.');

	return result[0].total;
};

const moviesByGenreNumber = async (_: any, { genre }: { genre: string }) => {
	let result;
	try {
		result = await MoviesPerGenre.aggregate([
			{ $match: { genre: new RegExp(`^${genre}`, 'i') } },
			{ $project: { _id: 0, total: { $size: '$movies' } } },
		]);
	} catch (error) {
		throw new Error('Something went wrong, please try again.');
	}
	if (!result) throw new Error('Something went wrong, please try again.');

	return result[0].total;
};

const search = async (_: any, { title }: { title: string }) => {
	if (title.length === 0) return [];

	let foundMovies;
	try {
		foundMovies = await Movie.find({
			title: new RegExp(title.toLowerCase(), 'ig'),
		}).limit(10);
	} catch (error) {
		throw new Error('Something went wrong, please try again.');
	}
	if (!foundMovies)
		throw new Error('Something went wrong, please try again.');

	return foundMovies;
};

export const resolvers = {
	Query: {
		movie,
		movies,
		moviesNumber,
		top30Rated,
		moviesByLetter,
		moviesByGenre,
		moviesByLetterNumber,
		moviesByGenreNumber,
		search,
	},
};
