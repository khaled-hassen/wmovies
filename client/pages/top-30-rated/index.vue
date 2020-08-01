<template>
	<div>
		<div v-if="$apollo.queries.top30Rated.loading" class="loading">
			<img src="@/assets/LoadingIcon.svg" alt="" />
		</div>

		<div v-if="(!$apollo.queries.top30Rated.loading)">
			<div class="container-fluid">
				<div class="row">
					<div
						v-for="movie of top30Rated"
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
	</div>
</template>

<script>
import Card from '@/components/Card/Card';
import topRatedMovies from '@/graphql/topRatedMovies';

export default {
	name: 'TopRatedMovies',
	components: { Card },
	props: {},
	data: () => ({
		top30Rated: [],
	}),
	apollo: {
		top30Rated: topRatedMovies,
	},
	head: {
		title: 'WMovies: Top 30 rated',
		meta: [
			{
				hid: 'WMovies top 30 rated',
				name: 'WMovies top 30 rated',
				content: 'Watch movies for free',
			},
		],
	},
};
</script>

<style scoped lang="scss"></style>
