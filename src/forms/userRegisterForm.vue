<template>
	<div class="flex items-center w-full h-full justify-center">
		<div class="flex flex-col min-h-full p-5 shadow">
			<div class="flex last:child:mx-2" v-if="active === 'user-register'">
				<div class="flex-1">
					<label class="label">
						<span class="label-text">First Name</span>
					</label>
					<input
						type="text"
						required="true"
						class="input input-bordered w-full max-w-xs"
						v-model="firstname"
					/>
				</div>
				<div class="flex-1">
					<label class="label">
						<span class="label-text">Last Name</span>
					</label>
					<input
						type="text"
						required="true"
						class="input input-bordered w-full max-w-xs"
						v-model="lastname"
					/>
				</div>
			</div>

			<div
				class="flex last:child:mx-2"
				v-if="active === 'company-register'"
			>
				<div class="flex-1">
					<label class="label">
						<span class="label-text">Company Name</span>
					</label>
					<input
						type="text"
						required="true"
						class="input input-bordered w-full max-w-xs"
						v-model="companyName"
					/>
				</div>
				<div class="flex-1">
					<label class="label">
						<span class="label-text">Country</span>
					</label>
					<select
						class="select select-bordered"
						v-model="country"
						name="country"
					>
						<option
							value=""
							v-for="country in countryData"
							:key="country.name"
						>
							{{ country.name.substring(0, 20) }}
						</option>
					</select>
				</div>
			</div>

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

			<!-- EMAIL -->
			<div class="form-control w-full">
				<label class="label">
					<span class="label-text">Email Address</span>
				</label>
				<input
					type="email"
					required="true"
					class="input input-bordered w-full"
					v-model="email"
				/>
			</div>

			<!-- PASSWORD -->
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

			<!-- CONFIRM PASSWORD -->
			<div class="form-control w-full">
				<label class="label">
					<span class="label-text">Confirm Password</span>
				</label>
				<input
					type="email"
					required="true"
					class="input input-bordered w-full"
					v-model="confirm_password"
				/>
			</div>
			<div class="flex flex-col items-center justify-center w-full m-2">
				<div class="tabs tabs-boxed">
					<a
						class="tab"
						:class="active === 'user-register' ? 'tab-active' : ''"
						@click="active = 'user-register'"
						>User Register</a
					>
					<a
						class="tab"
						:class="
							active === 'company-register' ? 'tab-active' : ''
						"
						@click="active = 'company-register'"
						>Company Register</a
					>
				</div>
			</div>

			<!-- SUBMIT BUTTON -->
			<div class="form-control justify-center">
				<button
					@click="handleRegister"
					required="true"
					class="btn btn-primary"
				>
					Submit
				</button>
			</div>

			<h3 class="my-2">or</h3>

			<div class="form-control justify-center">
				<router-link to="/login">
					<button
						required="true"
						class="btn btn-outline btn-primary w-full"
					>
						Already Have an account? Login Now
					</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { countryData } from "@/data/countryData";
import customToast from "@/toast";
import {
	handleCustomError,
	handleNetworkError,
	isNetworkError,
} from "@/helper";

export default {
	name: "userRegisterView",
	components: {},

	data: () => {
		return {
			firstname: "",
			lastname: "",
			username: "",
			email: "",
			password: "",
			companyName: "",
			country: "",
			confirm_password: "",
			active: "user-register",
			countryData: countryData,
		};
	},

	methods: {
		async handleRegister() {
			if (this.active === "user-register") {
				const data = {
					firstname: this.firstname,
					lastname: this.lastname,
					username: this.username,
					email: this.email,
					password: this.password,
					confirm_password: this.confirm_password,
				};

				try {
					const result = await axios.post("/auth/register", data);

					if (result.status === 200) {
						return customToast({
							title: "Success",
							message:
								"Mail Has been sent to email, kindly also check spam",
							icon: "success",
							duration: 3000,
						});
					}
				} catch (error) {
					if (isNetworkError(error)) {
						return handleNetworkError();
					}

					return handleCustomError(error);
				}
			} else {
				const data = {
					companyName: this.companyName,
					country: this.country,
					username: this.username,
					email: this.email,
					password: this.password,
					confirm_password: this.confirm_password,
				};

				const result = await axios.post("/auth/company-register", data);
				console.log(result);
			}
		},
	},
};
</script>
