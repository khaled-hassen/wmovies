// import { Movie, MoviesPerLetter, MoviesPerGenre, genres } from './movie-model';
// import fs from 'fs';
// import { promisify } from 'util';

// const readFile = promisify(fs.readFile);

// export const addMoviesToDb = async () => {
// 	const moviesJSON = await readFile('movies.json', { encoding: 'utf8' });
// 	const movies = JSON.parse(moviesJSON).data as any[];

// 	movies.sort((first, second) =>
// 		+first.year === +second.year ? 0 : +first.year > +second.year ? -1 : 1
// 	);

// 	for (let i = 0; i < movies.length; ++i) {
// 		const newMovie = new Movie({ index: i, ...movies[i] });
// 		try {
// 			await newMovie.save();
// 		} catch {
// 			continue;
// 		}
// 	}
// };

// export const groupMoviesPerLetter = async () => {
// 	const alphabet = [
// 		'A',
// 		'B',
// 		'C',
// 		'D',
// 		'E',
// 		'F',
// 		'G',
// 		'H',
// 		'I',
// 		'J',
// 		'K',
// 		'L',
// 		'M',
// 		'N',
// 		'O',
// 		'P',
// 		'Q',
// 		'R',
// 		'S',
// 		'T',
// 		'U',
// 		'V',
// 		'W',
// 		'X',
// 		'Y',
// 		'Z',
// 	];

// 	for (const letter of alphabet) {
// 		let foundMovies;
// 		try {
// 			foundMovies = await Movie.find({
// 				title: { $regex: new RegExp(`^${letter}.*`, 'i') },
// 			}).sort({ title: 1 });
// 		} catch (error) {
// 			throw error;
// 		}

// 		const newMoviesPerLetter = new MoviesPerLetter({
// 			letter,
// 			movies: !foundMovies ? [] : foundMovies.map((movie) => movie._id),
// 		});

// 		try {
// 			await newMoviesPerLetter.save();
// 		} catch (error) {
// 			throw error;
// 		}
// 	}
// };

// export const getMoviesGenres = async () => {
// 	const moviesJSON = await readFile('movies.json', { encoding: 'utf8' });
// 	const moviesGenres = (JSON.parse(moviesJSON).data as any[])
// 		.map((movie) => movie.genre.join(','))
// 		.join(',')
// 		.split(','); // containers duplicated genres

// 	const genres: string[] = [];
// 	for (const genre of moviesGenres) {
// 		if (!genres.includes(genre) && genre) {
// 			genres.push(genre);
// 		}
// 	}

// 	console.log(genres);
// };

// export const groupMoviesPerGenre = async () => {
// 	for (const genre of genres) {
// 		let foundMovies;
// 		try {
// 			foundMovies = await Movie.find({ genre }).sort({ title: 1 });
// 		} catch (error) {
// 			throw error;
// 		}

// 		const newMoviesPerGenre = new MoviesPerGenre({
// 			genre,
// 			movies: !foundMovies ? [] : foundMovies.map((movie) => movie._id),
// 		});

// 		try {
// 			await newMoviesPerGenre.save();
// 		} catch (error) {
// 			throw error;
// 		}
// 	}
// };
