<template>
	<div
		class="flex flex-col lg:flex-row mt-5 w-full h-full shadow min-h-[80vh] dark:bg-base-200 dark:shadow-dark dark:shadow-gray-900"
	>
		<div class="flex m-0 p-0 w-full lg:w-auto">
			<ul
				class="menu flex justify-center lg:justify-start menu-horizontal lg:menu-vertical lg:w-56 flex-1 bg-base-200 dark:bg-base-300 m-0 h-full p-2"
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
						<font-awesome-icon :icon="item.icon" class="text-xl" />
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
</template>

<script>
const routes = [
	{
		to: "adminSellersView",
		icon: "fa-solid fa-store",
		name: "Verify Sellers",
	},
	{
		to: "adminGigsView",
		icon: "fa-solid fa-user",
		name: "Verify Gigs",
	},
];

export default {
	name: "adminDashboardLayout",
	components: {},
	data: () => ({
		routes,
	}),
};
</script>

<style lang="scss" scoped></style>
