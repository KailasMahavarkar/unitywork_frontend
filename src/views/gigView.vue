<template>
	<!-- create a tailwind page where you can view single gig  -->
	<gig-page
		:avatar="avatar"
		:username="sellerUsername"
		:gigTitle="gigTitle"
		:gigTags="gigTags"
		:gigBlog="gigBlog"
		:gigPricings="gigPricings"
		:gigImages="gigImages"
		:socials="socials"
		:gigCategory="gigCategory"
		:sellerCountry="sellerCountry"
	></gig-page>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
import gigPage from "@/components/gigPage.vue";
import { socialDefault } from "@/data/default";

export default {
	name: "gigView",
	components: {
		"gig-page": gigPage,
	},
	data() {
		return {
			avatar: {},
			gigBlog: "",
			gigCategory: "",
			gigImages: {},
			gigPricings: {},
			sellerCountry: "",
			sellerUsername: "",
			status: "",
			gigTags: [],
			gigTitle: "",
			gigVerified: "",
			verification: "",
			socials: socialDefault,
		};
	},
	mounted() {
		this.getGig();
	},
	methods: {
		async getGig() {
			try {
				const id = this.$route.params.id || this.$route.params.gigId;
				const result = await api.get(`/gigs/${id}`);

				// post fetch processing
				const gig = result.data.data;

				this.avatar = gig.avatar;
				this.gigBlog = gig.blog;
				this.gigCategory = gig.category;
				this.gigImages = gig.images;
				this.gigPricings = gig.pricings;
				this.sellerCountry = gig.sellerCountry;
				this.sellerUsername = gig.sellerUsername;
				this.status = gig.status;
				this.gigTags = gig.tags;
				this.gigTitle = gig.title;
				this.gigVerified = gig.verified;
				this.verification = gig.verification;

				const socialURL = `/seller/${gig.sellerUsername}/socials`;
				const socialResult = await api.get(socialURL);
				const socials = socialResult.data.data.socials;

				this.socials = socials;
			} catch (error) {
				handleCustomError(error);
			}
		},
	},
};
</script>
