<template>
	<div>
		<WMoviesHeader @onSearchChange="search = $event" />

		<div id="body">
			<nuxt v-if="search.length === 0" />
			<Search v-else :title="search" @onSelectMovie="search = ''" />
		</div>
	</div>
</template>

<script>
import WMoviesHeader from '@/components/Header/WMoviesHeader';
import Search from '@/components/Search/Search';

export default {
	components: { WMoviesHeader, Search },
	data: () => ({ search: '' }),
	methods: {},
};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body,
button {
	font-family: 'Roboto', sans-serif;
}

body {
	margin: 0;
	background-color: #18191c;
}
#body {
	padding: 30px 30px 0;
	margin-top: 50px;

	@media (max-width: 450px) {
		padding: 30px 10px 0;
	}
}

.loading {
	text-align: center;
	margin-top: 30vh;
}
</style>
