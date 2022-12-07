<template>
	<div class="flex items-center w-full h-full justify-center">
		<div class="flex flex-col min-h-full p-5 shadow">
			<div class="flex last:child:mx-2">
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
					<span class="label-text">Company Email Address</span>
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

			<!-- SUBMIT BUTTON -->
			<div class="form-control justify-center mt-5">
				<button required="true" class="btn btn-primary">Submit</button>
			</div>
		</div>
	</div>
</template>

<script>

import api from '@/api';

export default {
	name: "companyRegisterForm",
	components: {},

	data: () => {
		return {
			firstname: "",
			lastname: "",
			username: "",
			email: "",
			password: "",
			confirm_password: "",
		};
	},

	methods: {
		async registerSeller() {
			const data = {
				firstname: this.firstname,
				lastname: this.lastname,
				username: this.username,
				email: this.email,
				password: this.password,
				confirm_password: this.confirm_password,
			};

			const result = await api.post("/auth/register", data);
			console.log(result);
		},
	},
};
</script>
