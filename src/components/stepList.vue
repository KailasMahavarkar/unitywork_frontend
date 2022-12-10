<template>
	<li
		v-bind:data-content="value ? '✓' : 'x'"
		class="step step-neutral"
		v-bind:class="{
			'step-warning font-extrabold': currentStep === expectedStep,
			'step-success': value,
		}"
	>
		<slot> </slot>
	</li>
</template>

<script>
export default {
	name: "stepList",
	props: {
		currentStep: Number,
		expectedStep: Number,
		value: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped></style>
