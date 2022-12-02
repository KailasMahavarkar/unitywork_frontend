<template>
	<fragment>
		<div class="flex-1 flex justify-start items-center h-full w-full">
			<div class="flex flex-col">
				<div class="text-left ">
					Freelancer platform for

					<typewriter 
                    :replace="replace">
						<span class="text-red-500">Developers</span>,
						<span class="text-yellow-500">Designers</span>
						and <span class="text-green-500">Businesses</span>
					</typewriter>
				</div>
                <div class="w-full">
                    <search-component></search-component>
                </div>
			</div>
		</div>
		<div class="flex-1 flex w-full h-full items-center justify-center">
			<img
				src="../assets/svg/designer.svg"
				class="rounded-md max-w-[70%] max-h-[70%]"
				alt="designer"
			/>
		</div>
	</fragment>
</template>

<script>
import searchComponentVue from "./searchComponent.vue";
import Typewriter from "typewriter-vue";

export default {
	name: "HomeView",
	components: {
		"search-component": searchComponentVue,
		typewriter: Typewriter,
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

			hero: {
				text: "Designer",
				link: "../assets/pngs/designer.png",
				bg: "bg-red-500",
			},

			heroImages: {
				designer: {
					link: "../assets/pngs/designer.png",
					text: "Designer",
					bgColor: "bg-red-500",
				},
				developer: {
					link: "../assets/pngs/developer.png",
					text: "Developer",
					bgColor: "bg-blue-500",
				},
				entrepreneur: {
					link: "../assets/pngs/entrepreneur.png",
					text: "Entrepreneur",
					bgColor: "bg-green-500",
				},
			},
		};
	},

	mounted() {},
};
</script>
