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
				</tr>
				<tr v-for="pack in packages" :key="pack.id">
					<td>
						<input
							type="text"
							id="package"
							class="input input-bordered rounded-sm w-full flex-1"
							v-model="pack.name"
						/>
					</td>
					<td>
						<input
							type="number"
							id="price"
							:min="300"
							v-model="pack.price"
							class="input input-bordered rounded-sm w-full flex-1"
						/>
					</td>
					<td>
						<select
							name="deliveryTime"
							class="select select-bordered rounded-sm w-full flex-1"
							v-model="pack.deliveryTime"
						>
							<option v-for="time in timeArray" :key="time">
								{{ time }}
							</option>
						</select>
					</td>
					<td>
						<input
							type="number"
							max="20"
							id="revisions"
							v-model="pack.revisions"
							class="input input-bordered rounded-sm w-full flex-1"
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
	name: "pricingComponent",
	data() {
		return {
			timeArray: timeArray,
		};
	},
	props: {
		step: Number,
		packages: [],
	},
};
</script>
