<template>
	<div class="flex">
		<div class="mb-2 mx-2 w-full">
			<label class="label">
				<span class="label-text font-extrabold">
					<!-- customizable text -->
					<slot></slot>
				</span>
			</label>
			<div class="flex flex-col w-full">
				<div class="flex items-center justify-center shadow mb-2">
					<!-- 
						uploaded and secureUrl is not empty
						otherwise use preview image from local(blob)
						otherwise use placeholder API 
					-->
					<img
						v-if="image?.preview || image.secureUrl"
						:src="
							image.secureUrl ||
							image?.preview ||
							`https://via.placeholder.com/300x200/FFF/000?text=300%20x%20200%20image`
						"
						class="w-[300px] h-[200px] object-cover m-0 p-2"
						alt=""
					/>
				</div>
				<div class="flex items-center justify-center shadow rounded-md">
					<!-- input for image upload -->
					<input
						class="file-input w-full"
						@change="uploadFile"
						:id="fileName"
						:multiple="false"
						type="file"
						ref="file"
					/>

					<!-- handle image removal -->
					<div
						v-if="image.preview || image.secureUrl"
						class="tooltip tooltip-error"
						data-tip="delete image"
					>
						<button
							class="btn btn-error btn-sm btn-circle m-2"
							@click.prevent="removeFile"
						>
							<font-awesome-icon icon="times" />
						</button>
					</div>

					<!-- handle image preview -->
					<div
						v-if="image.preview && !image.secureUrl"
						class="tooltip"
						:data-tip="
							image.preview ? 'upload image' : 'select image'
						"
					>

						<!-- handle submit -->
						<button
							class="btn btn-sm btn-circle m-2"
							@click.prevent="submitFile"
						>
							<font-awesome-icon
								icon="fa-solid fa-cloud-upload"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
import customToast from "@/toast";
import { mapGetters } from "vuex";

export default {
	name: "formInput",
	components: {},
	data: () => ({
		blob: null,
	}),
	props: {
		fileName: {
			type: String,
			default: "image",
		},
		image: {
			type: Object,
			default: null,
		},

		minWidth: {
			type: Number,
			default: 300,
		},
		maxWidth: {
			type: Number,
			default: 1280,
		},

		minHeight: {
			type: Number,
			default: 200,
		},
		maxHeight: {
			type: Number,
			default: 720,
		},
	},

	computed: {
		...mapGetters(["getUser"]),
	},

	methods: {
		beforeUploadFile(file) {
			// check if file is an image
			if (!file.type.includes("image")) {
				this.cleanUp();
				return customToast({
					message: "Please select an image",
					type: "error",
				});
			}

			// check if file size is less than 2mb
			if (file.size > 2000000) {
				this.cleanUp();
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

				const widthCheck =
					width < this.minWidth || width > this.maxWidth;

				const heightCheck =
					height < this.minHeight || height > this.maxHeight;
				if (widthCheck) {
					this.cleanUp();
					customToast({
						message: `Image width should be between ${this.minWidth} and ${this.maxWidth}`,
						icon: "error",
						timer: 5000,
					});
					return false;
				}

				// check if image height and width is valid
				if (heightCheck) {
					this.cleanUp();
					customToast({
						message: `Image height should be between ${this.minHeight} and ${this.maxHeight}`,
						icon: "error",
						timer: 5000,
					});
					return false;
				}
				const reader = new FileReader();
				reader.readAsDataURL(this.blob);
				reader.onload = (e) => {
					this.$emit("update:image", {
						publicId: this.image.publicId,
						secureUrl: this.image.secureUrl,
						preview: e.target.result,
					});
				};
				return true;
			};
		},
		uploadFile() {
			// @ts-ignore
			const temp = this.$refs.file.files[0];

			this.blob = temp;

			const validateFile = this.beforeUploadFile(temp);
			if (!validateFile) {
				return;
			}

			this.$emit("preview", temp);
		},
		async submitFile() {
			const formData = new FormData();

			// @ts-ignore
			const myImage = this.$refs["file"].files[0];
			formData.append("file", myImage);

			// handleCustomError;
			try {
				const result = await api.post("/cloudinary", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				if (result.status === 200) {
					const publicId = result.data.data.publicId;
					const secureUrl = result.data.data.secureUrl;

					// emit the publicId and secureUrl to parent component
					this.$emit("update:image", {
						publicId: publicId,
						secureUrl: secureUrl,
						preview: "",
					});
					customToast({
						message: "File uploaded successfully",
						icon: "success",
					});
				}
			} catch (error) {
				handleCustomError(error);
			}
		},

		async removeFile() {
			// check if file is already uploaded in cloudinary
			// if yes, delete the file from cloudinary
			if (this.image.secureUrl) {
				// delete the file from cloudinary
				const result = await api.delete(
					`/cloudinary?publicId=${this.image.publicId}`
				);
				if (result.status === 200) {
					customToast({
						message: "File deleted successfully",
						icon: "success",
					});
				}
			}
			this.cleanUp();
		},

		cleanUp() {
			// @ts-ignore
			this.$refs.file.value = "";

			this.$emit("update:image", {
				publicId: "",
				secureUrl: "",
				preview: "",
			});
		},
	},

	mounted() {},
};
</script>
