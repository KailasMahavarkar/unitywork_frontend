<template>
	<div class="flex form-control w-full max-w-[70%] my-5">
		<div class="input-group">
			<input
				v-model="query"
				v-debounce:300ms="searchFunction"
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

export default {
	name: "searchComponent",
	data() {
		return {
			gigs: [],
			query: "",
		};
	},
	mounted() {
		this.getGigs();
	},
	methods: {
		async getGigs() {
			try {
				const result = await api.get("/gigs");
				// post fetch processing
				this.gigs = processGigs(result.data.data);

				// set gigs to store
				this.$store.commit("setGigs", this.gigs);
			} catch (error) {
				handleCustomError(error);
			}
		},

		async searchFunction() {
			// if query is empty, get all gigs
			if (this.query === "") {
				this.getGigs();
				return;
			}

			let tempQuery = "";

			// check if query is single word
			tempQuery = this.query.trim().replaceAll(" ", "+");

			// if query ends with '+'
			if (this.query.endsWith("+")) {
				tempQuery = this.query.slice(0, -1);
			}

			try {
				const result = await api.get(`/search?query=${tempQuery}`);
				// post fetch processing
				this.gigs = processGigs(result.data.data);

                // return gig to parent component
                this.$emit("gigs", this.gigs);

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
