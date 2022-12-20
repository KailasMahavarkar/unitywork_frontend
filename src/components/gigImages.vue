<template>
	<div class="flex items-center flex-col w-full mb-0 p-10 m-auto">
		<div class="flex max-w-[300px] items-center justify-center">
			<gig-card
				:sellerName="sellerName"
				:seller-avatar="sellerAvatar"
				:sellerVerified="isSellerVerifed"
				:gig-title="gigTitle"
				:gig-tags="gigTags"
				:gig-id="gigId"
				:images="images"
				:route="{}"
				:mode="mode"
			>
			</gig-card>
		</div>

		<div class="flex flex-wrap my-5">
			<file-upload class="p-5" :image.sync="localImages.image1">
				Gig Image 1
			</file-upload>

			<file-upload class="p-5" :image.sync="localImages.image2">
				Gig Image 2
			</file-upload>

			<file-upload class="p-5" :image.sync="localImages.image3">
				Gig Image 3
			</file-upload>
		</div>

		<p class="text-gray-400">
			Note: You can upload upto 3 images for your gig, you have to upload
			atleast one image, recommended size is
			<span class="text-green-500"> 300(width) x 200(height) </span>
			pixels.
		</p>
	</div>
</template>

<script>
import fileuploadComponentVue from "./fileuploadComponent.vue";
import gigCardVue from "./gigCard.vue";

export default {
	name: "gigImages",
	components: {
		"file-upload": fileuploadComponentVue,
		"gig-card": gigCardVue,
	},
	props: {
		sellerAvatar: {
			type: String,
			default: "",
		},

		sellerName: {
			type: String,
			default: "",
		},

		gigTitle: {
			type: String,
			default: "",
		},
		gigTags: {
			type: Array,
			default: () => [],
		},
		gigId: {
			type: String,
			default: "",
		},

		images: {
			type: Object,
			required: false,
			default: () => ({}),
		},

		mode: {
			type: String,
			required: false,
			default: 'normal'
		}
	},
	computed: {
		isSellerVerifed() {
			const user = this.$store.state.user;
			return user.verification.verificationStatus === "verified";
		},
	},
	data: () => ({
		localImages: {
			image1: {
				secureUrl: "",
				publicId: "",
				preview: "",
			},
			image2: {
				secureUrl: "",
				publicId: "",
				preview: "",
			},
			image3: {
				secureUrl: "",
				publicId: "",
				preview: "",
			},
		},
	}),

	watch: {
		localImages: {
			handler(value) {
				const isImagesValid = Object.values(value).some(
					(image) => image.secureUrl !== ""
				);
				this.$emit("update:images", value);
				this.$emit("update:isImagesValid", isImagesValid);
			},
			deep: true,
		},
	},

	mounted() {
		this.localImages = this.images;
	},
};
</script>
