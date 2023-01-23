<template>
	<div class="flex flex-col w-full items-center mt-[80px] mb-0">
		<div class="flex flex-col w-[90%]">
			<div class="flex justify-between">
				<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
					Gig Pricing
				</h2>
			</div>
			<table>
				<tr>
					<th>Package</th>
					<th>Price</th>
					<th>Delivery Time</th>
					<th>Revision Count</th>
					<th>Valid</th>
				</tr>
				<tr v-for="(pack, key) in pricings" :key="key">
					<td>
						<input
							:min="300"
							:value="key"
							disabled
							class="input input-bordered rounded-sm w-full flex-1"
						/>
					</td>
					<td>
						<input
							type="number"
							id="price"
							:min="5"
                            :max="100000"
							v-model.number="pack.price"
							class="input input-bordered rounded-sm w-full flex-1"
						/>
					</td>
					<td>
						<select
							class="select select-bordered rounded-sm w-full flex-1"
							v-model="pack.deliveryTime"
						>
							<option
								v-for="(element, index) in timeArray"
								:key="index"
							>
								{{ element }}
							</option>
						</select>
					</td>
					<td>
						<input
							type="number"
							:max="20"
                            :min="1"
							id="revisions"
							v-model.number="pack.revisions"
							class="input input-bordered rounded-sm w-full flex-1"
						/>
					</td>
					<td>
						<font-awesome-icon
							:icon="
								pack.valid ? ['fas', 'check'] : ['fas', 'times']
							"
							class="text-xl text-green-500"
						/>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import { timeArray } from "@/data/timeData";

export default {
	name: "GigPricing",
	props: {
		gigPricings: Object,
	},
	data() {
		return {
			timeArray,
		};
	},
	computed: {
		pricings() {
			return this.gigPricings;
		},
        
	},
	watch: {
		gigPricings: {
			handler: function () {
				// loop every pricing and validate it
				for (const pricing in this.pricings) {
					const revisions = this.pricings[pricing]["revisions"] > 0;
                    const price = this.pricings[pricing]["price"] >= 5;
                    const deliveryTime = this.pricings[pricing]["deliveryTime"] !== '';
                    const isValid  = revisions && price && deliveryTime;
					this.pricings[pricing]["valid"] = isValid;
				}

                // loop and check if at least one is valid
                let isPricingValid = false;
                for (const pricing in this.pricings) {
                    if (this.pricings[pricing]["valid"]) {
                        isPricingValid = true;
                        break;
                    }
                }

				this.$emit("update:gigPricings", this.pricings);
                this.$emit("update:isPricingValid", isPricingValid);
			},
			deep: true,
		},
	},
};
</script>
