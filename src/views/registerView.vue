<template>
	<div class="flex justify-center items-center min-h-[100vh] shadow">
		<div class="flex flex-col items-center justify-center w-full">
            <user-register-form></user-register-form>            
		</div>
	</div>
</template>

<script>
import userRegisterFormVue from "@/forms/registrationForm.vue";
import api from "@/api";
import customToast from "@/toast";
import { isEmpty } from "@/helper";



export default {
	name: "registerView",
	components: {
		"user-register-form": userRegisterFormVue,
	},
	data: function () {
		return {
			active: "user-register",
		};
	},

	async mounted() {
		const mailToken = this.$route.query?.mailtoken

		if (!isEmpty(mailToken)) {
			// verify mail token
			try {
				const result = await api.post("/auth/mailverify", {
					token: mailToken,
				});

				if (result.status === 200) {
					return customToast({
						message: "Mail verifed successfully",
						icon: "success",
					});
				}
			} catch (error) {
				const errorMessage = error.response?.data?.msg;

				if (errorMessage) {
					return customToast({
						message: errorMessage,
						icon: "error",
					});
				}
			}
		}
	},
};
</script>
