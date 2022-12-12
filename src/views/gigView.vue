<template>
	<page-component>
		<!-- create a tailwind page where you can view single gig  -->
		<gig-view-card :gig="gig"></gig-view-card>
	</page-component>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
import gigViewCard from "@/components/gigViewCard.vue";

export default {
	name: "gigView",
	components: {
		"gig-view-card": gigViewCard,
	},
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

				this.gig = gig;
			} catch (error) {
				handleCustomError(error);
			}
		},
	},
};
</script>
