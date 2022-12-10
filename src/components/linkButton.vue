<template>
	<router-link :to="to">
		<button class="btn" :class="buttonClass">
			<font-awesome-icon
				:class="iconClass ? iconClass : 'mx-2'"
				:icon="icon"
			>
			</font-awesome-icon>
			<slot>
				{{ text || "submit" }}
			</slot>
		</button>
	</router-link>
</template>

<script>
export default {
	name: "linkButton",
	components: {},
	data: () => ({}),
	props: {
		to: {
			type: [Object, String],
			required: true,
		},
		icon: {
			type: [Array, String],
			required: true,
		},
		text: {
			type: String,
			required: false,
		},
		iconClass: {
			type: String,
			required: false,
		},
		buttonClass: {
			type: String,
			required: false,
		},
	},
};
</script>
