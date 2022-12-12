<template>
	<fragment>
		<h2 class="m-0">
			<span class="text-2xl">Login</span>
		</h2>
		<!-- USERNAME HANDLER -->
		<div class="form-control w-full">
			<label class="label">
				<span class="label-text">Username</span>
			</label>
			<input
				type="email"
				required="true"
				class="input input-bordered w-full"
				v-model="username"
			/>
		</div>

		<!-- PASSWORD HANDLER -->
		<div class="form-control w-full">
			<label class="label">
				<span class="label-text">Password</span>
			</label>
			<input
				type="email"
				required="true"
				class="input input-bordered w-full"
				v-model="password"
			/>
		</div>

		<!-- SUBMIT BUTTON -->
		<div class="form-control w-full mt-5">
			<button
				@click="loginHandler"
				required="true"
				class="btn btn-primary"
			>
				Submit
			</button>
		</div>

		<div class="my-5 font-bold">Or</div>

		<!-- Password Reset -->
		<router-link to="reset-password">
			<div class="form-control w-full">
				<button
					required="true"
					class="btn btn-warning btn-sm rounded-full btn-outline"
				>
					Reset Password
				</button>
			</div>
		</router-link>
	</fragment>
</template>

<script>
import { handleCustomError, parseJwt } from "@/helper";
import { sha512 } from "js-sha512";
import api from "@/api";
import customToast from "@/toast";

export default {
	name: "userLoginForm",
	data: function () {
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		async loginHandler() {
			try {
				const result = await api.post("/auth/login", {
					username: this.username,
					password: sha512(this.password).toString(),
				});

				if (result.status === 200) {
					const { accessToken, refreshToken } = result.data.data;

					const parsedToken = parseJwt(accessToken);

                    const role = parsedToken.role;

					this.$store.commit("setUser", {
						...parsedToken,
						accessToken,
						refreshToken,
					});
					this.$store.commit("setAuthentication", true);

					this.$store.subscribe((mutation, state) => {
						if (mutation.type === "setAuthentication") {
							this.authed = state.authed;
						}
					});

					if (role === "admin") {
						this.$router.replace({
							name: "adminDashboardView",
						});
						return customToast({
							icon: "success",
							message: "Admin Logged In Successfully",
						});
					} else {
						this.$router.replace({
							name: "gigsView",
						});

						return customToast({
							icon: "success",
							message: "User Logged In Successfully",
						});
					}
				}
			} catch (error) {
				return handleCustomError(error);
			}
		},
	},
};
</script>
