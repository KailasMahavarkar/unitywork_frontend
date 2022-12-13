<template>
	<div
		id="app"
		class="prose max-w-none bg-base-100 w-full h-full"
		v-bind:data-theme="theme"
	>
		<div class="flex items-start justify-center w-full h-full">
			<div class="flex flex-col container w-full h-full">
				<navbar-component>
					<template v-slot:theme>
						<button
							class="btn btn-primary btn-circle"
							@click="() => toggleTheme()"
						>
							<font-awesome-icon
								v-bind:icon="
									theme === 'dark'
										? ['fas', 'sun']
										: ['fas', 'moon']
								"
								class="w-5 h-5"
							/>
						</button>
					</template>
				</navbar-component>
				<router-view />
				<footer-component></footer-component>
			</div>
		</div>
	</div>
</template>

<script>
import footerComponent from "./components/static/footerComponent.vue";
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
		"footer-component": footerComponent,
	},
	data: () => ({
		routes: routes,
		theme: "light",
	}),

	methods: {
		toggleTheme() {
			this.theme = this.theme === "dark" ? "light" : "dark";

			// Save theme to local storage
			localStorage.setItem("theme", this.theme);
		},
	},

	beforeMount() {},

	mounted() {
		// Get theme from local storage
		this.theme = localStorage.getItem("theme") || "light";
	},
};
</script>
