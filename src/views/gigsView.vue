<template>
	<page-component>
		<h1
			class="text-3xl lg:text-3xl xl:text-5xl font-bolder text-center text-gray-700 dark:text-gray-200"
		>
			Search Gigs
		</h1>
		<div class="flex items-center justify-center w-full">
			<div class="flex form-control w-full max-w-[70%] my-5">
				<div class="input-group">
					<input
						v-model="query"
						v-debounce:300ms="getGigs"
						type="text"
						placeholder="Search gigs by keywords like website, nextjs, vue etc"
						class="input input-bordered w-full"
					/>
					<button class="btn btn-square">
						<font-awesome-icon :icon="['fas', 'search']">
						</font-awesome-icon>
					</button>
				</div>
			</div>
		</div>

		<div class="divider mx-[10rem]"></div>
		<div class="container mx-auto">
			<div class="flex flex-wrap -m-1 md:-m-2">
				<div
					v-for="gig in gigs"
					:key="gig._id"
					class="flex flex-col w-full md:w-1/2 lg:w-1/3 p-1 md:p-2"
				>
					<gig-card
						:sellerName="gig.sellerUsername"
						:sellerVerified="gig.verified"
						:gigVerified="gig.verified"
						:gigTitle="gig.title"
						:gigTags="gig.tags"
						:gigId="gig._id"
						:images="gig.images"
					>
					</gig-card>
				</div>
			</div>
		</div>
		<div class="divider mx-[10rem]"></div>
	</page-component>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
import gigCardVue from "@/components/gigCard.vue";

const fixQuery = (query) => {
	let tempQuery = "";

	// check if query is single word
	tempQuery = query.trim().replaceAll(" ", "+").replaceAll("%20", "+");

	// if query ends with '+'
	if (query.endsWith("+")) {
		tempQuery = query.slice(0, -1);
	}

	return tempQuery;
};

export default {
	name: "GigsView",
	components: {
		"gig-card": gigCardVue,
	},
	data: function () {
		return {
			gigs: [],
			query: "",
		};
	},

	async mounted() {
		// get params from input
		let { query } = this.$route.query;

		if (!query) {
			query = "web development";
		}

		await this.getGigs();
	},
	computed: {},
	methods: {
		async getGigs() {
			const fixedQuery = fixQuery(this.query);
			const isQuery = fixedQuery !== "";

			try {
				const URL = isQuery
					? `/gigs/search?query=${fixedQuery}`
					: `/gigs`;
				const result = await api.get(URL);

				this.gigs = result.data.data;

				// set gigs to store
				// 	this.$store.commit("setGigs", this.gigs);
			} catch (error) {
				handleCustomError(error);
			}
		},

		gigClickHandler(id) {
			this.$router.push(`/gigs/${id}`);
		},
	},
};
</script>
