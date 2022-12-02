<template>
	<div class="flex flex-wrap">
		<div
			v-for="item in buddies"
			:key="item.handle"
			class="card w-96 bg-base-100 shadow-md m-5"
		>
			<figure>
				<img
					class="min-h-full w-full"
					:src="item.gravatar"
					alt="Shoes"
				/>
			</figure>
			<div class="card-body">
				<h2 class="card-title">@{{ item.handle }}</h2>
				<p>
					{{ item.bio }}
				</p>
				<div class="card-actions justify-end">
					<button
						class="btn btn-primary  btn-responsive"
					>
						Get in touch
						<font-awesome-icon icon="envelope" class="mx-2" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "buddyGallery",
	data: () => ({
		buddies: [],
	}),
	methods: {},
	mounted() {
		// this.buddies = [
		// 	{
		// 		name: "Dhruv Jain",
		// 		handle: "maddhruv",
		// 		gravatar:
		// 			"https://avatars.githubusercontent.com/u/18121502?v=4",
		// 		contact: {
		// 			countryCallingCode: "+91",
		// 			phoneNumber: "1234567890",
		// 		},
		// 		email: "",
		// 		bio: "I am a software developer",
		// 		skills: ["JavaScript", "Python", "C++"],
		// 		interests: [
		// 			"Web Development",
		// 			"Machine Learning",
		// 			"Competitive Programming",
		// 		],
		// 	},
		// 	{
		// 		name: "Roald Nefs",
		// 		handle: "roaldnefs",
		// 		gravatar: "https://avatars.githubusercontent.com/u/6523325?v=4",
		// 		contact: {
		// 			countryCallingCode: "+31",
		// 			phoneNumber: "1234567890",
		// 		},
		// 		email: "",
		// 		bio: "IT consultant at Warpnet B.V. with over five years of SRE and DevOps experience at various companies like DUO and KPN.",
		// 		skills: ["JavaScript", "Python", "C++"],
		// 		interests: [
		// 			"Finance",
		// 			"HR Management",
		// 			"Competitive Programming",
		// 		],
		// 	},
		// 	{
		// 		name: "Simon Willison",
		// 		handle: "simonw",
		// 		gravatar: "https://avatars.githubusercontent.com/u/9599?v=4",
		// 		contact: {
		// 			countryCallingCode: "+1",
		// 			phoneNumber: "1234567890",
		// 		},
		// 		email: "",
		// 		bio: "I'm a software developer and data journalist. I work at the Guardian, where I'm the lead developer on the Guardian's open data platform, Socrata.",
		// 		skills: ["Python", "GoLang", "Rust"],
		// 		interests: ["AI", "Data Science", "Competitive Programming"],
		// 	},
		// 	{
		// 		name: "Wesllen Vinicius",
		// 		handle: "Wesllen-Vinicius",
		// 		gravatar:
		// 			"https://avatars.githubusercontent.com/u/70298519?v=4",
		// 		contact: {
		// 			countryCallingCode: "+55",
		// 			phoneNumber: "1234567890",
		// 		},
		// 		email: "",
		// 		bio: "Learning to develop and always motivated to create something new and learn more.",
		// 		skills: ["html", "typescript", "css", "vue", "javascript"],
		// 		interests: ["web development", "mobile development"],
		// 	},
		// 	{
		// 		name: "Jessica Lim",
		// 		handle: "JessicaLim8",
		// 		gravatar:
		// 			"https://avatars.githubusercontent.com/u/32988878?v=4",
		// 		contact: {
		// 			countryCallingCode: "+65",
		// 			phoneNumber: "1234567890",
		// 		},
		// 		email: "",
		// 		bio: "i code sometimes",
		// 		skills: ["html", "css", "javascript"],
		// 	},
		// ];
	},
};
</script>
