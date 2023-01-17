<template>
	<admin-dashboard-component>
		<div class="overflow-x-auto flex justify-center">
			<table class="table table-compact w-[90%]" v-if="gigs.length > 0">
				<thead>
					<tr>
						<th>Gig Id</th>
						<th>Seller Name</th>
						<th>View</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="gig in gigs" :key="gig._id">
						<!-- check if any gigs is present -->
						<td>{{ gig._id }}</td>
						<td>{{ gig.sellerUsername }}</td>
						<td>
							<router-link target="_blank" :to="{
								name: 'gigView',
								params: { id: gig._id },
							}">
								<button class="btn btn-sm btn-outline btn-primary">
									View
								</button>
							</router-link>
						</td>

						<td>
							<div class="flex flex-col child:m-1">
								<button class="btn btn-sm btn-success" @click="
									gigUpdateHandler(gig._id, 'verified')
								">
									Approve
								</button>
								<button @click="
									gigUpdateHandler(gig._id, 'rejected')
								" class="btn btn-sm btn-error">
									Reject
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div v-if="gigs.length == 0">
				<h2 class="text-center">No Gigs to verify</h2>
				<button class="btn dark:btn-outline" @click="syncHandler">Reload Gigs</button>
			</div>
		</div>
	</admin-dashboard-component>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
import customToast from "@/toast";
export default {
	name: "adminSellersView",
	components: {},
	data() {
		return {
			// each object consists of _id(string), verification(object)
			gigs: [],
		};
	},

	methods: {
		async gigUpdateHandler(gigId, status) {
			try {
				const result = await api.patch(
					`/admin/gig/update-verification/${gigId}`,
					{
						status: status,
					}
				);

				if (result.status === 200) {

					// remove the gig from the gigs array
					this.gigs = this.gigs.filter((gig) => gig._id !== gigId);

					customToast({
						message: `gig ${status} successfully`,
						icon: "success",
					});
				}
			} catch (error) {
				handleCustomError(error);
			}
		},

		async getAllGigs() {
			try {
				const result = await api.get("/admin/gig/all-verification");
				this.gigs = result.data.data;
			} catch (error) {
				handleCustomError(error);
			}
		},

		async syncHandler() {
			await this.getAllGigs();
			customToast({
				message: "Gigs synced successfully",
				icon: "success",
			});
		},
	},

	async mounted() {
		await this.getAllGigs();

	},
};
</script>
