<template>
	<div
		class="flex justify-center items-center w-full h-full shadow min-h-[80vh] "
	>
		<div class="flex flex-col p-10 shadow-xl">
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
		</div>
	</div>
</template>

<script>
import {
	handleCustomError,
	handleNetworkError,
	isNetworkError,
	parseJwt,
} from "@/helper";
import customToast from "@/toast";
import axios from "axios";
import { sha512 } from "js-sha512";

export default {
	name: "loginView",
	data() {
		return {
			username: "",
			password: "",
		};
	},
	mounted() {
		console.log(this.$store.state.counter);
	},
	methods: {
		async loginHandler() {
			try {
				const result = await axios.post("/auth/login", {
					username: this.username,
					password: sha512(this.password).toString(),
				});

				if (result.status === 200) {
					const { accessToken, refreshToken } = result.data.data;
					const parsedToken = parseJwt(accessToken);

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

					this.$router.replace({
						name: "gigsView",
					});

					return customToast({
						icon: "success",
						message: "User Logged In Successfully",
					});
				}
			} catch (error) {
				if (isNetworkError(error)) {
					return handleNetworkError();
				}

				return handleCustomError(error);
			}
		},
	},
};
</script>
