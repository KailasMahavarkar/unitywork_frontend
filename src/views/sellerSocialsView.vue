<template>
	<fragment>
		<div class="flex w-full items-center justify-center shadow">
			<div
				class="flex flex-col items-center justify-center shadow p-10 m-5"
			>
				<!-- form to update social -->
				<h1 class="flex justify-center items-center">
					Update Social Media
				</h1>
				<div class="divider m-0 p-0 h-[0.25rem]"></div>

				<div
					class="form-control"
					v-for="social in Object.keys(socials)"
					:key="social"
				>
					<div class="form-control">
						<label class="label">
							<span class="label-text"> </span>
						</label>
						<label class="input-group">
							<span class="bg-gray-500 text-white">
								<font-awesome-icon
									:icon="['fab', social]"
									class="w-8 h-8"
								/>
							</span>
							<span class="min-w-[200px]"
								>https://{{ social }}.com/
							</span>

							<input
								type="text"
								placeholder=""
								v-model="socials[social]"
								class="flex-1 input input-bordered"
							/>
						</label>
					</div>
				</div>
				<div class="divider"></div>
				<div class="flex justify-end">
					<button class="btn btn-primary" @click="() => updateSocial()">
						Update Socials
					</button>
				</div>
			</div>
		</div>
	</fragment>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
import customToast from "@/toast";
const defaultSocials = {
	github: "",
	instagram: "",
	facebook: "",
	twitter: "",
	behance: "",
	youtube: "",
	linkedin: "",
	discord: "",
};

export default {
	name: "sellerSocialView",
	data() {
		return {
			socials: defaultSocials,
		};
	},
	watch: {},
	computed: {},
	methods: {
		async updateSocial() {
			try {
				const result = await api.patch(
					"/seller/socials",
					{ socials: this.socials },
					{
						headers: {
							Authorization: `Bearer ${this.$store.state.user.accessToken}`,
						},
					}
				);

				if (result.status === 200) {
					customToast({
						message: "Socials updated successfully",
						type: "success",
					});
				}
			} catch (error) {
				handleCustomError(error);
			}
		},
	},

	async mounted() {
		// get the socials from the api
		try {
			const result = await api.get("/seller/socials", {
				headers: {
					Authorization: `bearer ${this.$store.state.user.accessToken}`,
				},
			});

			if (result.status === 200) {
				this.socials = result.data.data.socials;
			}
		} catch (error) {
			handleCustomError(error);
		}
	},
};
</script>
