<template>
	<dashboard-component>
		<div
			class="flex items-center justify-center w-full h-full shadow min-h-[80vh] my-5"
		>
			<div
				class="flex items-center justify-center w-full p-5 my-5 rounded-md"
			>
				<form
					class="flex flex-col w-full max-w-lg shadow-md p-5 rounded-md bg-white dark:bg-gray-800"
					v-if="
						verificationStatus === 'created' ||
						verificationStatus === 'rejected'
					"
				>
					<!-- First & Last Name -->
					<div class="flex flex-col md:flex-1 md:flex-row">
						<form-input
							mode="double"
							:value="firstname"
							@input="firstname = $event"
						>
							First Name
						</form-input>
						<form-input
							mode="double"
							:value="lastname"
							@input="lastname = $event"
						>
							Last Name
						</form-input>
					</div>

					<form-input
						:required="true"
						type="country"
						:value="country"
						@input="country = $event"
					>
						country
					</form-input>

					<!-- Email -->
					<form-input
						:required="true"
						type="email"
						:value="email"
						@input="email = $event"
					>
						Email
					</form-input>

					<!-- TextArea -->
					<textarea-input
						@input="description = $event"
						textarea-class="min-h-[200px] w-full"
						:value="description"
					>
						<template #label>
							Why do you want to be part of UnityWork.io ?
						</template>
					</textarea-input>

					<!-- Govt Id card -->
					<!-- file event was emited back to parent use it -->

					<file-uploader
						file-name="govtIdCard"
						:image.sync="govtIdCard"
					>
						Govt. Issued ID
					</file-uploader>

					<file-uploader
						file-name="selfieGovtIdCard"
						:image.sync="selfieGovtIdCard"
					>
						Selfie With Govt Issued ID
					</file-uploader>

					<button
						class="btn btn-outline mx-2"
						@click.prevent="formSubmitHandler"
					>
						<span>Send Profile For verification</span>
					</button>
				</form>

				<!-- if seller is verified -->

				<div
					v-if="
						verificationStatus === 'pending' ||
						verificationStatus === 'verified' ||
						verificationStatus === 'rejected'
					"
					class="w-full h-full"
				>
					<div class="flex flex-col items-center justify-center">
						<div class="flex flex-col items-center justify-center">
							<i
								class="fa fa-check-circle text-6xl text-green-500"
							></i>
							<h3
								class="text-warning"
								v-if="verificationStatus === 'pending'"
							>
								{{
									"Your profile is under review. We will get back to you soon."
								}}
							</h3>

							<h3
								class="text-green-500"
								v-else-if="verificationStatus === 'verified'"
							>
								{{
									"Your profile is verified. You can now start selling your services like pro"
								}}
							</h3>

							<h3
								class="text-red-500"
								v-else-if="verificationStatus === 'rejected'"
							>
								{{
									"Your profile is rejected. You can now make changes and resubmit your profile for review"
								}}
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	</dashboard-component>
</template>

<script>
import formInputVue from "@/components/formInput.vue";
import fileUploader from "@/components/fileuploadComponent.vue";
import textAreaInputVue from "@/components/textAreaInput.vue";
import api from "@/api";
import { mapGetters } from "vuex";
import { handleCustomError } from "@/helper";
import customToast from "@/toast";

export default {
	name: "sellerVerificationView",
	components: {
		"form-input": formInputVue,
		"textarea-input": textAreaInputVue,
		"file-uploader": fileUploader,
	},
	data() {
		return {
			verificationStatus: "",
			firstname: "",
			lastname: "",
			description: "",
			email: "",
			country: "",

			govtIdCard: {
				preview: "",
				secureUrl: "",
				publicId: "",
			},
			selfieGovtIdCard: {
				preview: "",
				secureUrl: "",
				publicId: "",
			},
		};
	},
	watch: {},
	computed: {
		...mapGetters(["getUser", "getHeaders"]),
	},
	methods: {
		async formSubmitHandler() {
			const sellerId = this.getUser._id;

			// remove preview from data
			this.govtIdCard.preview = "";
			this.selfieGovtIdCard.preview = "";

			const data = {
				firstname: this.firstname,
				lastname: this.lastname,
				description: this.description,
				email: this.email,
				country: this.country,
				govtIdCard: this.govtIdCard,
				selfieGovtIdCard: this.selfieGovtIdCard,
			};

			if (!this.govtIdCard.secureUrl) {
				customToast({
					message: "Please upload your govt. issued ID",
					icon: "error",
				});
				return;
			}

			if (!this.selfieGovtIdCard.secureUrl) {
				customToast({
					message: "Please upload your selfie with govt. issued ID",
					icon: "error",
				});
				return;
			}

			// send data to server
			try {
				const result = await api.post(
					`/seller/create-verification/${sellerId}`,
					data
				);

				if (result.status === 200) {
					customToast({
						message: "Your profile has been sent for verification",
						icon: "success",
					});
				}
			} catch (error) {
				handleCustomError(error);
			}
		},
	},

	async mounted() {
		try {
			const sellerId = this.getUser._id;
			const result = await api.get(`/seller/verification/${sellerId}`);

			if (result.status === 200) {
				const verificationData = result.data.data.verification;

				this.firstname = verificationData.firstname;
				this.lastname = verificationData.lastname;
				this.description = verificationData.description;
				this.email = verificationData.email;
				this.country = verificationData.country;

				this.verificationStatus = verificationData.verificationStatus;

				this.govtIdCard = verificationData.govtIdCard;
				this.selfieGovtIdCard = verificationData.selfieGovtIdCard;
			}
		} catch (error) {
			handleCustomError(error);
		}
	},
};
</script>
