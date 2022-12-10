<template>
	<section class="flex flex-col items-center justify-center">
		<h2 class="font-bold text-center">
			Open Marketplace for freelancers
		</h2>
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
							class="m-2 w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
							alt="entrepreneur"
						/>
						<h3 class="mt-0 font-bold text-center">
							{{ block.title }}
						</h3>
					</div>
				</router-link>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "marketplaceComponent",
	components: {},

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
	data: function () {
		return {
			replace: [
				{
					text: "Welcome to the CodeBuddy Platform",
					replace: "Stuck in code/design get help now",
				},
			],
		};
	},
};
</script>
