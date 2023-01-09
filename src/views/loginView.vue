<template>
	<div
		class="flex justify-center items-center w-full h-full shadow min-h-[80vh]"
	>
		<div class="flex flex-col p-10 shadow-xl">
			<login-form></login-form>
			<div class="divider"></div>
			<div>
				<b> Test Credentials</b>
				<br />
				Username: kai
				<br />
				Password: 123
			</div>

			<div class="divider"></div>
			<div>
				<b> Admin Credentials</b>
				<br />
				Username: admin
				<br />
				Password: 123456
			</div>
		</div>
	</div>
</template>

<script>
import loginFormVue from "@/forms/loginForm.vue";

export default {
	name: "loginView",
	components: {
		"login-form": loginFormVue,
	},
	data() {
		return {
			username: "",
			password: "",
			active: "login",
		};
	},
	mounted() {
	},
	methods: {},
};
</script>
