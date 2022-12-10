<template>
	<div class="flex justify-between bg-base-100 shadow p-3">
		<div class="flex">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<font-awesome-icon
						icon="fa-solid fa-bars"
						class="w-5 h-5"
					/>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<div>
						<li v-for="item in navbarOpen" :key="item.name">
							<router-link :to="item.path">
								{{ item.name }}
							</router-link>
						</li>
					</div>

					<div v-if="authed">
						<li v-for="item in navbarAuthed" :key="item.name">
							<router-link :to="item.path">
								{{ item.name }}
							</router-link>
						</li>
					</div>

					<div v-if="!authed">
						<li v-for="item in navbarNotAuthed" :key="item.name">
							<router-link :to="item.path">
								{{ item.name }}
							</router-link>
						</li>
					</div>
				</ul>
			</div>
			<router-link :to="authed ? '/gigs' : '/'">
				<a class="btn btn-ghost normal-case text-xl"> Unity Work </a>
			</router-link>
		</div>

		<div class="flex">
			<div class="child:mx-1 hidden lg:flex">
				<!-- explore sellers -->
				<link-button
					button-class="btn-ghost btn-outline "
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
					<button class="btn btn-primary btn-outline">
						register
					</button>
				</router-link>

				<!-- welcome message -->
				<link-button
					v-if="authed"
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
			</div>
			<slot name="theme"> </slot>
		</div>
	</div>
</template>

<script>
import linkButtonVue from "./linkButton.vue";

const navbarOpen = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "Gigs",
		path: "/gigs",
	},
	{
		name: "Sellers",
		path: "/sellers",
	},
];

const navbarNotAuthed = [
	{
		name: "Register",
		path: "/register",
	},
	{
		name: "Login",
		path: "/login",
	},
];

const navbarAuthed = [
	{
		name: "Seller Dashboard",
		path: "/seller-dashboard",
	},
];

export default {
	name: "navbarComponent",
	components: {
		"link-button": linkButtonVue,
	},
	data: () => ({
		user: {},
		authed: false,
		navbarOpen: navbarOpen,
		navbarNotAuthed: navbarNotAuthed,
		navbarAuthed: navbarAuthed,
	}),
	computed: {},
	props: {},
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
