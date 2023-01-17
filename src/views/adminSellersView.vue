<template>
	<admin-dashboard-component>
		<div class="overflow-x-auto flex justify-center">
			<table class="table table-compact w-[90%]" v-if="sellers.length > 0">
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
							<a :href="seller.verification.govtIdCard.secureUrl" target="_blank"
								rel="noopener noreferrer">
								<img :src="
									seller.verification.selfieGovtIdCard
										.secureUrl
								" class="w-20 h-20" alt="" />
							</a>
						</td>
						<td class="relative">
							<a :href="seller.verification.govtIdCard.secureUrl" target="_blank"
								rel="noopener noreferrer">
								<img :src="
									seller.verification.govtIdCard.secureUrl
								" class="w-20 h-20" alt="" />
							</a>
						</td>

						<td>
							{{ seller.verification.country }}
						</td>
						<td>
							<div class="flex flex-col child:m-1">
								<button class="btn btn-sm btn-success" @click="
									sellerUpdateHandler(
										seller._id,
										'verified'
									)
								">
									Approve
								</button>
								<button @click="
									sellerUpdateHandler(
										seller._id,
										'rejected'
									)
								" class="btn btn-sm btn-error">
									Reject
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div v-if="sellers.length == 0">
				<h2 class="text-center">No sellers to verify</h2>
				<button class="btn dark:btn-outline" @click="syncHandler">Reload Sellers</button>

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
					this.sellers = this.sellers.filter((seller) => seller._id !== sellerId);

					customToast({
						message: `Seller ${status} successfully`,
						icon: "success",
					});
				}
			} catch (error) {
				handleCustomError(error);
			}
		},

		async getAllSellers() {
			try {
				const result = await api.get("/admin/seller/all-verification");
				this.sellers = result.data.data;


			} catch (error) {
				handleCustomError(error);
			}
		},

		async syncHandler() {
			await this.getAllSellers();
			customToast({
				message: "Sellers fetched successfully",
				icon: "success",
			})
		},
	},

	async mounted() {
		await this.getAllSellers();
	},
};
</script>
