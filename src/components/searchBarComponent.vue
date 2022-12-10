<template>
	<div class="flex form-control w-full max-w-[70%] my-5">
		<div class="input-group">
			<input
				:v-model="query"
				v-debounce:300ms="searchFunction"
				type="text"
				placeholder="Search gigs by keywords like website, nextjs, vue etc"
				class="input input-bordered w-full"
			/>
			<button class="btn btn-square">
				<font-awesome-icon :icon="['fas', 'search']">
				</font-awesome-icon>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "searchBarComponent",
	components: {},
	data: () => ({}),
	props: {
        query: {
            type: String,
            default: ''
        },
        searchFunction: {
            type: Function,
            default: () => {}
        }
    },
	methods: {
        
    },
};
</script>
