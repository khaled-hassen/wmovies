<template>
	<div>
		<div v-if="$apollo.queries.moviesByGenre.loading" class="loading">
			<img src="@/assets/LoadingIcon.svg" alt="" />
		</div>

		<div v-if="(!$apollo.queries.moviesByGenre.loading)">
			<div class="container-fluid">
				<div class="row">
					<div
						v-for="movie of moviesByGenre"
						:key="movie.title"
						class="col-6 col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-2"
					>
						<Card
							:id="movie.id"
							:title="movie.title"
							:year="movie.year"
							:img="movie.img"
						/>
					</div>
				</div>
			</div>
		</div>

		<Pagination
			v-if="!$apollo.queries.moviesByGenre.loading"
			:movies-per-page="moviesPerPage"
			:movies-number="moviesByGenreNumber"
		/>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import Card from '@/components/Card/Card';
import Pagination from '@/components/Pagination/Pagination';
import moviesByGenre from '@/graphql/moviesByGenre';

export default {
	name: 'GenrePage',
	components: { Card, Pagination },
	props: {},
	data: () => ({
		moviesByGenre: [],
		moviesPerPage: 60,
		moviesByGenreNumber: 0,
	}),
	computed: {
		genre() {
			const genre = this.$route.params.genre;
			return genre[0].toUpperCase() + genre.slice(1).toLowerCase();
		},
		pos() {
			const query = this.$route.query;
			return !query ? 0 : !query.page ? 0 : query.page - 1;
		},
	},
	methods: {
		fetchMore(page) {
			this.$apollo.queries.moviesByLetter.refetch({
				letter: this.letter.toUpperCase(),
				pos: (page - 1) * this.moviesPerPage,
				count: this.moviesPerPage,
			});
		},
	},
	validate({ params }) {
		const { genre } = params;
		return !!genre;
	},
	apollo: {
		moviesByGenre: {
			query: moviesByGenre,
			variables() {
				return {
					genre: this.genre,
					pos: this.pos * this.moviesPerPage,
					count: this.moviesPerPage,
				};
			},
		},
		moviesByGenreNumber: {
			query: gql`
				query GetMoviesByGenreNumber($genre: String!) {
					moviesByGenreNumber(genre: $genre)
				}
			`,
			variables() {
				return {
					genre: this.genre,
				};
			},
		},
	},
	head() {
		const genre = this.genre ? this.genre : '';

		return {
			title: 'WMovies: ' + genre,
			meta: [
				{
					hid: 'WMovies',
					name: 'WMovies',
					content: `Watch ${genre} movies for free`,
				},
			],
		};
	},
};
</script>

<style scoped lang="scss"></style>
