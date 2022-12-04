<template>
	<!-- create a tailwind page where you can view single gig  -->
	<div
		class="flex items-start justify-center w-full h-full shadow-md min-h-screen"
	>
		<div class="flex flex-col w-full max-w-[90%]">
			<div class="flex flex-col items-center w-full">
				<div class="flex flex-col">
					<img
						:src="gig.sellerAvatar"
						class="rounded-full m-0 p-0 shadow w-[150px] h-[150px]"
					/>
					<p
						class="mx-2 my-0 flex items-center justify-center text-lg text-left font-bold"
					>
						{{ gig.sellerName }}
					</p>
				</div>

				<div class="flex flex-col mx-2 items-start justify-end">
					<p
						class="mx-2 my-0 flex items-center justify-center badge badge-md"
					>
						Seller level

						<span class="font-bold">
							&nbsp;{{ gig.sellerLevel }}
						</span>
					</p>
				</div>
			</div>

			<div class="divider"></div>

			<div class="flex flex-col w-full items-center">
				<div class="flex flex-row flex-wrap">
					<div
						v-for="tag in gig.tags"
						:key="tag"
						class="badge badge-lg badge-outline m-1"
					>
						{{ tag }}
					</div>
				</div>
			</div>

			<div class="divider"></div>
			<div
				class="flex max-w-[80%] justify-between w-full text-start mx-5"
			>
				<div class="child:m-0 child:p-1" v-html="gig.blog" />
			</div>
			<div class="divider mb-0"></div>

			<!-- show packages -->
			<h2>Gig Pricing</h2>
			<div class="w-full flex">
				<div
					class="card w-96 bg-base-100 shadow-xl mx-2"
					v-for="pack in gig.packages"
					:key="pack.id"
				>
					<div class="overflow-x-auto">
						<table class="table w-full">
							<tbody>
								<tr>
									<td>Name</td>
									<td>{{ pack.name }}</td>
								</tr>
								<tr>
									<th>Price</th>
									<td>{{ pack.price }}</td>
								</tr>
								<tr>
									<th>Revisions</th>
									<td>{{ pack.revisions }}</td>
								</tr>
								<tr>
									<th>Revisions</th>
									<td>{{ pack.deliveryTime }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="divider"></div>
			<div class="card-actions justify-center my-5">
				<button class="btn btn-primary">Contact Seller</button>
			</div>
		</div>
	</div>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";

export default {
	name: "gigView",
	components: {},
	data() {
		return {
			gig: {
				_id: "",
				ratings: [],
				sellerId: "",
				title: "",
				sellerName: "",
				sellerAvatar: "",
				sellerLevel: "silver",
				sellerCountry: "india",
				packages: [],

				thumbnail: "",

				images: [],
				blog: "",

				description: "",

				category: "",

				pricing: [],
				deliveryTime: "",
				deliveryFiles: [],
				chats: [],

				// timestamps
				createdAt: 0,
				updatedAt: 0,

				// status
				status: "",
				rating: 0,

				tags: [],
			},
		};
	},
	mounted() {
		this.getGig();
	},
	methods: {
		async getGig() {
			try {
				const id = this.$route.params.id;
				console.log(id);
				const result = await api.get(`/gigs/${id}`);

				// post fetch processing
				const gig = result.data.data;

				// loop and sum gig ratings using
				// for loop method

				let sum = 0;
				for (let x = 0; x < gig.ratings.length; x++) {
					sum += gig.ratings[x];
				}

				// get average
				const avg = sum / gig.ratings.length;

				// round to single decimal place
				const roundedAvg = Math.round(avg * 10) / 10;

				// set rating to rounded average
				gig.rating = roundedAvg;

				gig.blog = gig.blog[0];

				this.gig = gig;
			} catch (error) {
				handleCustomError(error);
			}
		},
	},
};
</script>
