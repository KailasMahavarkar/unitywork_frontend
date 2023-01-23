<template>
	<div
		class="flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg mt-16"
	>
		<!-- seller avatar & seller name -->
		<div class="flex flex-wrap justify-center">
			<div class="w-full px-4 flex justify-center">
				<div class="flex justify-center relative w-[150px] h-[90px]">
					<img
						:src="getAvatar"
						class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-12"
					/>
				</div>
			</div>
			<h3>{{ fullname.slice(0, 30) }}</h3>

			<!-- seller socials  -->
			<div class="w-full flex justify-center">
				<social-card :socials="socials"></social-card>
			</div>
		</div>
		<div class="divider h-[0.25rem]"></div>

		<!-- seller location, job and education -->
		<div class="text-center">
			<!-- location -->
			<h4 class="text-gray-400">
				{{ location || "Location Unspecified" }}
			</h4>
			<div class="mb-2 mt-6">
				<!-- job -->
				<i class="fas fa-briefcase mr-2 text-lg"></i>
				{{ job || "Job Title Unspecified" }}
			</div>
			<div class="mb-2">
				<!-- education -->
				<i class="fas fa-university mr-2 text-lg"></i>
				{{ education || "Education Level Unspecified" }}
			</div>
		</div>
		<div class="divider h-[0.25rem]"></div>

		<!-- seller description -->
		<div class="flex flex-wrap justify-center text-center">
			<div class="w-full px-10">
				<p>
					{{ description || "About Unspecified" }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import socialCardVue from "./socialCard.vue";
import { socialDefault } from "@/data/default";
export default {
	name: "sellerCard",
	components: {
		"social-card": socialCardVue,
	},

	data() {
		return {};
	},
	props: {
		socials: {
			type: Object,
			required: false,
			default: () => socialDefault,
		},

		username: {
			type: String,
			required: true,
		},
		avatar: {
			type: Object,
			required: false,
			default: () => {
				return {
					preview: "",
					secureUrl: "",
					publidId: "",
				};
			},
		},
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},

		location: {
			type: String,
			required: true,
		},
		job: {
			type: String,
			required: true,
		},
		education: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	computed: {
		fullname() {
			return `${this.firstname || "John"} ${this.lastname || "Doe"}`;
		},
		getAvatar() {
			const fallbackUrl = `https://avatars.dicebear.com/api/identicon/${this.username}.svg`;
			return this.avatar.secureUrl || fallbackUrl;
		},
	},
};
</script>
