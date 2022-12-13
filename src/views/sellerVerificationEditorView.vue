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
						verificationStatus === 'pending' ||
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
						:image="govtIdCard"
						@image="govtIdCard = $event"
					>
						Govt. Issued ID
					</file-uploader>

					<file-uploader
						file-name="selfieGovtIdCard"
						:image="selfieGovtIdCard"
						@image="selfieGovtIdCard = $event"
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
					v-if="verificationStatus === 'verified'"
					class="w-full h-full"
				>
					<div class="flex flex-col items-center justify-center">
						<div class="flex flex-col items-center justify-center">
							<i
								class="fa fa-check-circle text-6xl text-green-500"
							></i>
							<p class="text-green">
								Your profile is {{ verificationStatus }}
							</p>
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
			// remove preview from data
			const data = {
				firstname: this.firstname,
				lastname: this.lastname,
				description: this.description,
				email: this.email,
				country: this.country,
				govtIdCardSecureUrl: this.govtIdCard.secureUrl,
				govtIdCardPublicId: this.govtIdCard.publicId,
				selfieGovtIdCardSecureUrl: this.selfieGovtIdCard.secureUrl,
				selfieGovtIdCardPublicId: this.selfieGovtIdCard.publicId,
				verificationStatus: "pending",
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

			console.log(this._data);

			// send data to server
			try {
				const result = await api.post(
					`/seller/verification`,
					data,
					this.getHeaders
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
			const result = await api.get(`/seller/verification`);

			if (result.status === 200) {
				const verificationData = result.data.data.verification;

				this.firstname = verificationData.firstname;
				this.lastname = verificationData.lastname;
				this.description = verificationData.description;
				this.email = verificationData.email;
				this.country = verificationData.country;

				this.verificationStatus = verificationData.verificationStatus;

				this.govtIdCard = {
					preview: verificationData.govtIdCardSecureUrl,
					secureUrl: verificationData.govtIdCardSecureUrl,
					publicId: verificationData.govtIdCardPublicId,
				};

				this.selfieGovtIdCard = {
					preview: verificationData.selfieGovtIdCardSecureUrl,
					secureUrl: verificationData.selfieGovtIdCardSecureUrl,
					publicId: verificationData.selfieGovtIdCardPublicId,
				};
			}
		} catch (error) {
			handleCustomError(error);
		}
	},
};
</script>
