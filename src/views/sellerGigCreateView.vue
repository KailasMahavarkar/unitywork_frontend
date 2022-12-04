<template>
	<div class="flex flex-col w-full shadow-md">
		<!-- STEPS -->
		<ul class="steps">
			<li
				v-bind:data-content="isTitleValid ? '✓' : 'x'"
				class="step step-neutral"
				v-bind:class="{
					'step-warning font-extrabold': step === 1,
					'step-success': isTitleValid,
				}"
			>
				Create Title
			</li>
			<li
				v-bind:data-content="isBodyValid ? '✓' : 'x'"
				class="step step-neutral"
				v-bind:class="{
					'step-warning font-extrabold': step === 2,
					'step-success': isBodyValid,
				}"
			>
				Create Body
			</li>
			<li
				v-bind:data-content="isPricingValid ? '✓' : 'x'"
				class="step step-neutral"
				v-bind:class="{
					'step-warning font-extrabold': step === 3,
					'step-success': isPricingValid,
				}"
			>
				Create Pricing
			</li>
			<li
				v-bind:data-content="isImagesValid ? '✓' : 'x'"
				class="step step-neutral"
				v-bind:class="{
					'step-warning font-extrabold': step === 4,
					'step-success': step === 4,
				}"
			>
				Uplaod Images
			</li>
			<li
				v-bind:data-content="step === 5 ? '✓' : 'x'"
				class="step step-neutral"
				v-bind:class="{
					'step-warning font-extrabold': step === 5,
					'step-success': step === 5,
				}"
			>
				Preview
			</li>
			<li
				v-bind:data-content="step === 5 || step === 6 ? '✓' : 'x'"
				class="step step-neutral"
				v-bind:class="{
					'step-warning font-extrabold': step === 5 || step === 6,
					'step-success': step === 5 || step === 6,
				}"
			>
				Publish
			</li>
		</ul>

		<!-- TITLE -->
		<div
			v-if="step === 1"
			class="flex flex-col w-full items-center mt-[50px]"
		>
			<div class="flex flex-col w-[90%]">
				<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
					Gig Title
				</h2>
				<div class="flex">
					<input
						type="text"
						id="title"
						v-model="title"
						class="input rounded-sm w-full shadow flex-1 font-bold dark:input-bordered"
					/>
				</div>
			</div>

			<div class="flex flex-col w-[90%] mt-10">
				<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
					Gig Category
				</h2>
				<div class="flex">
					<select
						v-model="category"
						class="input rounded-sm w-full shadow flex-1 font-bold dark:select-bordered"
					>
						<!-- default  -->

						<option selected>Select Category</option>

						<option v-for="category in categories" :key="category">
							{{ category }}
						</option>
					</select>
				</div>
			</div>

			<div class="flex flex-col w-[90%] mt-10">
				<!-- loop through tags -->

				<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
					Gig Tags
				</h2>

				<div class="flex flex-wrap">
					<!-- preview tags -->
					<div
						v-for="tag in tags"
						:key="tag"
						class="btn btn-outline no-animation mx-2"
					>
						{{ tag }}

						<!-- remove -->
						<button
							class="btn btn-sm btn-warning btn-circle mx-2"
							@click="removeTag(tag)"
						>
							x
						</button>
					</div>

					<!-- add tag -->
					<div
						class="flex items-center justify-center m-1"
						v-if="tags.length < 5"
					>
						<input
							type="text"
							id="tag"
							v-model="tag"
							class="input rounded-sm w-full shadow flex-1 font-bold dark:input-bordered"
						/>

						<div
							class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
							@click="addTag"
						>
							<span class="text-gray-500 dark:text-gray-300"
								>+</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- BODY -->
		<div
			v-if="step === 2"
			class="flex flex-col w-full items-center mt-[50px]"
		>
			<div class="flex flex-col w-[90%]">
				<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
					Gig Body
				</h2>
				<vue-editor class="h-full" v-model="htmlForEditor">
				</vue-editor>
			</div>
		</div>

		<!-- PRICING -->
		<pricing-component
			:step="step"
			v-if="step === 3"
			:packages="packages"
		></pricing-component>

		<!-- IMAGES -->
		<div
			v-if="step === 4"
			class="flex flex-col w-full items-center mt-[50px]"
		>
			<div class="flex flex-col min-w-[90%]">
				<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
					Gig Images
				</h2>

				<!-- upload and preview images -->
				<!-- grab and set order -->
				<div class="flex flex-col w-full">
					<div class="flex flex-col w-full">
						<div class="flex w-full">
							<div
								v-for="(image, index) in images"
								:key="index"
								class="flex flex-col mx-2"
							>
								<img
									:src="image"
									class="w-[300px] h-[200px] m-0 p-0 rounded-md"
								/>
								<button
									class="btn btn-warning w-full mt-5"
									@click="removeImage(index)"
								>
									delete image
								</button>
							</div>

							<label
								for="file"
								class="flex flex-col items-center btn btn-primary w-[300px] h-[200px]"
							>
								<span class="text-base leading-normal">
									Select a file
								</span>
								<input
									id="file"
									type="file"
									class="hidden"
									@change="onFileChange"
								/>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="step === 5">Preview</div>

		<!-- SAVE TO CLOUD -->
		<div class="flex items-center justify-end m-5">
			<button
				class="btn btn-primary max-w-md"
				type="button"
				name="button"
				@click="previousWizard"
			>
				Prev
			</button>

			<button
				class="btn btn-primary max-w-md mx-2"
				type="button"
				name="button"
				@click="nextWizard"
				v-if="step <= 4"
			>
				Next
			</button>

			<button
				class="btn btn-success max-w-md mx-2"
				type="button"
				name="button"
				@click="saveDraftGig"
				v-if="step >= 0"
			>
				Save
			</button>
		</div>
	</div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { timeArray } from "@/data/timeData";
import { gigTagsEnum } from "@/data/data";

// import imageUploaderComponent from "@/components/imageUploaderComponent.vue";
import customToast from "@/toast";
import { isEmpty } from "@/helper";
import PricingComponent from "@/components/packageComponent.vue";
// import { base62 } from "@/utils/baseEncoder";

const emptyPack = (pid) => {
	return {
		id: pid,
		name: null,
		price: null,
		deliveryTime: null,
		revisions: null,
	};
};

export default {
	components: {
		VueEditor,
		"pricing-component": PricingComponent,
		// imageUploaderComponent,
	},

	data() {
		return {
			step: 1,
			images: [],
			category: "",
			tags: [],
			tag: "",
			steps: {
				title: false,
				body: false,
				pricing: false,
				images: false,
				preview: false,
			},
			htmlForEditor: null,
			title: "",
			packages: [
				{
					id: 1,
					name: null,
					price: null,
					deliveryTime: null,
					revisions: null,
				},
				{
					id: 2,
					name: null,
					price: null,
					deliveryTime: null,
					revisions: null,
				},
				{
					id: 3,
					name: null,
					price: null,
					deliveryTime: null,
					revisions: null,
				},
				{
					id: 4,
					name: null,
					price: null,
					deliveryTime: null,
					revisions: null,
				},
			],
			price: null,
			deliveryTime: null,
			customToolbar: [
				["bold", "italic", "underline"],
				[{ list: "ordered" }, { list: "bullet" }],
				["image", "code-block"],
			],
			timeArray: timeArray,
			categories: gigTagsEnum,
		};
	},

	computed: {
		isTitleValid() {
			return this.title.length > 0;
		},
		isBodyValid() {
			return !isEmpty(this.htmlForEditor);
		},
		isPricingValid() {
			// loop  and check if atlease one pricing is properly set
			let isValid = false;
			this.packages.forEach((pack) => {
				if (
					pack.name &&
					pack.price &&
					pack.deliveryTime &&
					pack.revisions
				) {
					isValid = true;
				}
			});
			return isValid;
		},
		isImagesValid() {
			return this.images.length > 0;
		},

		isGigValid() {
			return (
				this.isTitleValid &&
				this.isBodyValid &&
				this.isPricingValid &&
				this.isImagesValid
			);
		},
	},

	methods: {
		setEditorContent() {
			this.htmlForEditor = "<h1>Html For Editor</h1>";
		},
		saveDraftGig() {
			if (this.htmlForEditor) {
				// split the text in 10 chunks
				// const chunks = [];
				const text = JSON.stringify(this.htmlForEditor);

				// const encodedChunks = chunks.map((c) => base62.encode(c));
				console.log(text);

				console.log(this.packages);
			}
		},
		addPricing() {
			if (this.gigpackages.length >= 5) {
				return customToast({
					message: "You can't add more than 5 packages",
					type: "error",
				});
			}
			this.gigpackages.push(emptyPack);
		},

		removePricing(pack) {
			// check if there is only one package
			if (this.gigpackages.length === 1) {
				return customToast({
					message: "cannot remove primary pack",
					icon: "warning",
				});
			}

			// find the pack
			const index = this.gigpackages.indexOf(pack);
			// remove it
			this.gigpackages.splice(index, 1);
		},

		onFileChange(e) {
			const file = e.target.files[0];

			// check if file is an image
			if (!file.type.includes("image")) {
				return customToast({
					message: "Please select an image",
					type: "error",
				});
			}

			// check if file size is less than 2mb
			if (file.size > 2000000) {
				return customToast({
					message: "Image size should be less than 2mb",
					type: "error",
				});
			}

			// check image dimension
			const img = new Image();
			img.src = window.URL.createObjectURL(file);

			img.onload = () => {
				const width = img.naturalWidth,
					height = img.naturalHeight;

				window.URL.revokeObjectURL(img.src);

				const validDimension = {
					width: {
						min: 300,
						max: 1280,
					},
					height: {
						min: 200,
						max: 720,
					},
				};

				if (
					width < validDimension.width.min ||
					width > validDimension.width.max
				) {
					return customToast({
						message: `Image width should be between ${validDimension.width.min} and ${validDimension.width.max}`,
						icon: "error",
						timer: 5000,
					});
				}

				if (
					height < validDimension.height.min ||
					height > validDimension.height.max
				) {
					return customToast({
						message: `Image height should be between ${validDimension.height.min} and ${validDimension.height.max}`,
						icon: "error",
						timer: 5000,
					});
				}

				// create a file reader
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					// push image to array
					this.images.push(e.target.result);
				};
			};

			// this.image = URL.createObjectURL(file);
		},

		previousWizard() {
			this.step -= 1;
		},

		nextWizard() {
			this.step += 1;
		},

		uploadImages() {
			console.log("uploading image");
		},

		removeImage(index) {
			this.images.splice(index, 1);
		},

		// tags
		addTag() {
			if (this.tags.includes(this.tag)) {
				return customToast({
					message: "Tag already exists",
					icon: "error",
				});
			}

			if (this.tags.length >= 5) {
				return customToast({
					message: "You can't add more than 5 tags",
					icon: "error",
				});
			}

			if (this.tag.length < 3) {
				return customToast({
					message: "Tag should be atleast 3 characters long",
					icon: "error",
				});
			}

			this.tags.push(this.tag);
		},
		removeTag(tag) {
			const index = this.tags.indexOf(tag);
			this.tags.splice(index, 1);
		},
	},
};
</script>
