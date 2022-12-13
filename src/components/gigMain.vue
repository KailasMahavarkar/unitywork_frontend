<template>
	<fragment>
		<div class="flex flex-col items-end w-full h-full" v-if="step !== 5">
			<button
				class="btn btn-primary btn-sm m-2"
				@click="() => (showPreview = !showPreview)"
			>
				show preview
			</button>
		</div>
		<div v-if="showPreview || step === 5">
			<gig-page
				:username="user.username"
				:gigBlog="gigBlog"
				:gigCategory="gigCategory"
				:gigTitle="gigTitle"
				:gigPricings="gigPricings"
				:gigTags="gigTags"
				:socials="this.user.socials"
			></gig-page>
		</div>
		<gigStepComponent
			class="my-5"
			:step="step"
			:showSteps="!showPreview"
			:isHeaderValid="isHeaderValid"
			:isBodyValid="isBodyValid"
			:isPricingValid="isPricingValid"
			:isImagesValid="isImagesValid"
		>
			<!-- HEADER -->
			<gig-header
				v-if="step === 1"
				:gigTags.sync="gigTags"
				:gigTitle.sync="gigTitle"
				:gigCategory.sync="gigCategory"
				:isHeaderValid.sync="isHeaderValid"
			></gig-header>

			<!-- BLOG(BODY) -->
			<div
				v-if="step === 2"
				class="flex flex-col w-full items-center mt-[50px]"
			>
				<div class="flex flex-col w-[90%]">
					<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
						Gig Body
					</h2>
					<vue-editor
						class="min-h-[500px] outline-none"
						v-model.trim="gigBlog"
						:editorToolbar="editorToolbar"
					>
					</vue-editor>
				</div>
			</div>

			<!-- PRICINGS -->
			<gig-pricings
				v-if="step === 3"
				:isPricingValid.sync="isPricingValid"
				:gigPricings.sync="gigPricings"
			></gig-pricings>

			<!-- IMAGES -->
			<gig-images
				v-if="step === 4"
				:isImagesValid.sync="isImagesValid"
				:seller-name="user.username"
				:gigTags.sync="gigTags"
				:gigTitle.sync="gigTitle"
				:sellerAvatar="user.avatar.secureUrl"
				:images.sync="images"
			>
			</gig-images>

			<!-- CONTROLS -->
			<div
				class="flex items-center justify-end p-5 w-full bg-base-200 mt-[50px]"
			>
				<button
					class="btn btn-primary max-w-md"
					type="button"
					name="button"
					@click="previousWizard"
					:disabled="step <= 1"
				>
					Prev
				</button>

				<button
					class="btn btn-primary max-w-md mx-2"
					type="button"
					name="button"
					:disabled="step >= 5"
					@click="nextWizard"
				>
					Next
				</button>

				<button
					class="btn btn-wide btn-success max-w-md mx-2"
					type="button"
					name="button"
					v-if="step === 5"
					@click="submitGig"
				>
					{{ mode === "edit" ? "Update" : "Create" }} Gig
				</button>
			</div>
		</gigStepComponent>
	</fragment>
</template>

<script>
import gigPage from "@/components/gigPage.vue";
import { VueEditor } from "vue2-editor";
import customToast from "@/toast";
import gigPricingVue from "@/components/gigPricing.vue";
import gigHeaderVue from "@/components/gigHeader.vue";
import gigImagesVue from "@/components/gigImages.vue";
import gigStepComponent from "./gigStepComponent.vue";
import { mapState } from "vuex";
import api from "@/api";
import { handleCustomError } from "@/helper";

const defaultPricings = {
	basic: {
		price: 5,
		deliveryTime: "1 day",
		revisions: 1,
		valid: true,
	},
	standard: {
		price: 5,
		deliveryTime: "3 days",
		revisions: 0,
		valid: false,
	},
	premium: {
		price: 80,
		deliveryTime: "7 days",
		revisions: 0,
		valid: false,
	},
};

// const defaultImages = {

// };

export default {
	name: "gigMain",
	components: {
		gigStepComponent,
		"gig-page": gigPage,
		"gig-pricings": gigPricingVue,
		"gig-header": gigHeaderVue,
		"gig-images": gigImagesVue,
		"vue-editor": VueEditor,
	},
	watch: {
		gigBlog: {
			handler() {
				this.isBodyValid = this.gigBlog.length > 0;
			},
			deep: true,
		},
		images: {
			handler() {
				console.log("images updated", this.images);
			},
		},
	},
	computed: {
		...mapState(["user"]),
		avatar() {
			return this.user.avatar;
		},
		isGigValid() {
			return (
				this.isHeaderValid &&
				this.isBodyValid &&
				this.isPricingValid &&
				this.isImagesValid
			);
		},
	},
	props: {
		mode: {
			type: String,
			default: "create",
		},
	},
	data() {
		return {
			// state
			gigTitle: "",
			gigCategory: "",
			gigTags: [],
			gigBlog: "",
			gigId: "",
			gigPricings: defaultPricings,
			images: {
				image1: {
					publicId: "",
					secureUrl: "",
					preview: "",
				},
				image2: {
					publicId: "",
					secureUrl: "",
					preview: "",
				},
				image3: {
					publicId: "",
					secureUrl: "",
					preview: "",
				},
			},

			// checks
			showPreview: false,
			isHeaderValid: false,
			isBodyValid: false,
			isPricingValid: true,
			isImagesValid: false,
			step: 1,

			// dummy gig state
			dummy: {
				gigTitle: `An Amazing Gig by ${this.$store.state.user.username}`,
				gigTags: ["tag1", "tag2", "tag3"],
				gigCategory: "website-development",
				gigBlog: `<h2>About This Gig</h2><p><strong style="background-color: rgb(255, 236, 209);">Each project is unique, contact me before your order.</strong><strong>&nbsp;</strong>Thanks ;)</p><p><br></p><p><strong>What is included in this offer? (All What You Need)</strong></p><p><br></p><p>-Wordpress Website built with Oxygen Builder</p><p>-<span style="background-color: rgb(255, 236, 209);">Web Design 100% responsive</span></p><p>-Speed Optimization</p><p>-Plugins Lifetime Updates</p><p>-SEO</p><p>-<span style="background-color: rgb(255, 236, 209);">Unlimited Revisions</span></p><p><br></p><p><strong>Are you ready for your new Wordpress Website built with Oxygen Builder?</strong></p><p><br></p><p>I only need some information of your business: Logo, Color Palette, Samples (if you have them)</p><p><br></p><p><strong>Information that you must know:</strong></p><p><br></p><p>-Video calls will be in German or English.</p><p>-Pages or templates must have a maximum of&nbsp;4 sections.</p><p>-Your new Wordpress Website will be built with Oxygen Builder.</p><p><br></p><p><strong>What is Oxygen Builder?</strong></p><p>Oxygen Builder is a tool that enables you to build entire WordPress Websites. It is not a page builder or a theme, but a hybrid product that enables you to have&nbsp;<span style="background-color: rgb(255, 236, 209);">more control over what you create.</span></p><p><br></p><p><strong>Why I build all my Wordpress Websites only with Oxygen Builder?</strong></p><p>Because Oxygen Builder allows me to create any kind of design and functionalities. Also, using this builder,&nbsp;<span style="background-color: rgb(255, 236, 209);">your wordpress site will be extremely fast.</span></p><p><br></p><p>For an E-Commerce I use: Wordpress + WooCommerce + Oxygen Builder + Extra Plugins</p><p><br></p><p><strong><em>Looking forward to your message ;)</em></strong></p>`,
				gigPricings: defaultPricings,
			},

			editorToolbar: [
				["bold", "italic", "underline"],
				[{ list: "ordered" }, { list: "bullet" }],
				// select
				[{ header: [1, 2, 3, 4, 5, 6] }],

				// fontsize
				[{ size: ["small", "normal", "large", "huge"] }],

				// add indent
				[{ indent: "-1" }, { indent: "+1" }],

				// add direction
				[{ direction: "rtl" }],

				// remove styles
				["blockquote"],

				["clean"],
			],
		};
	},

	methods: {
		gigValidator() {
			if (!this.isHeaderValid) {
				this.step = 1;
				customToast({
					message: "Please enter title, select category and tags",
					icon: "error",
				});
			} else if (!this.isBodyValid) {
				this.step = 2;
				customToast({
					message: "Please enter blog",
					icon: "error",
				});
			} else if (!this.isPricingValid) {
				this.step = 3;
				customToast({
					message: "Please enter valid pricing",
					icon: "error",
				});
			} else if (!this.isImagesValid) {
				this.step = 4;
				customToast({
					message: "Please upload at least one image",
					icon: "error",
				});
			} else {
				return true;
			}
		},

		async submitGig() {
			const validationResult = this.gigValidator();
			if (!validationResult) {
				return;
			}

			// remove preview from images
			this.images["image1"]["preview"] = undefined;
			this.images["image2"]["preview"] = undefined;
			this.images["image3"]["preview"] = undefined;

			const gig = {
				title: this.gigTitle,
				blog: this.gigBlog.slice(0, 2000),
				tags: this.gigTags,
				category: this.gigCategory,
				pricings: this.gigPricings,
				images: this.images,
			};

			if (this.mode === "create") {
				try {
					const result = await api.post("/seller/gig", gig);
					if (result.status === 200) {
						const gigData = result.data.data;
						if (gigData) {
							// add gig to vuex
							this.$store.commit("addGig", gigData);
						}
						// redirect to seller gigs page
						this.$router.push({
							name: "sellerDashboardView",
						});
					}
				} catch (error) {
					handleCustomError(error);
				}
			}
			// mode is edit
			else {
				try {
					const result = await api.patch(`/seller/gig/${this.gigId}`, gig);
					if (result.status === 200) {
						this.$router.push({
							name: "sellerDashboardView",
						});
					}
				} catch (error) {
					handleCustomError(error);
				}
			}
		},

		previousWizard() {
			this.step -= 1;
		},
		nextWizard() {
			this.step += 1;
		},
	},

	async mounted() {
		if (this.mode === "edit") {
			const user = this.$store.state.user;
			const target = this.$route?.params?.gigId;
			const findResult =
				user.gigs?.find((gig) => gig === target) !== undefined;

			// if the gig id is not found in the user's gigs
			if (!findResult) {
				this.$router.push({ name: "sellerDashboardView" });
			}

			const result = await api.get(`/gigs/${target}`);
			const gig = result.data.data;

			this.gigTitle = gig.title;
			this.gigBlog = gig.blog;
			this.gigTags = gig.tags;
			this.gigCategory = gig.category;
			this.gigPricings = gig.pricings;
			this.images = gig.images;
			this.gigId = target;

			console.log("result -->", result);
		}
	},
};
</script>
