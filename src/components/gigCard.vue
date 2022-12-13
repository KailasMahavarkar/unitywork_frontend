<template>
	<div
		class="card shadow dark:border-gray-700 dark:border-[1px] max-w-[300px]"
	>
		<image-slider :images="getImageArray"> </image-slider>

		<div class="card-body">
			<div class="flex">
				<!-- seller avatar -->
				<img
					:src="getSellerAvatar"
					class="rounded-full shadow w-[80px] h-[80px] p-1 m-0"
				/>
				<div class="flex w-full m-auto justify-end">
					<div class="flex flex-col items-end justify-end">
						<!-- seller name -->
						<div class="font-bold text-sm my-1">
							<span
								class="text-info child:mx-2"
								:class="
									gigVerified ? 'text-success' : 'text-error'
								"
							>
								Gig Verified
								<font-awesome-icon
									:icon="
										gigVerified
											? 'fa-solid fa-check'
											: 'fa-solid fa-circle-xmark'
									"
								/>
							</span>
						</div>
						<!-- seller level -->
						<div class="font-bold text-sm my-1">
							<span class="text-info child:mx-2">
								Seller Verified
								<font-awesome-icon
									icon="fa-solid fa-circle-check"
								/>
							</span>
						</div>
					</div>
				</div>
			</div>

			<div class="flex font-extrabold">
				{{ sellerName }}
			</div>

			<!-- title and tags -->
			<div class="card-actions">
				<p class="flex flex-wrap text-start m-0 text-md line-clamp-3">
					{{ gigTitle || "gig title" }}
				</p>
				<span
					class="badge badge-outline"
					v-for="(item, index) in gigTags"
					:key="index"
				>
					{{ item }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import imageSliderVue from "./imageSlider.vue";
const placeholderMaker = (text) => {
	return `https://via.placeholder.com/300x200/cccccc/?text=${text}`;
};
export default {
	name: "gigCard",
	components: {
		"image-slider": imageSliderVue,
	},

	props: {
		images: {
			type: Object,
			required: true,
			default: () => {},
		},
		sellerName: {
			type: String,
			required: true,
		},

		sellerVerified: {
			type: Boolean,
			required: false,
			defualt: false,
		},

		// gig params
		gigVerified: {
			type: Boolean,
			required: false,
			defualt: false,
		},
		gigId: {
			type: String,
			required: true,
		},
		gigTitle: {
			type: String,
			required: true,
		},
		gigTags: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			imageIndexes: [
				{
					prev: "#image3",
					next: "#image2",
					name: "image1",
					placeholder: placeholderMaker("300 x 200 thumbnail"),
				},
				{
					prev: "#image1",
					next: "#image3",
					name: "image2",
					placeholder: placeholderMaker("300 x 200 image 2"),
				},
				{
					prev: "#image2",
					next: "#image1",
					name: "image3",
					placeholder: placeholderMaker("300 x 200 image 3"),
				},
			],
		};
	},
	computed: {
		getSellerAvatar() {
			if (!this.sellerAvatar) {
				const identicon = `https://avatars.dicebear.com/api/identicon/${this.sellerName}.svg`;
				return identicon;
			} else {
				return this.sellerAvatar;
			}
		},
		getImageArray() {
			const imageArray = [];

			// each image has secureUrl, preview and publicId
			// if secureUrl is not available, use preview
			// if preview is not available, use placeholder

			// this.images is an object with image1, image2, image3 as keys
			// each key has secureUrl, preview and publicId

			for (const [key, value] of Object.entries(this.images)) {
				if (value.secureUrl) {
					imageArray.push(value.secureUrl);
				} else if (value.preview) {
					imageArray.push(value.preview);
				} else {
					imageArray.push(placeholderMaker(`300 x 200 ${key}`));
				}
			}

			return imageArray;
		},
	},
	mounted() {},

	methods: {},
};
</script>
