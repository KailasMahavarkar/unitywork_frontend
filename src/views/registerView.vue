<template>
	<div class="flex justify-center items-center">
		<div class="flex flex-col items-center justify-center w-full test">
			
			<div>
				<div v-if="active === 'user-register'">
					<user-register-form />
				</div>
				<div v-if="active === 'seller-register'">
					<company-register-form />
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import userRegisterFormVue from '@/forms/userRegisterForm.vue';
import companyRegisterForm from '@/forms/companyRegisterForm.vue';

export default {
	name: "registerView",
    components: {
        "user-register-form": userRegisterFormVue,
        "company-register-form": companyRegisterForm
    },
	data: function () {
		return {
			active: "user-register",
		};
	},

	mounted() {},
};
</script>
