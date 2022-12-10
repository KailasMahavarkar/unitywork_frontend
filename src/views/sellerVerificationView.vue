<template>
	<div class="flex items-center justify-center w-full h-full">
		<div class="p-5 m-5 rounded-md shadow-lg">
			<form class="w-full">
				<!-- First & Last Name -->
				<div class="flex flex-col md:flex-1 md:flex-row">
					<form-input mode="double" v-on:input="firstName = $event">
						First Name
					</form-input>
					<form-input mode="double" v-on:input="lastName = $event">
						Last Name
					</form-input>
				</div>

				<!-- Email -->
				<form-input
					:required="true"
					type="email"
					v-on:input="firstName = $event"
				>
					Email
				</form-input>

				<!-- TextArea -->
				<textarea-input textarea-class="min-h-[200px] w-full">
					<template #label>
						Why do you want to be part of UnityWork.io ?
					</template>
				</textarea-input>

				<!-- Govt Id card -->
				<!-- file event was emited back to parent use it -->

				<file-uploader
					file-name="govtIdCard"
					:preview="preview"
					:secureUrl="secureUrl"
					:publicId="publicId"
					:submit="submit"
					@preview="preview = $event"
					@secureUrl="secureUrl = $event"
					@publicId="publicId = $event"
					@submit="submit = $event"
				>
					Govt. Issued ID
				</file-uploader>

				<button
					class="btn btn-outline mx-2"
					@click.prevent="formSubmitHandler"
				>
					<span>Send Profile For verification</span>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import formInputVue from "@/components/formInput.vue";
import fileUploader from "@/components/fileuploadComponent.vue";
import textAreaInputVue from "@/components/textAreaInput.vue";

export default {
	name: "sellerVerificationView",
	components: {
		"form-input": formInputVue,
		"textarea-input": textAreaInputVue,
		"file-uploader": fileUploader,
	},
	data() {
		return {
			firstName: "",
			lastName: "",
			description: "",

			preview: null,
			secureUrl: null,
			publicId: null,
			submit: null,
		};
	},
	watch: {},
	methods: {
		formSubmitHandler() {
			console.log(this._data);
		},
	},
};
</script>
