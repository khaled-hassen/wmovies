<template>
	<div>
		<LetterPagination />
		<div v-if="$apollo.queries.moviesByLetter.loading" class="loading">
			<img src="@/assets/LoadingIcon.svg" alt="" />
		</div>

		<div v-if="(!$apollo.queries.moviesByLetter.loading)">
			<div class="container-fluid">
				<div class="row">
					<div
						v-for="movie of moviesByLetter"
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
			v-if="(!$apollo.queries.moviesByLetter.loading)"
			:movies-per-page="moviesPerPage"
			:movies-number="moviesByLetterNumber"
		/>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import Card from '@/components/Card/Card';
import Pagination from '@/components/Pagination/Pagination';
import LetterPagination from '@/components/Pagination/LetterPagination';
import moviesByLetter from '@/graphql/moviesByLetter';

export default {
	name: 'AZ',
	components: { Card, Pagination, LetterPagination },
	props: {},
	data: () => ({
		moviesByLetter: [],
		moviesPerPage: 60,
		moviesByLetterNumber: 0,
	}),
	computed: {
		letter() {
			const query = this.$route.query;
			return !query ? 'A' : !query.letter ? 'A' : query.letter;
		},
		pos() {
			const query = this.$route.query;
			return !query ? 0 : !query.page ? 0 : query.page - 1;
		},
	},
	mounted() {
		// check if the letter is valid
		if (!/[a-z]/i.test(this.letter)) {
			this.$router.replace({
				path: '/az',
				query: { letter: 'a', page: 1 },
			});
		}
	},
	methods: {},
	apollo: {
		moviesByLetter: {
			query: moviesByLetter,
			variables() {
				return {
					letter: this.letter.toUpperCase(),
					pos: this.pos * this.moviesPerPage,
					count: this.moviesPerPage,
				};
			},
		},
		moviesByLetterNumber: {
			query: gql`
				query GetMoviesByLetterNumber($letter: String!) {
					moviesByLetterNumber(letter: $letter)
				}
			`,
			variables() {
				return {
					letter: this.letter.toUpperCase(),
				};
			},
		},
	},
	head: {
		title: 'WMovies: A-Z',
		meta: [
			{
				hid: 'WMovies a-z',
				name: 'WMovies a-z',
				content: 'watch movies for free',
			},
		],
	},
};
</script>

<style scoped lang="scss"></style>
