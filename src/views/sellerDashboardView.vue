<template>
	<div class="flex flex-col w-full h-full items-center justify-center">
		<!-- toggle dashboard logic -->
		<div class="flex justify-center w-full p-5 gap-5">
			<link-button
				buttonClass="btn-outline"
				:to="{ name: 'gigsView' }"
				:icon="['fas', 'house']"
			>
				Switch to Gig Listing
			</link-button>

			<link-button
				buttonClass="btn-outline"
				:to="{ name: 'sellerGigCreateView' }"
				:icon="['fas', 'add']"
			>
				Create Gig
			</link-button>

			<link-button
				buttonClass="btn-outline "
				:to="{ name: 'sellerVerificationView' }"
				:icon="['fas', 'circle-check']"
			>
				verify seller
			</link-button>

			<link-button
				buttonClass="btn-outline"
				:to="{ name: 'sellerVerificationView' }"
				:icon="['fas', 'circle-check']"
			>
				Edit Seller Profile
			</link-button>

			<link-button
				buttonClass="btn-outline"
				:to="{ name: 'sellerSocialsView' }"
				:icon="['fas', 'circle-check']"
			>
				Edit Social Info
			</link-button>
		</div>

		<!-- all gigs overview -->
		<div class="overflow-x-auto min-w-[80%] min-h-[60vh]">
			<table class="table w-full shadow-md">
				<!-- head -->
				<thead>
					<tr>
						<th>Title</th>
						<th>Status</th>
						<th>Preview</th>
						<th>Gig Actions</th>
						<th>User Actions</th>

						<th></th>
					</tr>
				</thead>
				<tbody v-if="gigs">
					<!-- row 1 -->
					<tr v-for="gig in gigs" :key="gig._id">
						<th>
							{{ gig.title }}
						</th>
						<td>
							<font-awesome-icon
								class="mx-2"
								:class="{
									'text-gray-300': gig.status === 'draft',
									'text-green-500': gig.status === 'active',
									'text-red-500': gig.status === 'inactive',
								}"
								:icon="['fas', 'circle']"
							></font-awesome-icon>
							{{ gig.status }}
						</td>
						<td>
							<div class="flex items-center space-x-3">
								<img
									:src="gig.thumbnail"
									class="w-[120px] h-[60px]"
									alt="Avatar Tailwind CSS Component"
								/>
							</div>
						</td>
						<td>
							<div class="btn-group btn-group-vertical">
								<!-- delete -->
								<button
									class="btn btn-error btn-outline my-1 gap-2 btn-sm"
									@click="deleteGig(gig._id, gig.title)"
								>
									<font-awesome-icon
										class="mx-2"
										:icon="['fas', 'trash']"
									></font-awesome-icon>
									Delete
								</button>
								<button class="btn btn-primary gap-2 btn-sm">
									<font-awesome-icon
										class="mx-2"
										:icon="['fas', 'edit']"
									></font-awesome-icon>
									Edit
								</button>
							</div>
						</td>
						<td>
							<div class="btn-group btn-group-vertical">
								<!-- CORE ACTIONS -->
								<button
									class="btn gap-2 btn-outline btn-sm btn-out"
									:disabled="gig.verification === 'verified'"
									@click="gigVerificationHandler(gig._id)"
								>
									<font-awesome-icon
										class="mx-2"
										:icon="['fas', 'eye']"
									></font-awesome-icon>

									{{
										gig.verification === "verified"
											? "gig is verified"
											: "pending verification"
									}}
								</button>

								<button
									class="btn btn-outline my-1 gap-2 btn-sm"
									@click="gigStatusChangeHandler(gig._id)"
								>
									<font-awesome-icon
										class="mx-2"
										:icon="
											gig?.status === 'inactive'
												? 'fa-solid fa-check'
												: 'fa-solid fa-times'
										"
									></font-awesome-icon>
									{{
										gig?.status === "inactive"
											? "activate gig"
											: "inactivate gig"
									}}
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
import customToast from "@/toast";
import Swal from "sweetalert2";

import linkButton from "@/components/linkButton.vue";
import produce from "immer";

export default {
	name: "sellerDashboardView",

	components: {
		"link-button": linkButton,
	},

	data() {
		return {
			buyerDashboard: true,
			gigs: [],
		};
	},

	computed: {
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
						const URL = "/seller/gigs/" + gigId;

						try {
							await api.delete(URL, {
								headers: {
									authorization:
										"Bearer " +
										this.$store.state.user.accessToken,
								},
							});

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
				const URL = `/seller/gig/status`;
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
		// get all gigs created by this user
		// user will be treated as seller while making the request to fetch gigs
		const sellerId = this.$store.state.user._id;
		const URL = `/seller/` + sellerId + "/gigs";

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
