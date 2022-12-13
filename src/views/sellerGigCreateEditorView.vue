<template>
	<div>
		<gig-main>
			<button
				class="btn btn-success max-w-md mx-2"
				type="button"
				name="button"
				@click="saveDraftGig"
			>
				Save and Publish Gig
			</button>
		</gig-main>
	</div>
</template>

<script>
import gigMainVue from "@/components/gigMain.vue";

export default {
	components: {
		"gig-main": gigMainVue,
	},

	data() {
		return {};
	},

	watch: {},

	mounted() {},

	methods: {
		async saveDraftGig() {

		},
		// async updateAndPublishGig() {
		// 	// pass
		// },
	},
};
</script>
