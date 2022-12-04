<template>
	<div class="flex flex-col w-full h-full items-center justify-center">
		<!-- toggle dashboard logic -->
		<div class="flex justify-center w-full p-5 gap-5">
			<router-link to="/gigs">
				<button class="btn btn-outline btn-primary">
					<font-awesome-icon
						class="mx-2"
						:icon="['fas', 'house']"
					></font-awesome-icon>
					Switch to Gig Listing
				</button>
			</router-link>

			<router-link to="/seller-dashboard/create-gig">
				<button class="btn btn-outline btn-secondary">
					<font-awesome-icon
						class="mx-2"
						:icon="['fas', 'add']"
					></font-awesome-icon>
					Create Gig
				</button>
			</router-link>

			<router-link to="/seller-dashboard/verify">
				<button class="btn btn-outline ">
					<font-awesome-icon
						class="mx-2"
						:icon="['fas', 'circle-check']"
					></font-awesome-icon>
					verify seller
				</button>
			</router-link>
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
						<th>Actions</th>
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
								<!-- analytics -->
								<button
									class="btn gap-2 btn-outline btn-sm btn-out"
								>
									<font-awesome-icon
										class="mx-2"
										:icon="['fas', 'chart-line']"
									></font-awesome-icon>
									Insights
								</button>

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
						<td colspan="6">
							<button
								:class="{
									'btn-warning': gig?.status === 'paused',
								}"
								:disabled="gig.status === 'draft'"
								class="btn gap-2 btn-sm"
							>
								{{
									gig?.status === "paused"
										? "click to activate"
										: "click to pause"
								}}
							</button>
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

export default {
	name: "sellerDashboardView",

	components: {},

	data() {
		return {
			buyerDashboard: true,
			gigs: [],
		};
	},

	methods: {
		async deleteGig(gigId, title) {
			const deleteGIGAfterConfirm = async (gigId) => {
				const URL = "/seller/gigs/" + gigId;

				try {
					await api.delete(URL, {
						headers: {
							authorization:
								"Bearer " + this.$store.state.user.accessToken,
						},
					});

					// update gigs
					this.gigs = this.gigs.filter((gig) => gig._id !== gigId);
					Swal.fire("Saved!", "", "success");

					customToast({
						title: "Success",
						message: "Gig deleted successfully",
						type: "success",
					});
				} catch (error) {
					handleCustomError(error);
				}
			};

			try {
				Swal.fire({
					title: "Do you want to delete gig with title " + title,
					showDenyButton: false,
					showCancelButton: true,
					confirmButtonText: "Yes, Delete it",
				}).then(async (result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						await deleteGIGAfterConfirm(gigId);
					}
				});
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
				headers: {
					authorization:
						"Bearer " + this.$store.state.user.accessToken,
				},
			});
			this.gigs = result.data.data;
		} catch (error) {
			return handleCustomError(error);
		}
	},
};
</script>
