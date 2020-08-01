<template>
	<div>
		<div v-if="$apollo.queries.movies.loading" class="loading">
			<img src="@/assets/LoadingIcon.svg" alt="" />
		</div>
		<div v-if="!$apollo.queries.movies.loading">
			<div class="container-fluid">
				<div class="row">
					<div
						v-for="movie of movies"
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
			v-if="!$apollo.queries.movies.loading"
			:movies-per-page="moviesPerPage"
			:movies-number="moviesNumber"
		/>
	</div>
</template>

<script>
import gql from 'graphql-tag';
// import vuescroll from 'vuescroll';

import Card from '@/components/Card/Card';
import Pagination from '@/components/Pagination/Pagination';
import moviesQuery from '@/graphql/movies';

export default {
	name: 'App',
	components: { Card, Pagination },
	props: {},
	data: () => ({
		movies: [],
		moviesPerPage: 60,
		moviesNumber: 0,
	}),
	computed: {
		pos() {
			const query = this.$route.query;
			return !query ? 0 : !query.page ? 0 : query.page - 1;
		},
	},
	methods: {},
	apollo: {
		movies: {
			query: moviesQuery,
			variables() {
				return {
					pos: this.pos * this.moviesPerPage,
					count: this.moviesPerPage,
				};
			},
		},
		moviesNumber: gql`
			{
				moviesNumber
			}
		`,
	},
	head: {
		title: 'WMovies',
		meta: [
			{
				hid: 'WMovies',
				name: 'WMovies',
				content: 'Watch movies for free',
			},
		],
	},
};
</script>

<style scoped lang="scss"></style>
