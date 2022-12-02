<template>
	<Fragment>
		<!-- <buddy-gallery /> -->
		<div class="flex w-[400px] h-[300px] bg-base-200">
			<vue-webrtc
				class="w-[300px] h-[300px]"
				ref="webrtc"
				roomId="sample-room"
			>
			</vue-webrtc>
		</div>
		<!-- <PipingScreenShare /> -->
	</Fragment>
</template>

<script>
// import buddyGallery from "@/components/buddyGallery.vue";
import { Fragment } from "vue-fragment";
// import PipingScreenShare from "@/components/PipingScreenShare.vue";
import { VueWebRTC } from "vue-webrtc";

export default {
	name: "BuddyGalleryView",
	components: {
		// "buddy-gallery": buddyGallery,
		// PipingScreenShare,
		"vue-webrtc": VueWebRTC,
		Fragment,
	},
	data: () => ({
		buddies: [],
	}),
	methods: {
		// getBuddies() {
		// 	fetch("http://localhost:3000/buddies")
		// 		.then((response) => response.json())
		// 		.then((data) => {
		// 			this.buddies = data;
		// 		});
		// },
	},
	mounted() {
		// this.getBuddies();
	},
};
</script>
