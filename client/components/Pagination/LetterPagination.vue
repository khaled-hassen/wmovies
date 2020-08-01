<template>
	<div>
		<nav id="letter-pagination" aria-label="letter pagination">
			<ul class="pagination pagination-sm justify-content-end">
				<li
					v-if="$screen.breakpoint === 'md'"
					class="page-item"
					:class="{ disabled: activeLetter === 'a' }"
				>
					<nuxt-link
						:to="{
							path: '/az',
							query: {
								letter: getPrevLetter(),
								page: 1,
							},
						}"
						class="page-link"
					>
						Prev
					</nuxt-link>
				</li>
				<li
					v-if="$screen.breakpoint === 'md'"
					class="page-item active"
					aria-current="page"
				>
					<nuxt-link
						:to="{
							path: '/az',
							query: { letter: activeLetter.toLowerCase(), page: 1 },
						}"
						class="page-link"
					>
						{{ activeLetter.toUpperCase() }}
					</nuxt-link>
				</li>
				<template v-else>
					<li
						v-for="letter of letters"
						:key="letter"
						class="page-item"
						:class="{
							active:
								activeLetter.toLowerCase() === letter.toLowerCase(),
						}"
						aria-current="page"
					>
						<nuxt-link
							:to="{
								path: '/az',
								query: { letter: letter.toLowerCase(), page: 1 },
							}"
							class="page-link"
						>
							{{ letter }}
						</nuxt-link>
					</li>
				</template>
				<li
					v-if="$screen.breakpoint === 'md'"
					class="page-item"
					:class="{ disabled: activeLetter === 'z' }"
				>
					<nuxt-link
						:to="{
							path: '/az',
							query: {
								letter: getNextLetter(),
								page: 1,
							},
						}"
						class="page-link"
					>
						Next
					</nuxt-link>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'LetterPagination',
	components: {},
	props: {},
	data: () => ({
		letters: [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
		],
	}),
	computed: {
		activeLetter() {
			let letter = this.$route.query.letter;
			letter = !letter ? 'a' : letter.toLowerCase();

			return letter;
		},
	},
	methods: {
		getActiveLetterIndex() {
			return this.letters.indexOf(this.activeLetter.toUpperCase());
		},
		getNextLetter() {
			const index = this.getActiveLetterIndex();
			const nextIndex = index < this.letters.length - 1 ? index + 1 : index;
			return this.letters[nextIndex].toLowerCase();
		},
		getPrevLetter() {
			const index = this.getActiveLetterIndex();
			const prevIndex = index > 0 ? index - 1 : index;
			return this.letters[prevIndex].toLowerCase();
		},
	},
};
</script>

<style scoped lang="scss">
#letter-pagination {
	margin-right: 15px;
	margin-bottom: 50px;

	.page-link {
		// background-color: red;
	}
}
</style>
