<template>
	<admin-dashboard-component>
		<div class="overflow-x-auto flex justify-center">
			<table class="table table-compact w-[90%]">
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
						<td>{{ gig._id }}</td>
						<td>{{ gig.sellerUsername }}</td>
						<td>
							<router-link
                                target="_blank"
								:to="{
									name: 'gigView',
									params: { id: gig._id },
								}"
							>
								<button
									class="btn btn-sm btn-outline btn-primary"
								>
									View
								</button>
							</router-link>
						</td>

						<td>
							<div class="flex flex-col child:m-1">
								<button
									class="btn btn-sm btn-success"
									@click="
										gigUpdateHandler(gig._id, 'verified')
									"
								>
									Approve
								</button>
								<button
									@click="
										gigUpdateHandler(gig._id, 'rejected')
									"
									class="btn btn-sm btn-error"
								>
									Reject
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
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
	},

	async mounted() {
		try {
			const result = await api.get("/admin/gig/all-verification");
			this.gigs = result.data.data;
		} catch (error) {
			handleCustomError(error);
		}
	},
};
</script>
