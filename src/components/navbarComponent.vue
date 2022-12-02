<template>
	<div class="navbar bg-base-100 shadow">
		<div class="navbar-start">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/>
					</svg>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li v-for="item in baseRoutes" :key="item.name">
						<router-link :to="item.path">
							{{ item.name }}
						</router-link>
					</li>
				</ul>
			</div>
			<router-link to="/">
				<a class="btn btn-ghost normal-case text-xl"> Unity Work </a>
			</router-link>
		</div>
		<div class="navbar-end">
			<router-link to="/register">
				<button class="btn btn-primary btn-outline mx-2">Join</button>
			</router-link>
			<button class="btn btn-primary btn-circle" @click="toggleTheme">
				<font-awesome-icon
					v-bind:icon="
						theme === 'dark' ? ['fas', 'sun'] : ['fas', 'moon']
					"
					class="w-5 h-5"
				/>
			</button>
		</div>
	</div>
</template>

<script>// @ts-nocheck

import { baseRoutes } from "@/router";

export default {
	name: "navbarComponent",
	data: () => ({
		baseRoutes,
	}),
	props: {
		toggleTheme: Function,
		theme: String,
	},
	methods: {},

	mounted: function () {},
};
</script>
