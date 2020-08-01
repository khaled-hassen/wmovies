<template>
	<div class="center examplex">
		<vs-navbar hide-scroll fixed class="navbar" text-white not-line>
			<template #left>
				<div
					id="brand"
					ref="brand"
					:class="{ clickable: $screen.breakpoint === 'md' }"
					@click.prevent="toogleDropdown()"
				>
					WMOVIES

					<img
						id="dropdown-icon"
						ref="dropdownIcon"
						src="@/assets/DropdownIcon.svg"
						alt=""
						:class="{
							rotate: openDropdown,
							hidden: $screen.breakpoint !== 'md',
						}"
					/>
				</div>
				<transition name="slide" appear>
					<div
						v-if="$screen.breakpoint === 'md' && openDropdown"
						id="dropdown"
						v-click-outside
					>
						<ul>
							<li>
								<vs-navbar-item
									id="movies"
									:active="active === 'movies'"
									to="/"
								>
									<nuxt-link to="/">
										Movies
									</nuxt-link>
								</vs-navbar-item>
							</li>
							<li>
								<vs-navbar-item
									id="az"
									to="/az?letter=a&page=1"
									:active="/^az(\?letter=.)*(&page=.)*/.test(active)"
								>
									<nuxt-link
										:to="{
											path: '/az',
											query: { letter: 'a', page: 1 },
										}"
									>
										A-Z
									</nuxt-link>
								</vs-navbar-item>
							</li>

							<li>
								<vs-navbar-item
									id="top-30-rated"
									:active="active === 'top-30-rated'"
									to="/top-30-rated"
								>
									<nuxt-link to="/top-30-rated">
										Top 30 Rated
									</nuxt-link>
								</vs-navbar-item>
							</li>
						</ul>
					</div>
				</transition>
			</template>

			<template v-if="$screen.breakpoint !== 'md'">
				<vs-navbar-item id="movies" :active="active === 'movies'" to="/">
					<nuxt-link to="/">
						Movies
					</nuxt-link>
				</vs-navbar-item>

				<vs-navbar-item
					id="az"
					to="/az?letter=a&page=1"
					:active="/^az(\?letter=.)*(&page=.)*/.test(active)"
				>
					<nuxt-link
						:to="{ path: '/az', query: { letter: 'a', page: 1 } }"
					>
						A-Z
					</nuxt-link>
				</vs-navbar-item>

				<vs-navbar-item
					id="top-30-rated"
					:active="active === 'top-30-rated'"
					to="/top-30-rated"
				>
					<nuxt-link to="/top-30-rated">
						Top 30 Rated
					</nuxt-link>
				</vs-navbar-item>
			</template>

			<template #right>
				<vs-input
					v-model="movie"
					placeholder="Search movie"
					class="search-input"
					autocomplete="off"
				/>
				<button class="clear-btn" type="button" @click.prevent="movie = ''">
					<img src="@/assets/ClearSearchIcon.svg" alt="" />
				</button>
			</template>
		</vs-navbar>
	</div>
</template>

<script>
export default {
	name: 'WMoviesHeader',
	components: {},
	directives: {
		'click-outside': {
			priority: 700,
			bind(el, _, { context: vm }) {
				el.addEventListener('click', vm.stopProp);
				document.body.addEventListener('click', vm.listenForClicks);
			},
			unbind(el, _, { context: vm }) {
				el.removeEventListener('click', vm.stopProp);
				document.body.removeEventListener('click', vm.event);
			},
		},
	},
	data: () => ({
		active: 'movies',
		movie: '',
		openDropdown: false,
	}),
	watch: {
		$route(to) {
			this.setActiveTab(to);
		},
		movie(val) {
			this.$emit('onSearchChange', val);
		},
	},
	created() {
		this.setActiveTab(this.$route);
	},
	methods: {
		listenForClicks(event) {
			if (
				event.target !== this.$refs.brand &&
				event.target !== this.$refs.dropdownIcon
			)
				this.closeDropdown();
		},
		stopProp(event) {
			event.stopPropagation();
		},
		setActiveTab(route) {
			const pathName = route.name;
			if (pathName === 'index') this.active = 'movies';
			else {
				const path = route.fullPath.split('/')[1];
				this.active = path; // movies || az || top-30-rated
			}
		},
		closeDropdown() {
			if (this.openDropdown) this.openDropdown = false;
		},
		toogleDropdown() {
			if (this.$screen.breakpoint === 'md')
				this.openDropdown = !this.openDropdown;
		},
	},
};
</script>

<style lang="scss">
.navbar {
	border-radius: 0;
	padding: 10px 0;
	background-color: #18191c;

	.clickable:hover {
		cursor: pointer;
	}

	#dropdown {
		border-radius: 20px;
		height: 150px;
		width: 150px;
		background-color: #ececec;
		position: absolute;
		z-index: 100;
		transform: translate3d(5px, 100px, 0px);

		ul {
			list-style-type: none;
			padding: 10px 0 5px 15px;
		}
	}

	#brand {
		margin-left: 35px;

		@media (max-width: 450px) {
			margin-left: 10px;
		}

		#dropdown-icon {
			transition: transform 0.5s ease;
		}

		.rotate {
			transform: rotate(-180deg);
		}
	}

	.search-input {
		.vs-input {
			height: 30px;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			background-color: #f4f7f8;

			@media (max-width: 450px) {
				width: 100px;
			}
		}

		label {
			color: #393e46;
			opacity: 0.6;
		}
	}

	.clear-btn {
		margin-right: 40px;
		border: none;
		outline: none;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		padding: 0;
		height: 30px;
		width: 35px;
		background-color: #f4f7f8;

		@media (max-width: 450px) {
			margin-right: 0;
		}
	}
}

.hidden {
	display: none;
}

// animation
.slide-enter-active {
	animation: slide-down 0.5s ease forwards;
}

.slide-leave-active {
	animation: slide-down 0.5s ease reverse;
}

@keyframes slide-down {
	0% {
		opacity: 0;
		transform: translate3d(5px, 70px, 0px);
	}

	100% {
		opacity: 1;
		transform: translate3d(5px, 100px, 0px);
	}
}
</style>
