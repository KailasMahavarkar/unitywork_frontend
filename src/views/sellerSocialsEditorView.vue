<template>
	<dashboard-component>
		<div class="flex flex-col w-full items-center justify-center shadow">
			<div
				class="flex flex-col items-center justify-center shadow dark:shadow-gray-400 p-10 m-5"
			>
				<!-- form to update social -->
				<h2 class="flex justify-center items-center my-2">
					Update Social Links
				</h2>
				<div class="divider m-0 p-0 h-[0.25rem]"></div>
				<social-card :socials="socials" />
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
						<label class="flex flex-col w-full lg:flex-row input-group  ">
							<span class="bg-gray-500 text-white hidden lg:flex ">
								<font-awesome-icon
									:icon="['fab', social]"
									class="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"
								/>
							</span>
							<span class="lg:min-w-[200px]"
								>https://{{ social }}.com/
							</span>

							<input
								type="text"
								placeholder=""
								v-model="socials[social]"
								class="flex-1 input input-bordered min-h-[50px]"
							/>
						</label>
					</div>
				</div>
				<div class="divider"></div>
				<div class="flex justify-end">
					<button
						class="btn btn-outline btn-wide"
						@click="() => updateSocial()"
					>
						Update Socials
					</button>
				</div>
			</div>
		</div>
	</dashboard-component>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
import socialCard from "@/components/socialCard.vue";
import customToast from "@/toast";
import { mapGetters } from "vuex";
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
	components: {
		"social-card": socialCard,
	},
	data() {
		return {
			socials: defaultSocials,
		};
	},
	watch: {},
	computed: {
		...mapGetters(["getUser"]),
	},
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
		const user = this.getUser;

		// get the socials from the api
		try {
			const URL = `/seller/${user.username}/socials`;

			const result = await api.get(URL, {
				headers: {
					Authorization: `bearer ${user.accessToken}`,
				},
			});

			if (result.status === 200) {
				this.socials = user.socials;
			}
		} catch (error) {
			handleCustomError(error);
		}
	},
};
</script>
