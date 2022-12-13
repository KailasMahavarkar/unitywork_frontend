<template>
	<dashboard-component>
		<div class="m-5">
			<div v-for="gig in gigs" :key="gig._id">
				<div class="card w-96 bg-base-100 shadow-xl">
					<figure class="m-0 p-0">
						<img
							:src="gig.images?.image1?.secureUrl"
							class="m-0 p-0"
							alt="Shoes"
						/>
					</figure>
					<div class="card-body">
						<div class="card-actions justify-end">
							<div>
								<font-awesome-icon
									class="mx-2"
									:class="{
										'text-gray-300': gig.status === 'draft',
										'text-green-500':
											gig.status === 'active',
										'text-red-500':
											gig.status === 'inactive',
									}"
									:icon="['fas', 'circle']"
								></font-awesome-icon>
								{{ gig.status }}
							</div>
						</div>

						<h2 class="card-title m-0 text-left">
							{{ gig.title }}
						</h2>
						<div class="card-actions mt-2">
							<router-link
								:to="{
									name: 'sellerGigEditView',
									params: { gigId: gig._id },
								}"
							>
								<button
									class="btn btn-primary btn-outline btn-sm"
								>
									<font-awesome-icon
										class="mx-2"
										:icon="['fas', 'edit']"
									></font-awesome-icon>
									Edit
								</button>
							</router-link>

							<button
								class="btn btn-error btn-outline btn-sm"
								@click="deleteGig(gig._id, gig.title)"
							>
								<font-awesome-icon
									class="mx-2"
									:icon="['fas', 'trash']"
								></font-awesome-icon>
								Delete
							</button>

							<button
								class="btn btn-outline my-1 gap-2 btn-sm"
								@click="gigStatusChangeHandler(gig._id)"
							>
								<font-awesome-icon
									:icon="
										gig?.status === 'inactive'
											? 'fa-solid fa-check'
											: 'fa-solid fa-times'
									"
								></font-awesome-icon>
								{{
									gig?.status === "inactive"
										? "activate"
										: "inactivate"
								}}
							</button>
							<router-link
								:to="{
									name: 'gigView',
									params: { id: gig._id },
								}"
							>
								<button
									class="btn btn-outline my-1 gap-2 btn-sm"
								>
									<font-awesome-icon
										icon="eye"
									></font-awesome-icon>
									View Gig
								</button>
							</router-link>
						</div>
						<div class="divider m-0"></div>

						<div class="card-actions">
							<button
								class="btn gap-2 btn-outline btn-sm btn-out w-full"
								@click="gigVerificationHandler(gig._id)"
							>
								<font-awesome-icon
									:icon="['fas', 'eye']"
								></font-awesome-icon>
								{{
									gig?.verificationStatus === "created"
										? "verify gig"
										: "click to verify gig"
								}}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</dashboard-component>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
import customToast from "@/toast";
import Swal from "sweetalert2";

import produce from "immer";
import { mapGetters } from "vuex";

export default {
	name: "sellerDashboardView",

	components: {},

	data() {
		return {
			buyerDashboard: true,
			gigs: [],
		};
	},

	computed: {
		...mapGetters(["getUser"]),
		getHeaders: function () {
			return {
				authorization: "bearer " + this.$store.state.user.accessToken,
			};
		},
	},

	methods: {
		async deleteGig(gigId, title) {
			try {
				Swal.fire({
					title: "Do you want to delete gig with title " + title,
					showDenyButton: false,
					showCancelButton: true,
					confirmButtonText: "Yes, Delete it",
				}).then(async (result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						try {
							await api.delete(`/seller/gig`);

							// update gigs
							this.gigs = this.gigs.filter(
								(gig) => gig._id !== gigId
							);
							Swal.fire("Saved!", "", "success");

							customToast({
								title: "Success",
								message: "Gig deleted successfully",
								type: "success",
							});
						} catch (error) {
							handleCustomError(error);
						}
					}
				});
			} catch (error) {
				handleCustomError(error);
			}
		},

		async gigVerificationHandler(gigId) {
			try {
				const URL = `/seller/gig/verify`;
				const result = await api.patch(
					URL,
					{
						gigId: gigId,
					},
					{
						headers: this.getHeaders,
					}
				);

				if (result.status === 200) {
					// update gigs
					this.gigs = produce(this.gigs, (draft) => {
						const gigIndex = draft.findIndex(
							(gig) => gig._id === gigId
						);
						draft[gigIndex].verification = "pending";
					});

					customToast({
						title: "Success",
						message: "Gig status changed successfully",
						type: "success",
					});
				}
			} catch (error) {
				handleCustomError(error);
			}
		},

		async gigStatusChangeHandler(gigId) {
			try {
				const URL = `/seller/gig/${gigId}/status`;
				const result = await api.patch(URL);

				if (result.status === 200) {
					const oldStatus = this.gigs.find(
						(gig) => gig._id === gigId
					).status;

					const newStatus =
						oldStatus === "active" ? "inactive" : "active";

					// update gig status locally
					this.gigs = produce(this.gigs, (draft) => {
						const gig = draft.find((gig) => gig._id === gigId);
						gig.status = newStatus;
					});
					customToast({
						title: "Success",
						message: `Gig status changed to ${newStatus}`,
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

		// get all gigs created by this user
		// user will be treated as seller while making the request to fetch gigs
		const URL = `/seller/${user.username}/gigs`;

		try {
			const result = await api.get(URL, {
				headers: this.getHeaders,
			});
			this.gigs = result.data.data;

			

		} catch (error) {
			return handleCustomError(error);
		}
	},
};
</script>
