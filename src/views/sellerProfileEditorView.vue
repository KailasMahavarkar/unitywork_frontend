<template>
	<dashboard-component>
		<div
			class="flex flex-col w-full m-auto p-5 bg-base-200"
			v-if="showControls"
		>
			<div class="flex flex-col md:flex-row">
				<div class="form-control w-full mx-2 max-w-md">
					<label class="label">
						<span class="label-text text-lg">firstname</span>
					</label>
					<input
						type="email"
						:required="true"
						class="input input-bordered w-full"
						v-model="firstname"
					/>
				</div>
				<div class="form-control w-full mx-2 max-w-md">
					<label class="label">
						<span class="label-text">lastname</span>
					</label>
					<input
						type="email"
						:required="true"
						class="input input-bordered w-full"
						v-model="lastname"
					/>
				</div>
			</div>

			<div class="flex flex-col md:flex-row">
				<div class="form-control w-full mx-2 max-w-md">
					<label class="label">
						<span class="label-text">job title</span>
					</label>
					<input
						type="text"
						:required="true"
						class="input input-bordered w-full"
						v-model="job"
					/>
				</div>
				<div class="form-control w-full mx-2 max-w-md">
					<label class="label">
						<span class="label-text">education</span>
					</label>
					<input
						type="text"
						:required="true"
						class="input input-bordered w-full"
						v-model="education"
					/>
				</div>
			</div>

			<div class="flex flex-col md:flex-row">
				<div class="form-control w-full mx-2 max-w-md">
					<label class="label">
						<span class="label-text">description</span>
					</label>
					<textarea
						:required="true"
						class="textarea textarea-bordered w-full min-h-[200px]"
						v-model="description"
					/>
				</div>

				<div class="form-control w-full mx-2 max-w-md">
					<label class="label">
						<span class="label-text">location</span>
					</label>
					<input
						type="text"
						:required="true"
						class="input input-bordered w-full"
						v-model="location"
					/>
				</div>
			</div>

			<div class="flex flex-col md:flex-row">
				<file-uploader
					class="max-w-md"
					:image.sync="avatar"
					:max-height="200"
					:min-height="200"
					:max-width="200"
					:min-width="200"
				>
				</file-uploader>
			</div>

			<div class="flex flex-col md:flex-row">
				<div class="form-control w-full m-2 max-w-md">
					<button class="btn btn-primary" @click="updateProfile">
						Update Profile
					</button>
				</div>
			</div>
		</div>
		<div class="flex justify-end">
			<button
				class="btn btn-primary btn-outline rounded-none btn-sm"
				@click="() => (showControls = !showControls)"
			>
				{{ showControls ? "Hide" : "Show" }} Controls
			</button>
		</div>

		<div
			class="flex flex-col min-h-[800px] items-center justify-center mt-5"
		>
			<section class="pt-16">
				<div
					class="lg:min-w-[500px] w-full md:w-9/12 lg:w-5/12 px-4 mx-auto dark:border-gray-700 dark:border-[1px]"
				>
					<seller-card
						:username="username"
						:avatar="avatar"
						:firstname="firstname"
						:lastname="lastname"
						:description="description"
						:location="location"
						:education="education"
						:job="job"
						:rank="rank"
						:socials="socials"
						:gig-views="gigViews"
						:gig-count="gigCount"
					>
					</seller-card>
				</div>
			</section>
		</div>
	</dashboard-component>
</template>

<script>
import fileuploadComponentVue from "@/components/fileuploadComponent.vue";

import sellerCardVue from "@/components/sellerCard.vue";
import api from "@/api";
import { handleCustomError } from "@/helper";
import customToast from "@/toast";
import { socialDefault } from "@/data/default";
export default {
	name: "sellerView",
	components: {
		"file-uploader": fileuploadComponentVue,
		"seller-card": sellerCardVue,
	},
	computed: {},
	data() {
		return {
			avatar: {
				preview: "",
				secureUrl: "",
				publicId: "",
			},
			firstname: "Jenna",
			lastname: "Stones",
			location: "Los Angeles, California",
			job: "Solution Manager - Creative Tim Officer",

			education: "University of Computer Science",
			gigCount: 10,
			gigViews: 13550,
			rank: 1,

			description: "Hello",
			country: "",

			showControls: false,
			username: "zeno",
			socials: socialDefault,
			// gigs: [
			// 	{
			// 		gigId: "123456",
			// 		sellerLevel: "5",
			// 		sellerName: "John Doe",
			// 		sellerAvatar:
			// 			"https://source.unsplash.com/random/300x300/?1",
			// 		gigTitle:
			// 			"I will create a professional logo for your business",
			// 		gigThumbnail:
			// 			"https://source.unsplash.com/random/300x200/?1",
			// 		gigPrice: "5",
			// 		gigRating: "4.5",
			// 		gigTags: ["logo", "branding", "business"],
			// 	},
			// ],
		};
	},
	created() {
		this.getSeller();
	},
	methods: {
		async updateProfile() {
			try {
				const result = await api.patch("/seller/profile", {
					firstname: this.firstname,
					lastname: this.lastname,
					location: this.location,
					job: this.job,
					avatar: {
						secureUrl: this.avatar.secureUrl,
						publicId: this.avatar.publicId,
						preview: "",
					},
					education: this.education,
					description: this.description,
				});

				if (result.data.status === "success") {
					customToast({
						message: "Profile updated successfully",
						icon: "success",
					});
				}
			} catch (error) {
				handleCustomError(error);
			}
		},
		async getSeller() {
			const user = this.$store.state.user;
			const URL = `/seller/profile/${user.username}`;

			try {
				const result = await api.get(URL);

				if (result.data.status === "success") {
					const data = result.data.data;
					this.firstname = data.firstname;
					this.lastname = data.lastname;
					this.location = data.location;
					this.job = data.job;
					this.avatar = data.avatar;
					this.education = data.education;
					this.description = data.description;
					this.country = data.country;
					this.socials = data.socials;
				}

				this.seller = result.data.data;
			} catch (error) {
				handleCustomError(error);
			}
		},
	},
};
</script>
