<template>
	<page-component>
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
		<div class="container mx-auto">
			<div class="flex flex-wrap -m-1 md:-m-2">
				<div
					class="card m-5 bg-base-100 shadow rounded-none w-[300px] h-[400px]"
					v-for="gig in gigs"
					:key="gig._id"
					@click="gigClickHandler(gig._id)"
				>
					<!-- conditonal routing in routerlink -->
					<router-link :to="'gigs/' + gig._id">
						<figure class="mb-0 pb-2 mt-0 border-[1px]">
							<img :src="gig.thumbnail" />
						</figure>
						<div class="card-body">
							<div class="flex">
								<img
									:src="gig.sellerAvatar"
									class="rounded-full shadow w-[40px] h-[40px] p-2 m-0"
								/>
								<div class="flex flex-col mx-2 items-start">
									<p
										class="mx-2 my-0 flex items-center justify-center text-sm font-bold"
									>
										{{ gig.sellerName }}
									</p>
									<p
										class="mx-2 my-0 flex items-center justify-center text-xs"
									>
										Seller level
										<span class="font-bold">
											&nbsp;{{ gig.sellerLevel }}
										</span>
									</p>
								</div>
							</div>

							<div class="card-title">
								<div class="badge badge-secondary">
									{{ gig.rating }}
									<font-awesome-icon
										v-bind:icon="['fas', 'star']"
									></font-awesome-icon>
								</div>
							</div>
							<div class="card-actions">
								<p class="text-start m-0 text-sm">
									{{ gig.title }}
								</p>
								<span
									class="badge badge-outline"
									v-for="tag in gig.tags"
									:key="tag"
								>
									{{ tag }}
								</span>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</page-component>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";

const processGigs = (data) => {
	const gigs = data.map((gig) => {
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

		return gig;
	});

	return gigs;
};

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
	components: {},
	data: function () {
		return {
			gigs: [],
			query: "",
		};
	},

	mounted() {
		// get params from input

		const { query } = this.$route.query;

		if (typeof query === "string" && query) {
			this.query = query;
			this.getGigs();
			return;
		}

		this.query = "web development";
		this.getGigs();
	},
	computed: {},
	methods: {
		async getGigs() {
			try {
				const tempQuery = fixQuery(this.query);
				const result = await api.get(`/gigs/search?query=${tempQuery}`);

				// post fetch processing
				this.gigs = processGigs(result.data.data);

				// set gigs to store
				this.$store.commit("setGigs", this.gigs);
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
