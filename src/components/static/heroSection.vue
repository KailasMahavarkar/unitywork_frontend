<template>
	<page-component>
		<div class="flex flex-col">
			<!-- search component -->
			<div class="flex flex-col">
				<div class="flex flex-1 items-center justify-center">
					<h1 class="text-center max-w-lg w-full">
						Freelance platform for
						<span class="text-red-500">Developers</span>,
						<span class="text-yellow-500">Designers</span>
						and <span class="text-green-500">Businesses</span>
					</h1>
				</div>
				<div class="flex-1 flex w-full h-full mt-0">
					<div class="flex form-control w-full">
						<div class="input-group mt-0">
							<input
								v-model="query"
								type="text"
								placeholder="Search gigs by keywords like website, nextjs, vue etc"
								class="input input-bordered w-full"
							/>
							<button
								@click="redirectSearch"
								class="btn btn-square"
							>
								<font-awesome-icon :icon="['fas', 'search']">
								</font-awesome-icon>
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- image slider -->
			<div class="flex-1 flex items-center justify-center">
				<div class="hero_slider">
					<vue-image-slider
						:images="imageArray"
						:intervalVal="3000"
					/>
				</div>
			</div>
		</div>
	</page-component>
</template>

<script>
// @ts-nocheck
import VueImageSlider from "vue-image-slider";

export default {
	name: "HomeView",
	components: {
		"vue-image-slider": VueImageSlider,
	},
	data: function () {
		return {
			replace: [
				{
					text: "Developer",
					replace: "Designer",
				},
				{
					text: "Designer",
					replace: "Enterpreneur",
				},
			],
			typingDone: false,
			query: "",

			imageArray: [
				require("../../assets/svg/designer.svg"),
				require("../../assets/svg/developer.svg"),
				require("../../assets/svg/entrepreneur.svg"),
			],
		};
	},

	methods: {
		redirectSearch() {
			this.$router.push(`/gigs?query=${this.query}`);
		},
	},

	mounted() {},
};
</script>
