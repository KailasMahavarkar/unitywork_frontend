<template>
	<div></div>
</template>

<script>
export default {
	name: "sellerView",
	data() {
		return {
			seller: null,
		};
	},
	created() {
		this.getSeller();
	},
	methods: {
		async getSeller() {

            console.log(this.$route.params.username);

            // try {
            //     const result = await api.get(`/sellers/${this.$route.params.username}`);

            //     this.seller = result.data.data;
            // } catch (error) {
            //     handleCustomError(error);
            // }

			// const response = await fetch("http://localhost:5000/sellers");
			// const data = await response.json();
			// this.seller = data;
		},
	},
};
</script>
