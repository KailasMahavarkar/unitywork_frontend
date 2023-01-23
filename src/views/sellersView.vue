<template>
	<page-component>
		<div class="flex flex-wrap mt-5">
			<router-link
				class="bg-base-100 flex flex-col shadow-md rounded-lg px-4 py-6 sm:px-6 lg:px-8 max-w-[300px]"
				v-for="seller in sellers"
				:key="seller._id"
				:to="{
					name: 'sellerView',
					params: { username: seller.username },
				}"
			>
				<div class="flex flex-col items-center">
					<img
						class="h-24 w-24 rounded-full"
						:src="seller.avatar.secureUrl"
						alt="avatar"
					/>
					<div class="text-sm leading-5 font-medium text-indigo-600">
						{{ seller.firstname + " " + seller.lastname }}
					</div>
					<div class="font-bold text-sm my-1">
						<span
							class="text-info child:mx-2"
							:class="
								seller.verification.verificationStatus ===
								'verified'
									? 'text-success'
									: 'text-error'
							"
						>
							{{
								seller.verification.verificationStatus ===
								"verified"
									? "Verified"
									: "Not Verified"
							}}
							<font-awesome-icon
								:icon="
									seller.verification.verificationStatus ===
									'verified'
										? 'fa-solid fa-check'
										: 'fa-solid fa-circle-xmark'
								"
							/>
						</span>
					</div>
				</div>

				<p class="mt-3 m-0 leading-7">Gigs {{ seller.gigs.length }}</p>
			</router-link>
		</div>
	</page-component>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
export default {
	name: "sellersView",
	components: {},
	data: () => ({
		sellers: [],
	}),
	props: {},

	mounted() {
		this.getSellers();
	},
	methods: {
		async getSellers() {
			// get the sellers from the api
			try {
				const result = await api.get("/sellers");

				if (result.status === 200) {
					this.sellers = result.data.data;
				}
			} catch (error) {
				handleCustomError(error);
			}
		},
	},
};
</script>
