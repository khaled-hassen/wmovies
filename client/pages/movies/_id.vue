<template>
	<div>
		<div v-if="$apollo.queries.movie.loading" class="loading">
			<img src="@/assets/LoadingIcon.svg" alt="" />
		</div>

		<div
			v-if="!$apollo.queries.movie.loading && movie"
			class="movie-container"
		>
			<section id="movie-info">
				<div id="title">{{ movie.title }}</div>
				<div class="container">
					<div class="row">
						<div id="movie-cover" class="col-sm-6 col-md-4 col-lg-3">
							<img :src="movie.img.src" :alt="movie.img.alt" />
						</div>

						<div id="details" class="col-sm col-md col-lg">
							<div class="info-container">
								<p class="info">Genre:</p>
								<p
									v-for="genre of movie.genre"
									:key="genre"
									class="info-value genre"
								>
									<nuxt-link :to="{ path: `/genre/${genre}` }">
										{{ genre }}
									</nuxt-link>
								</p>
							</div>
							<div class="info-container">
								<p class="info">Year:</p>
								<p class="info-value">
									{{ movie.year }}
								</p>
							</div>
							<div class="info-container">
								<p class="info">Director:</p>
								<p class="info-value">{{ movie.director }}</p>
							</div>
							<div class="info-container">
								<p class="info">Rating:</p>
								<p class="info-value">
									{{ movie.rating }}
								</p>
							</div>
							<div class="info-container">
								<p class="info">Duration:</p>
								<p class="info-value">{{ movie.duration }}</p>
							</div>
							<div class="info-container">
								<p class="info">Description:</p>
								<p class="info-value">{{ movie.description }}</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="video-player">
				<iframe
					id="embede-video"
					frameborder="no"
					allowfullscreen="yes"
					:src="movie.streamLink"
				></iframe>
			</section>
		</div>
	</div>
</template>

<script>
import movieQuery from '@/graphql/movie';

export default {
	name: 'MoviePage',
	components: {},
	props: {},
	data: () => ({ movie: null }),
	methods: {},
	apollo: {
		movie: {
			query: movieQuery,
			variables() {
				return { id: this.$route.params.id };
			},
			error(error) {
				this.$root.error({ statusCode: 404, message: 'Movie not found' });
				return error;
			},
		},
	},
	validate({ params }) {
		const { id } = params;
		return !!id;
	},
	head() {
		const title = this.movie && this.movie !== null ? this.movie.title : '';
		const name =
			this.movie && this.movie !== null ? this.movie.title : 'WMovies';
		const description =
			this.movie && this.movie !== null ? this.movie.description : 'WMovies';

		return {
			title: 'WMovies: ' + title,
			meta: [
				{
					hid: name,
					name,
					content: description,
				},
			],
		};
	},
};
</script>

<style scoped lang="scss">
.movie-container {
	$borderRadius: 20px;

	width: 100%;
	#movie-info {
		#title {
			color: white;
			text-align: center;
			margin: 0 auto;
			width: fit-content;
			font-size: 4rem;
		}

		#movie-cover {
			& > img {
				border-radius: $borderRadius;
			}
		}

		#details {
			.info-container {
				& > p {
					display: inline-block;
				}

				.info {
					color: #f9fcfb;
					font-weight: bold;
				}

				.info-value {
					color: #dfdfdf;
				}

				.genre {
					margin-right: 5px;
				}
			}
		}
	}

	#video-player {
		margin: 20px auto 50px;
		text-align: center;
		position: relative;
		z-index: 100;

		#embede-video {
			width: 80%;
			height: 40vw;
			border-radius: $borderRadius;
		}
	}
}
</style>
