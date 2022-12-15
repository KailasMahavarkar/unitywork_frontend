<template>
	<admin-dashboard-component>
		<div class="overflow-x-auto flex justify-center">
			<table class="table table-compact w-[90%]">
				<thead>
					<tr>
						<th>Firstname</th>
						<th>Lastname</th>
						<th>Govt Id Card</th>
						<th>Selfie Govt Id card</th>
						<th>country</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="seller in sellers" :key="seller._id">
						<td>{{ seller.verification.firstname }}</td>
						<td>{{ seller.verification.lastname }}</td>
						<td class="relative">
							<img
								:src="
									seller.verification.selfieGovtIdCard
										.secureUrl
								"
								class="w-20 h-20 hover:w-[300px] hover:h-[200px]"
								alt=""
							/>
						</td>
						<td class="relative">
							<a
								:href="seller.verification.govtIdCard.secureUrl"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									:src="
										seller.verification.govtIdCard.secureUrl
									"
									class="w-20 h-20"
									alt=""
								/>
							</a>
						</td>

						<td>
							{{ seller.verification.country }}
						</td>
						<td>
							<div class="flex flex-col child:m-1">
								<button
									class="btn btn-sm btn-success"
									@click="sellerUpdateHandler(seller._id, 'verified')"
								>
									Approve
								</button>
								<button
									@click="sellerUpdateHandler(seller._id, 'rejected')"
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
			sellers: [],
		};
	},

	methods: {
		async sellerUpdateHandler(sellerId, status) {
			try {
				const result = await api.patch(
					`/admin/seller/update-verification/${sellerId}`,
					{
						status: status,
					}
				);

				if (result.status === 200) {
					customToast({
						message: `Seller ${status} successfully`,
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
			const result = await api.get("/admin/seller/all-verification");
			this.sellers = result.data.data;
			console.log(result);
		} catch (error) {
			handleCustomError(error);
		}
	},
};
</script>
