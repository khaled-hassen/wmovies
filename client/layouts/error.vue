<template>
	<div id="error-404">
		<img id="error-icon" src="@/assets/ErrorAlert.svg" alt="" />
		<div id="error-code">404</div>
		<div id="error-message">
			{{ error.message || 'This page cannot be found' }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'ErrorPage',
	components: {},
	props: {
		error: { type: Object, default: Object },
	},
	data: () => ({}),
	methods: {},
	head: {
		title: '404 Error',
	},
};
</script>

<style scoped lang="scss">
#error-404 {
	color: white;
	text-align: center;
	margin: 35px auto 0;
	width: fit-content;
}

#error-icon {
	$iconDimension: 200px;
	width: $iconDimension;
	height: $iconDimension;
}

#error-code {
	margin-top: 10px;
	font-size: 100px;
}

#error-message {
	font-size: 50px;
}
</style>
