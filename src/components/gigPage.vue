<template>
	<div
		class="flex items-start mt-5 justify-center bg-white dark:bg-gray-800 shadow-xl rounded-md min-h-screen py-5"
	>
		<div class="flex flex-col w-full max-w-[90%]">
			<div class="flex flex-col items-center w-full">
				<div class="flex flex-col">
					<img
						:src="getAvatar"
						class="rounded-full m-0 p-0 shadow w-[150px] h-[150px]"
					/>
					<p
						class="mx-2 my-0 flex items-center justify-center text-lg text-left font-bold"
					>
						{{ fullname }}
					</p>
				</div>
			</div>

			<h1 class="m-2 mt-5">
				{{ gigTitle }}
			</h1>

			<div class="divider mx-[50px]" v-if="gigTagsArray.length > 0"></div>

			<!-- tags -->
			<div class="flex flex-col w-full items-center">
				<div class="flex flex-row flex-wrap">
					<div
						v-for="(tag, index) in gigTagsArray"
						:key="tag"
						class="badge badge-lg badge-outline m-1"
					>
						{{ tag || "tag " + index }}
					</div>
				</div>
			</div>

			<div class="divider mx-[50px]"></div>
			<div
				class="flex max-w-[80%] justify-between w-full text-start mx-5"
			>
				<div
					class="child:m-0 child:p-1"
					v-if="gigBlog"
					v-html="gigBlog"
				></div>
			</div>
			<div class="divider mx-[50px]"></div>

			<!-- show packages -->
			<h2>Gig Pricing</h2>
			<div class="w-full flex justify-center">
				<fragment v-for="(pack, key) in pricings" :key="key">
					<div
						v-if="pack.valid"
						class="card w-96 bg-base-100 shadow-xl mx-2"
					>
						<div class="overflow-x-auto">
							<table class="table w-full text-md">
								<tbody>
									<tr>
										<th
											:colspan="2"
											class="text-2xl text-center"
											:class="{
												'bg-yellow-400 ':
													String(key) === 'basic',
												'bg-green-400 ':
													String(key) === 'standard',
												'bg-blue-400 ':
													String(key) === 'premium',
											}"
										>
											{{ key }}
										</th>
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
				</fragment>
			</div>
			<div class="divider"></div>

			<!-- socials -->
			<div class="card-actions justify-center my-5">
				<social-card :socials="socials"> </social-card>
			</div>

			<!-- <div class="card-actions justify-center my-5">

				<a
					class="btn btn-success btn-outline"
					:href="`mailto:${'kai@gmail.com'}`"
					data-rel="external"
				>
					{{ "kai@gmail.com" }}
				</a>
			</div> -->
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import SocialCard from "./socialCard.vue";

export default {
	name: "GigViewCard",
	components: { SocialCard },
	data() {
		return {
			sound: "",
			breadcrumbs: [
				{
					title: "Home",
					link: "/",
					icon: "home",
				},
				{
					title: "Gigs",
					link: "/gigs",
					icon: "bars",
				},
				{
					title: "Gig",
					link: "/gigs/category",
					icon: "star",
				},
				{
					title: "Gig View",
					link: "/gigs/category/gig",
					icon: "user",
				},
			],
		};
	},
	computed: {
		...mapGetters(["getUser"]),
		gigPricingArray() {
			return this.gigPricings;
		},
		gigTagsArray() {
			return this.gigTags;
		},
		pricings() {
			return this.gigPricings;
		},

		getAvatar() {
			return `https://avatars.dicebear.com/api/identicon/${this.username}.svg`;
		},
	},
	props: {
		username: {
			type: String,
			default: "",
		},
		fullname: {
			type: String,
			default: "",
		},

		gigTitle: {
			type: String,
			default: "",
		},
		gigTags: {
			type: Array,
			default: () => ["tag 1", "tag 2", "tag 3", "tag 4", "tag 5"],
		},
		gigBlog: {
			type: String,
			default: "",
		},
		gigPricings: {
			type: Object,
			default: () => {},
		},
		gigCategory: {
			type: String,
			default: "Category",
		},

		socials: {
			type: Object,
			default: () => {},
		},
	},
	mounted() {},
};
</script>
