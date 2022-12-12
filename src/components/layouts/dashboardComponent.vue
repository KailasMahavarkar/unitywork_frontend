<template>
	<fragment>
		<div
			class="flex flex-col lg:flex-row mt-5 w-full h-full shadow min-h-[80vh] dark:bg-base-200 dark:shadow-dark dark:shadow-gray-900"
		>
			<div class="flex m-0 p-0 w-full lg:w-auto">
				<ul
					class="menu flex justify-center lg:justify-start  menu-horizontal lg:menu-vertical lg:w-56 flex-1 bg-base-200 dark:bg-base-300 m-0 h-full p-2"
				>
					<li
						v-for="item in routes"
						:key="item.name"
						class="tooltip"
						:data-tip="item.name"
					>
						<router-link
							:to="{ name: item.to }"
							:class="{
								active: item.to === $route.name,
							}"
						>
							<font-awesome-icon
								:icon="item.icon"
								class="text-xl"
							/>
							<span class="hidden lg:block">
								{{ item.name }}
							</span>
						</router-link>
					</li>
				</ul>
			</div>

			<div class="flex-1">
				<slot> </slot>
			</div>
		</div>
	</fragment>
</template>

<script>
const routes = [
	{
		to: "sellerDashboardView",
		icon: "fa-solid fa-house",
		name: "Home",
	},
	{
		to: "sellerGigCreateEditorView",
		icon: "fa-solid fa-add",
		name: "Create Gig",
	},
	{
		to: "sellerVerificationEditorView",
		icon: "fa-solid fa-circle-check",
		name: "Verify Seller",
	},
	{
		to: "sellerProfileEditorView",
		icon: "fa-solid fa-user",
		name: "Seller Profile",
	},
	{
		to: "sellerSocialsEditorView",
		icon: "fa-brands fa-facebook",
		name: "Social Links",
	},
];

export default {
	name: "dashboardComponent",
	components: {},
	data: () => ({
		routes,
	}),
	props: {},
	methods: {},
};
</script>
