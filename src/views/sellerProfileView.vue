<template>
	<div class="flex flex-col min-h-[800px] items-center justify-center mt-5">
		<section class="pt-16">
			<div
				class="w-full md:w-9/12 lg:w-5/12 px-4 mx-auto dark:border-gray-700 dark:border-[1px]"
			>
				<seller-card
					:avatar="seller.avatar"
					:name="seller.name"
					:description="seller.description"
					:location="seller.location"
					:education="seller.education"
					:job="seller.job"
                    :likes="seller.likes"
                    :gig-count="seller.gigCount"
                    :gig-views="seller.gigViews"
				>
				</seller-card>
			</div>
		</section>

		<section class="py-6">
			<h1 class="divider h-[2rem] z-30 min-w-[800px] mt-20">
				Seller Gigs
			</h1>
		</section>

		<section class="py-6">
			<div class="w-full px-4 mx-auto">
				<div
					class="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2"
				>
					<fragment v-for="gig in gigs" :key="gig.gigId">
						<gig-card
							:seller-avatar="gig.sellerAvatar"
							:seller-level="gig.sellerLevel"
							:seller-name="gig.sellerName"
							:gig-title="gig.gigTitle"
							:gig-price="gig.gigPrice"
							:gig-rating="gig.gigRating"
							:gig-thumbnail="gig.gigThumbnail"
							:gig-tags="gig.gigTags"
							:gig-id="gig.gigId"
						>
						</gig-card>
					</fragment>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import gigCardVue from "@/components/gigCard.vue";
import sellerCardVue from "@/components/sellerCard.vue";
export default {
	name: "sellerView",
	components: {
		"gig-card": gigCardVue,
		"seller-card": sellerCardVue,
	},
	data() {
		return {
			seller: {
				name: "Jenna Stones",
				location: "Los Angeles, California",
				job: "Solution Manager - Creative Tim Officer",
				avatar: "https://i.pinimg.com/564x/a1/c1/36/a1c136553e3aeac8643d77a05d08a5fd.jpg",
				education: "University of Computer Science",
				friends: 22,
				likes: 100,
				photos: 10,
				gigCount: 10,
				gigViews: 13550,
				description:
					"An artist of considerable range, Jenna the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.",
			},
			gigs: [
				{
					gigId: "123456",
					sellerLevel: "5",
					sellerName: "John Doe",
					sellerAvatar:
						"https://source.unsplash.com/random/300x300/?1",
					gigTitle:
						"I will create a professional logo for your business",
					gigThumbnail:
						"https://source.unsplash.com/random/300x200/?1",
					gigPrice: "5",
					gigRating: "4.5",
					gigTags: ["logo", "branding", "business"],
				},
			],
		};
	},
	created() {
		this.getSeller();
	},
	methods: {
		async getSeller() {
			// console.log(this.$route.params.username);
			// try {
			//     const result = await api.get(`/sellers/${this.$route.params.username}`);
			//     this.seller = result.data.data;
			// } catch (error) {
			//     handleCustomError(error);
			// }
			// const response = await fetch("http://localhost:5000/sellers");
			// const data = await response.json();
			// this.seller = data;
		},
	},
};
</script>
