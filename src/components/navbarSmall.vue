<template>
	<fragment>
		<link-button
			button-class="btn-ghost btn-outline"
			to="/sellers"
			icon="fa-solid fa-user"
		>
			Sellers</link-button
		>

		<link-button
			button-class="btn-ghost btn-outline"
			to="/gigs"
			icon="fa-solid fa-star"
		>
			Gigs
		</link-button>

		<!-- register -->
		<router-link to="/register" v-if="!authed">
			<button class="btn btn-primary btn-outline">register</button>
		</router-link>

		<!-- welcome message -->
		<link-button
			v-if="this.$store.state.authed"
			button-class="btn-ghost btn-outline"
			to="/seller-dashboard"
			icon="fa-solid fa-user"
		>
			Go to {{ this.$store.state.user.username }}'s Dashboard
		</link-button>

		<!-- login -->
		<router-link to="/login" v-if="!authed">
			<button class="btn btn-secondary btn-outline">login</button>
		</router-link>

		<!-- logout -->
		<button
			class="btn btn-error btn-outline"
			@click="logoutHandler"
			v-if="authed"
		>
			logout
		</button>

		<!-- theme -->
		<button class="btn btn-primary btn-circle" @click="() => toggleTheme()">
			<font-awesome-icon
				v-bind:icon="
					theme === 'dark' ? ['fas', 'sun'] : ['fas', 'moon']
				"
				class="w-5 h-5"
			/>
		</button>
	</fragment>
</template>

<script>
import { baseRoutes } from "@/router";
import linkButtonVue from "./linkButton.vue";

export default {
	name: "navbarComponent",
	components: {
		"link-button": linkButtonVue,
	},
	data: () => ({
		baseRoutes,
		authed: false,
		user: {},
	}),
	props: {
		toggleTheme: Function,
		theme: String,
	},
	methods: {
		logoutHandler() {
			this.$store.commit("setAuthentication", false);
			this.$store.commit("setUser", {});
		},
	},

	// authenicate the user and update component
	mounted() {
		this.authed = this.$store.state.authed;
		this.$store.subscribe((mutation, state) => {
			if (mutation.type === "setAuthentication") {
				this.authed = state.authed;
			}
		});
	},
};
</script>
