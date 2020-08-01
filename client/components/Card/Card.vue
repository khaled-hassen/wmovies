<template>
	<div>
		<nuxt-link :to="{ path: `/movies/${id}` }">
			<div
				class="card-container"
				@mouseover="showTitle = true"
				@mouseleave="showTitle = false"
			>
				<img :src="img.src" :alt="img.alt" />
				<transition name="fade">
					<div v-if="showTitle" class="title-overlay">
						{{ title }} ({{ year }})
					</div>
				</transition>
			</div>
		</nuxt-link>
	</div>
</template>

<script>
export default {
	name: 'Card',
	components: {},
	props: {
		title: { type: String, required: true },
		year: { type: String, required: true },
		img: { type: Object, required: true }, // img { src, alt }
		id: { type: String, required: true },
	},
	data: () => ({ showTitle: false }),
	methods: {},
};
</script>

<style scoped lang="scss">
.card-container {
	$borderRadius: 20px;

	height: 230px;
	width: fit-content;
	margin: 0 auto 50px;
	position: relative;

	@media (max-width: 450px) {
		height: 180px;
	}

	& > img {
		height: 100%;
		object-fit: contain;
		border-radius: $borderRadius;
		color: white;
	}

	&:hover {
		cursor: pointer;
	}

	.title-overlay {
		position: absolute;
		color: white;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: $borderRadius;
		padding: 10px;
	}
}

// animation
.fade-enter {
	opacity: 0;
}
.fade-enter-active {
	animation: fade-in 0.5s ease forwards;
}
.fade-leave {
	opacity: 1;
}

.fade-leave-active {
	animation: fade-out 1s ease forwards;
}

@keyframes fade-in {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

@keyframes fade-out {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}
</style>
