<template>
	<div>
		<div v-if="$apollo.queries.search.loading" class="loading">
			<img src="@/assets/LoadingIcon.svg" alt="" />
		</div>

		<div
			v-if="!$apollo.queries.search.loading && search.length === 0"
			class="no-movies-error"
		>
			<img src="@/assets/NoMoviesIcon.svg" alt="" />
			<div>No movies were found</div>
		</div>

		<div v-if="(!$apollo.queries.search.loading)">
			<div class="container-fluid">
				<div class="row">
					<div
						v-for="movie of search"
						:key="movie.title"
						class="col-6 col-sm-4 col-md-3 col-lg-2"
					>
						<Card
							:id="movie.id"
							:title="movie.title"
							:year="movie.year"
							:img="movie.img"
							@click.native="$emit('onSelectMovie')"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import seachMovie from '@/graphql/searchMovie';
import Card from '@/components/Card/Card';

export default {
	name: 'SearchResult',
	components: { Card },
	props: {
		title: { type: String, required: true },
	},
	data: () => ({ search: [] }),
	methods: {},
	apollo: {
		search: {
			query: seachMovie,
			variables() {
				return { title: this.title };
			},
		},
	},
};
</script>

<style scoped lang="scss">
.no-movies-error {
	margin-top: 50px;
	text-align: center;

	& > img {
		$iconDimension: 200px;
		width: $iconDimension;
		height: $iconDimension;
	}

	& > img + div {
		margin-top: 50px;
		color: #fff;
		font-size: 50px;
	}
}
</style>
