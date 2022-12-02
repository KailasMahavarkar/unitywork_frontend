<template>
	<div
		id="app"
		class="prose max-w-none bg-base-100"
		v-bind:data-theme="theme"
	>
		<div class="flex items-center justify-center w-full h-full">
			<div class="flex flex-col container w-full h-full">
				<navbar-component :toggleTheme="toggleTheme" :theme="theme" />
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
// import footerComponent from "./components/footerComponent.vue";
import navbarComponent from "./components/navbarComponent.vue";

const routes = [
	{
		name: "Home",
		path: "/",
	},
];

export default {
	name: "App",
	components: {
		"navbar-component": navbarComponent,
		// "footer-component": footerComponent,
	},
	data: () => ({
		routes: routes,
		theme: "light",
	}),

	methods: {
		toggleTheme() {
			// set theme to localStorage
			// update theme to data
			if (this.theme === "light") {
				this.theme = "dark";
			} else {
				this.theme = "light";
			}
		},
	},

	beforeMount() {},

	mounted() {},
};
</script>
