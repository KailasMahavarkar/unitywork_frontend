<template>
	<div>
		<gig-main mode="edit"></gig-main>
	</div>
</template>

<script>
import gigMainVue from "@/components/gigMain.vue";

export default {
	name: "sellerEditGigView",
	data: () => ({}),
	methods: {},
	components: {
		"gig-main": gigMainVue,
	},

	mounted() {
		// check if mode is edit
		// if it is, then load the gig into the store

		if (this.mode === "edit") {
			console.log("edit mode");
		}
	},
};
</script>
