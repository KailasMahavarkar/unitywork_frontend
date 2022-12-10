<template>
	<div class="flex flex-wrap flex-1 mb-2">
		<div class="mb-2 mx-2 w-full">
			<label class="label">
				<span class="label-text font-extrabold">
					<slot> </slot>
				</span>
			</label>
			<div class="flex flex-col w-full">
				<div class="flex items-center justify-center shadow mb-2">
					<img
						v-if="preview || secureUrl"
						:src="
							secureUrl ||
							preview ||
							`https://via.placeholder.com/300x200/FFF/000?text=300%20x%20200%20image`
						"
						class="w-[300px] max-h-[200px] object-cover"
						alt=""
					/>
				</div>
				<div class="flex items-center justify-center shadow rounded-md">
					<input
						class="file-input w-full"
						@change="uploadFile"
						:id="fileName"
						:multiple="false"
						type="file"
						ref="file"
					/>

					<div class="tooltip tooltip-error" data-tip="delete image">
						<button
							class="btn btn-error btn-sm btn-circle m-2"
							@click.prevent="removeFile"
						>
							<font-awesome-icon icon="times" />
						</button>
					</div>
					<div
						v-if="!secureUrl"
						class="tooltip"
						:data-tip="
							preview && !secureUrl
								? 'Upload Image'
								: 'Change Image'
						"
					>
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

export default {
	name: "formInput",
	components: {},
	data: () => ({
		image: null,
	}),
	props: {
		fileName: {
			type: String,
			default: "image",
		},
		secureUrl: {
			type: String,
			default: "",
		},
		preview: {
			type: String,
			default: "",
		},
		publicId: {
			type: String,
			default: "",
		},
		submit: {
			type: Function,
			default: () => {},
		},
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

				const widthCheck =
					width < validDimension.width.min ||
					width > validDimension.width.max;

				const heightCheck =
					height < validDimension.height.min ||
					height > validDimension.height.max;
				if (widthCheck) {
					this.cleanUp();
					customToast({
						message: `Image width should be between ${validDimension.width.min} and ${validDimension.width.max}`,
						icon: "error",
						timer: 5000,
					});
					return false;
				}

				// check if image height and width is valid
				if (heightCheck) {
					this.cleanUp();
					customToast({
						message: `Image height should be between ${validDimension.height.min} and ${validDimension.height.max}`,
						icon: "error",
						timer: 5000,
					});
					return false;
				}
				const reader = new FileReader();
				reader.readAsDataURL(this.image);
				reader.onload = (e) => {
					this.$emit("preview", e.target.result);
				};
				return true;
			};
		},
		uploadFile() {
			// @ts-ignore
			this.image = this.$refs.file.files[0];

			const validateFile = this.beforeUploadFile(this.image);
			if (!validateFile) {
				return;
			}

			this.$emit("preview", this.image);
		},
		async submitFile() {
			const formData = new FormData();

			// @ts-ignore
			const myImage = this.$refs["file"].files[0];
			formData.append("file", myImage);

			// console.log(formData);

			// handleCustomError;
			try {
				const result = await api.post(
					"/cloudinary",
					formData,
					this.getHeaders
				);
				if (result.status === 200) {
					const publicId = result.data.data.publicId;
					const secureUrl = result.data.data.secureUrl;
					// emit the publicId and secureUrl to parent component
					this.$emit("publicId", publicId);
					this.$emit("secureUrl", secureUrl);
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
			if (this.secureUrl) {
				// delete the file from cloudinary
				const result = await api.delete(
					`/cloudinary?publicId=${this.publicId}`,
					{}
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

			this.$emit("preview", "");
			this.$emit("publicId", "");
			this.$emit("secureUrl", "");
		},
	},
};
</script>
