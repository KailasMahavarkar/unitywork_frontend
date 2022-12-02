<template>
	<div class="flex justify-center items-center w-full h-full">
		<div class="flex flex-col p-5 shadow">
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
	methods: {
		async loginHandler() {
			try {
				const result = await axios.post("/auth/login", {
					username: this.username,
					password: sha512(this.password).toString(),
				});

				if (result.status === 200) {
					this.$router.push({
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
