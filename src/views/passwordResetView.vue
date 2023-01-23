<template>
	<div
		class="flex justify-center items-center w-full h-full shadow min-h-[80vh]"
	>
		<div class="flex flex-col p-10 shadow-xl">
			<h1 class="text-3xl font-bold text-center">Reset your password</h1>

			<!-- EMAIL -->
			<div class="form-control w-full" v-if="!token">
				<label class="label">
					<span class="label-text">Email</span>
				</label>
				<input
					type="email"
					required="true"
					class="input input-bordered w-full"
					v-model="email"
				/>
			</div>

			<!-- new password -->
			<div class="form-control w-full" v-if="token">
				<label class="label">
					<span class="label-text">New Password</span>
				</label>
				<input
					type="text"
					required="true"
					class="input input-primary input-bordered w-full"
					v-model="password"
				/>
			</div>

			<!-- SUBMIT BUTTON -->
			<div class="form-control w-full mt-5" v-if="!token">
				<button
					@click="submitForm"
					required="true"
					class="btn btn-primary"
				>
					Submit
				</button>
			</div>

			<div class="form-control w-full mt-5" v-if="token">
				<button
					@click="changePassword"
					required="true"
					class="btn btn-primary"
				>
					Change Password
				</button>
			</div>

			<p class="text-center">
				Note: we'll send you a password reset link, if your mail exists
				with us.
			</p>
		</div>
	</div>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
import customToast from "@/toast";
import { sha512 } from "js-sha512";

export default {
	name: "passwordResetView",
	components: {},
	data() {
		return {
			email: "",
			token: "",
			password: "",
		};
	},
	async mounted() {
		// check if token exists in req query
		if (this.$route.query.token) {
			// make api call to verify token
			this.token = String(this.$route.query.token);

			if (!this.token && typeof this.token !== "string") {
				return customToast({
					message: `Invalid token`,
					icon: "error",
				});
			}
		}
	},

	methods: {
		submitForm: async function () {
			try {
				await api.post("/auth/reset", {
					email: this.email,
				});

				this.$router.push("/login");

				return customToast({
					message: `Mail has been send, kindly check primary, promotions and spam folder`,
					icon: "info",
					timer: 8000,
				});
			} catch (error) {
				return handleCustomError(error);
			}
		},

		changePassword: async function () {
			try {
				const mailSend = await api.post("/auth/reset", {
					token: this.token,
					password: sha512(this.password).toString(),
				});

				if (mailSend) {
					this.$router.push("/login");
				}

				return customToast({
					message: `Password has been reset, kindly login`,
					icon: "info",
                    timer: 8000,
				});
			} catch (error) {
				return handleCustomError(error);
			}
		},
	},
};
</script>
