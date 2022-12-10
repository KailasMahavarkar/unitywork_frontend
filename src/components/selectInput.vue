<template>
	<select
		:name="vname"
		class="select select-bordered rounded-sm w-full flex-1"
		:class="vclass"
	>
		<slot>
			<option v-for="(element, index) in array" :key="index">
				{{ element }}
			</option>
		</slot>
	</select>
</template>

<script>
export default {
	name: "selectInput",
	data() {
		return {};
	},
	computed: {},
	methods: {},
	props: {
		vname: {
			type: String,
			required: true,
		},
		vclass: {
			type: String,
			required: false,
		},
		array: {
			type: Array,
			required: true,
		},
	},
};
</script>
