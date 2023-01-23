<template>
	<div>
		<searchBar :query="query" :searchFunction="searchFunction"> </searchBar>
	</div>
</template>

<script>
// this view is only for demo purposes
import searchBarComponentVue from "@/components/searchBarComponent.vue";

export default {
	name: "testView",
	components: {
		searchBar: searchBarComponentVue,
	},
	data: () => ({
		query: "",
	}),
	props: {},
	methods: {
		searchFunction() {
			console.log("searching");
		},
	},
};
</script>
