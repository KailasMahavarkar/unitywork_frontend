<template>
	<div class="flex flex-col">
		<section class="flex items-center justify-center">
			<hero-section />
		</section>

		<!-- marketplace section -->
		<section class="flex flex-col items-center justify-center w-full">
			<h1 class="text-3xl font-bold text-center">
				Explore the Marketplace
			</h1>
			<div class="flex flex-wrap w-full child:flex-1 child:grayscale">
				<div
					class="hover:grayscale flex flex-col items-center justify-center"
				>
					<img
						src="../assets/icons/programming.svg"
						class="rounded-md w-[6rem]"
						alt="developer"
					/>
					<h1 class="text-2xl font-bold text-center">Programming</h1>
				</div>
				<div class="flex flex-col items-center justify-center">
					<img
						src="../assets/icons/graphics_design.svg"
						class="rounded-md w-[6rem]"
						alt="designer"
					/>
					<h1 class="text-2xl font-bold text-center">
						Graphics & Design
					</h1>
				</div>
				<div class="flex flex-col items-center justify-center">
					<img
						src="../assets/icons/business.svg"
						class="rounded-md w-[6rem]"
						alt="entrepreneur"
					/>
					<h1 class="text-2xl font-bold text-center">Business</h1>
				</div>

				<div class="flex flex-col items-center justify-center">
					<img
						src="../assets/icons/video_animation.svg"
						class="rounded-md w-[6rem]"
						alt="entrepreneur"
					/>
					<h1 class="text-2xl font-bold text-center">
						Video & Animation
					</h1>
				</div>
			</div>
		</section>

		<!-- Why Choose US -->
		<section class="flex flex-col items-center justify-center"></section>

		<div class="m-[2em] text-primary">
			<h1>Welcome to CodeBuddy Platform</h1>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/helloWorld.vue";

import heroSectionVue from "@/components/heroSection.vue";

export default {
	name: "HomeView",
	data: function () {
		return {
			replace: [
				{
					text: "Welcome to the CodeBuddy Platform",
					replace: "Stuck in code/design get help now",
				},
			],
			typingDone: false,
		};
	},
	components: {
		"hero-section": heroSectionVue,
	},

	mounted() {},
};
</script>
