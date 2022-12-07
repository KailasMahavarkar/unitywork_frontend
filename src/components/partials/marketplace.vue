<template>
	<div class="flex flex-wrap justify-center">
		<div
			class="flex grayscale flex-col items-center justify-center border-2 m-2"
			v-for="block in blocks"
			:key="block.title"
		>
			<router-link :to="block.link">
				<div class="flex flex-col items-center justify-center p-2">
					<img
						:src="block.icon"
						class="m-2 w-[150px] h-[150px] md:w-[200px] md:h-[200px] "
						alt="entrepreneur"
					/>
					<h1 class="text-2xl font-bold text-center">
						{{ block.title }}
					</h1>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "marketplaceBlock",
	data: function () {
		return {};
	},
	props: {},

	computed: {
		blocks() {
			return [
				{
					// @ts-ignore
					icon: require("@/assets/svg/business.svg"),
					link: "/gigs?category=business",
					title: "Business",
				},
				{
					// @ts-ignore
					icon: require("@/assets/icons/graphics_design.svg"),
					link: "/gigs?category=design",
					title: "Design",
				},
				{
					// @ts-ignore
					icon: require("@/assets/icons/programming.svg"),
					link: "/gigs?category=programming",
					title: "Programming",
				},
				{
					// @ts-ignore
					icon: require("@/assets/icons/video_animation.svg"),
					link: "/gigs?category=video",
					title: "Animation",
				},
			];
		},
	},

	mounted() {},
};
</script>
