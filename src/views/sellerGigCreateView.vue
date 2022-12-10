<template>
	<div class="flex flex-col w-full shadow-md">
		<!-- STEPS -->
		<ul class="steps">
			<!-- create title, set category and tags -->
			<step-list
				:value="isTitleValid"
				:currentStep="step"
				:expectedStep="1"
			>
				Create Title
			</step-list>

			<!-- create body -->
			<step-list
				:value="isBodyValid"
				:currentStep="step"
				:expectedStep="2"
			>
				Create Body
			</step-list>

			<!-- create pricing -->
			<step-list
				:value="isPricingValid"
				:currentStep="step"
				:expectedStep="3"
			>
				Create Pricing
			</step-list>

			<!-- upload images -->
			<step-list
				:value="isImagesValid"
				:currentStep="step"
				:expectedStep="4"
			>
				Upload Images
			</step-list>

			<!-- preview -->
			<step-list
				:value="step === 5"
				:currentStep="step"
				:expectedStep="5"
			>
				Preview & Publish
			</step-list>
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
						v-model="gig.title"
						placeholder="like I will create a 'your portfolio website'"
						class="input rounded-sm w-full shadow flex-1 dark:input-bordered"
					/>
				</div>
			</div>

			<div class="flex flex-col w-[90%] mt-10">
				<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
					Gig Category
				</h2>
				<div class="flex">
					<select
						v-model="gig.category"
						class="input rounded-sm w-full shadow flex-1 font-bold dark:select-bordered"
					>
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
						v-for="tag in gig.tags"
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
						class="flex items-center justify-center"
						v-if="gig.tags.length < 5"
					>
						<input
							type="text"
							id="tag"
							v-model="tag"
							class="input rounded-sm w-full shadow flex-1 font-bold dark:input-bordered"
						/>

						<div
							class="flex mx-5 cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
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
				<vue-editor class="h-full" v-model="gig.blog"> </vue-editor>
			</div>
		</div>

		<!-- PRICING -->
		<div
			class="flex flex-col w-full items-center mt-[80px] mb-0"
			v-if="step === 3"
		>
			<div class="flex flex-col w-[90%]">
				<div class="flex justify-between">
					<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
						Gig Pricing
					</h2>
				</div>
				<table>
					<tr>
						<th>Package</th>
						<th>Price</th>
						<th>Delivery Time</th>
						<th>Revision Count</th>
						<th>Valid</th>
					</tr>
					<tr v-for="pack in gig.pricings" :key="pack.id">
						<td>
							<input
								type="text"
								id="package"
								class="input input-bordered rounded-sm w-full flex-1"
								v-model="pack.name"
							/>
						</td>
						<td>
							<input
								type="number"
								id="price"
								:min="300"
								v-model="pack.price"
								class="input input-bordered rounded-sm w-full flex-1"
							/>
						</td>
						<td>
							<select
								class="select select-bordered rounded-sm w-full flex-1"
								v-model="pack.deliveryTime"
							>
								<option
									v-for="(element, index) in timeArray"
									:key="index"
								>
									{{ element }}
								</option>
							</select>
						</td>
						<td>
							<input
								type="number"
								max="20"
								id="revisions"
								v-model="pack.revisions"
								class="input input-bordered rounded-sm w-full flex-1"
							/>
						</td>
						<td>
							<font-awesome-icon
								:icon="
									pack.valid
										? ['fas', 'check']
										: ['fas', 'times']
								"
								class="text-xl text-green-500"
							/>
						</td>
					</tr>
				</table>
			</div>
		</div>

		<!-- Images -->
		<div class="flex flex-col w-full child:flex-1" v-if="step === 4">
			<div class="flex items-center justify-center">
				<div
					class="flex flex-col m-10 p-5 shadow"
					v-for="(image, index) in [
						'fileOne',
						'fileTwo',
						'fileThree',
					]"
					:key="index"
				>
					<img
						:src="
							secureUrls[image] ||
							previewImages[image] ||
							`https://via.placeholder.com/300x200/FFF/000?text=300%20x%20200%20image`
						"
						class="w-[300px] max-h-[200px] object-cover"
						alt=""
					/>
					<div class="flex shadow m-0 p-0 rounded-md max-w-[300px]">
						<input
							class="file-input w-full"
							:id="image"
							:multiple="false"
							type="file"
							@change="uploadFile"
							:ref="image"
						/>
						<button
							class="btn btn-error btn-sm btn-circle m-2"
							@click="removeFile(image)"
						>
							<font-awesome-icon icon="times" />
						</button>
					</div>
				</div>
			</div>
		</div>

		<div v-if="step === 5">
			<gig-card :gig="gig"></gig-card>
		</div>

		<!-- SAVE TO CLOUD -->
		<div class="flex items-center justify-end m-5">
			<button
				class="btn btn-primary max-w-md"
				type="button"
				name="button"
				@click="previousWizard"
				v-if="step > 1"
			>
				Prev
			</button>

			<!-- conditionally disable buttton -->

			<button
				class="btn btn-primary max-w-md mx-2"
				type="button"
				name="button"
				@click="nextWizard"
				v-if="step < 5"
				:disabled="
					(step === 1 && !isTitleValid) ||
					(step === 2 && !isBodyValid) ||
					(step === 3 && !isPricingValid) ||
					(step === 4 && !isImagesValid)
				"
			>
				Next
			</button>

			<button
				class="btn btn-success max-w-md mx-2"
				type="button"
				name="button"
				@click="saveDraftGig"
                v-if="step === 5"
			>
				Save and Publish Gig
			</button>
		</div>
	</div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { gigTagsEnum } from "@/data/data";
import customToast from "@/toast";
import { isEmpty } from "@/helper";
import stepListVue from "@/components/stepList.vue";
import gigCard from "@/components/gigViewCard.vue";
import { timeArray } from "@/data/timeData";
import api from "@/api";

const correctMap = {
	0: "fileOne",
	1: "fileTwo",
	2: "fileThree",
};

export default {
	components: {
		VueEditor,
		"step-list": stepListVue,
		"gig-card": gigCard,
	},

	data() {
		return {
			images: {
				fileOne: null,
				fileTwo: null,
				fileThree: null,
			},
			secureUrls: {
				fileOne: null,
				fileTwo: null,
				fileThree: null,
			},
			publicIds: {
				fileOne: null,
				fileTwo: null,
				fileThree: null,
			},
			previewImages: {
				fileOne: null,
				fileTwo: null,
				fileThree: null,
			},

			fileRecords: [],
			uploadUrl: "http://localhost:2000/cloudinary",
			uploadHeaders: {
				Authorization: `Bearer ${this.$store.state.user.accessToken}`,
			},
			gig: {
				title: "",
				description: "",
				blog: "",
				tags: [],
				category: "",

				// images
				images: [],
				secureUrls: [],
				publicIds: [],

				// pricing
				pricings: [
					{
						id: 1,
						name: "",
						price: 0,
						deliveryTime: "",
						revisions: 0,
						valid: false,
					},
					{
						id: 2,
						name: "",
						price: 0,
						deliveryTime: "",
						revisions: 0,
						valid: false,
					},
					{
						id: 3,
						name: "",
						price: 0,
						deliveryTime: "",
						revisions: 0,
						valid: false,
					},
				],
			},
			step: 1,
			category: "website-development",
			tag: "",
			steps: {
				title: false,
				body: false,
				pricing: false,
				images: false,
				preview: false,
			},

			customToolbar: [
				["bold", "italic", "underline"],
				[{ list: "ordered" }, { list: "bullet" }],
				["image", "code-block"],
			],

			timeArray: timeArray,
			categories: gigTagsEnum,
		};
	},

	watch: {
		gig: {
			handler: function (val) {
				// loop through all the pricing packages
				// if any of the package is not valid

				val.pricings.forEach((pack) => {
					// if any of the package is not valid
					pack.valid =
						pack.name &&
						pack.price &&
						pack.deliveryTime &&
						pack.revisions;
				});
			},
			deep: true,
		},
	},

	computed: {
		isTitleValid() {
			return this.gig.title.length > 0;
		},
		isBodyValid() {
			return !isEmpty(this.gig.blog);
		},

		isImagesValid() {
			return Object.values(this.images).some((image) => image !== null);
		},

		isPricingValid() {
			// loop through all the pricing packages
			// check if any of the package is valid
			// if any of the package is valid
			// return true

			let valid = false;
			this.gig.pricings.forEach((pack) => {
				if (pack.valid) {
					valid = true;
				}
			});

			return valid;
		},

		validPricings() {
			return this.gig.pricings.filter((p) => p.valid);
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
		beforeUploadFile(file, fileId) {
			// check if file is an image
			if (!file.type.includes("image")) {
				return customToast({
					message: "Please select an image",
					type: "error",
				});
			}

			// check if file size is less than 2mb
			if (file.size > 2000000) {
				customToast({
					message: "Image size should be less than 2mb",
					type: "error",
				});
				return false;
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
					customToast({
						message: `Image width should be between ${validDimension.width.min} and ${validDimension.width.max}`,
						icon: "error",
						timer: 5000,
					});
					return false;
				}

				if (
					height < validDimension.height.min ||
					height > validDimension.height.max
				) {
					customToast({
						message: `Image height should be between ${validDimension.height.min} and ${validDimension.height.max}`,
						icon: "error",
						timer: 5000,
					});
					return false;
				}
			};

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				this.previewImages[fileId] = e.target.result;
			};
			return true;
		},
		uploadFile(event) {
			// get id attribute of the file input
			const fileId = event.target.id;

			// before uploading the file
			const ImagevalidateResult = this.beforeUploadFile(
				this.$refs[fileId][0].files[0],
				fileId
			);

			if (ImagevalidateResult) {
				// link the file to the image object
				this.images[fileId] = this.$refs[fileId][0].files[0];
			}
		},

		async removeFile(fileName) {
			// check if file is already uploaded in cloudinary
			// if yes, delete the file from cloudinary
			if (this.secureUrls[fileName]) {
				// delete the file from cloudinary
				const result = await api.delete(
					`/cloudinary?publicId=${this.publicIds[fileName]}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${this.$store.state.user.accessToken}`,
						},
					}
				);

				if (result.status === 200) {
					customToast({
						message: "File deleted successfully",
						icon: "success",
					});
				}
			}

			// make ref null
			this.$refs[fileName][0].value = null;

			this.secureUrls[fileName] = null;
			this.publicIds[fileName] = null;

			// remove from preview images
			this.previewImages[fileName] = null;
		},

		async submitFiles() {
			// make api call to upload files

			const requestArray = [];

			Object.keys(this.images).forEach(async (key) => {
				if (!this.images[key]) {
					return;
				}

				const formData = new FormData();
				const file = this.images[key];
				formData.append("file", file);

				const headers = { "Content-Type": "multipart/form-data" };

				requestArray.push(
					api.post("/cloudinary", formData, {
						headers,
					})
				);
			});

			// wait for all the requests to complete
			const responses = await Promise.all(requestArray);

			// loop through the responses and get the secureUrl and publicId
			// attach them to the secureUrls and publicIds object
			responses.forEach((response, index) => {
				const fileId = correctMap[index];
				this.secureUrls[fileId] = response.data.data.secureUrl;
				this.publicIds[fileId] = response.data.data.publicId;
			});

			console.log(this.secureUrls);
		},
		setEditorContent() {
			this.gig.blog = "<h1>Html For Editor</h1>";
		},
		async saveDraftGig() {
			if (this.isGigValid) {
				// save gig to db
			} else {
				customToast({
					message: "Please fill all the fields",
					icon: "warning",
				});
			}
		},

		previousWizard() {
			this.step -= 1;
		},

		nextWizard() {
			this.step += 1;
		},
		// tags
		addTag() {
			if (this.gig.tags.includes(this.tag)) {
				return customToast({
					message: "Tag already exists",
					icon: "error",
				});
			}

			if (this.gig.tags.length >= 5) {
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

			this.gig.tags.push(this.tag);
		},
		removeTag(tag) {
			const index = this.gig.tags.indexOf(tag);
			this.gig.tags.splice(index, 1);
		},
	},
};
</script>

<style scoped></style>
