<template>
	<div class="flex flex-col items-center">
		<div class="flex items-center justify-center max-w-xl">
			<seller-card
				:username="username"
				:avatar="avatar"
				:firstname="firstname"
				:lastname="lastname"
				:rank="rank"
				:gigCount="gigCount"
				:gigViews="gigViews"
				:location="location"
				:job="job"
				:education="education"
				:description="description"
				:socials="socials"
			>
			</seller-card>
		</div>

		<div class="divider my-[50px] divide-x-[5px]">
			Gigs
		</div>

		<div class="flex flex-row flex-wrap gap-10">
			<div v-for="gig in gigs" :key="gig._id">
				<gig-card
					:sellerName="username"
					:sellerVerified="sellerVerified"
					:gigVerified="gig.verfied"
					:gigTitle="gig.title"
					:gigTags="gig.tags"
					:gigId="gig._id"
					:images="gig.images"
					:route="{ name: 'gigView', params: { id: gig._id } }"
				>
				</gig-card>
			</div>
		</div>
	</div>
</template>

<script>
import sellerCardVue from "@/components/sellerCard.vue";
import gigCardVue from "@/components/gigCard.vue";
import { socialDefault } from "@/data/default";
import api from "@/api";

export default {
	name: "sellerView",
	components: {
		"seller-card": sellerCardVue,
		"gig-card": gigCardVue,
	},
	data: () => ({
		gigs: [],
		username: "",
		avatar: {
			preview: "",
			secureUrl: "",
			publidId: "",
		},
		socials: socialDefault,
		firstname: "",
		lastname: "",
		rank: "",
		gigCount: 0,
		gigViews: 0,
		location: "",
		job: "",
		education: "",
		description: "",
		sellerVerified: false,
	}),
	async mounted() {
		const username = this.$route.params.username;
		const result = await api.get("/seller/" + username);

		const seller = result.data.data.user;
		const gigs = result.data.data.gigs;

		// bind gigs to vue data
		this.gigs = gigs;

		// bind data to vue data
		this.username = seller.username;
		this.avatar = seller.avatar;
		this.firstname = seller.firstname;
		this.lastname = seller.lastname;
		this.rank = seller.rank;
		this.gigCount = seller.gigCount;
		this.gigViews = seller.gigViews;
		this.location = seller.location;
		this.socials = seller.socials;
		this.job = seller.job;
		this.education = seller.education;
		this.description = seller.description;
		this.sellerVerified =
			seller.verification.verificationStatus === "verified";
	},
};
</script>
