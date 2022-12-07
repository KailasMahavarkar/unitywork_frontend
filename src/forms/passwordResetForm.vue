<template>
	<div>
		<div class="flex flex-col items-center justify-center">
			<h1 class="text-3xl font-bold text-center">Reset your password</h1>
			<p class="text-center">
				Enter your email address and we'll send you a link to reset your
				password.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "passwordResetForm",
	data: function () {
		return {
			password: "",
			confirm: "",
			errors: [],
		};
	},
	props: {
		active: {
			type: String,
			default: "login",
		},
	},
	methods: {
		submitForm: function () {
			this.errors = [];
		},
	},
};
</script>
