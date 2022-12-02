<template lang="">
	<div>
		Seller Register

		<seller-register-form />
	</div>
</template>

<script>
import sellerRegisterFormVue from "@/forms/userRegisterForm.vue";

export default {
	name: "sellerRegisterView",
	components: {
		"seller-register-form": sellerRegisterFormVue,
	},
	data: function () {
		return {};
	},

	mounted() {},
};
</script>
