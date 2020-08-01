<template>
	<div
		v-if="totalPages > 0"
		class="center con-pagination pagination-container"
	>
		<vs-pagination v-model="page" :length="totalPages">
			<vs-select id="options" v-model="page">
				<vs-option
					v-for="pageNumber in totalPages"
					:key="pageNumber"
					:label="pageNumber"
					:value="pageNumber"
				>
					{{ pageNumber }}
				</vs-option>
			</vs-select>
		</vs-pagination>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: {
		moviesPerPage: { type: Number, required: true },
		moviesNumber: { type: Number, required: true },
	},
	data: () => ({}),
	computed: {
		totalPages() {
			return Math.ceil(this.moviesNumber / this.moviesPerPage);
		},
		page: {
			get() {
				return this.$route.query.page ? +this.$route.query.page : 1;
			},
			set(newVal) {
				const queries = this.$route.query;
				const path = this.$route.path;
				this.$router.push({ path, query: { ...queries, page: newVal } });
			},
		},
	},
	watch: {
		page(val) {
			this.validatePage(val);
		},
	},
	created() {
		this.validatePage(this.page);
	},
	methods: {
		validatePage(page) {
			if (page > this.totalPages) {
				const queries = this.$route.query;
				const path = this.$route.path;
				this.$router.push({ path, query: { ...queries, page: 1 } });
			}
		},
	},
};
</script>

<style scoped lang="scss">
.pagination-container {
	margin-bottom: 50px;
}

#options {
	width: 100px;
	margin: 0 10px;
}
</style>
