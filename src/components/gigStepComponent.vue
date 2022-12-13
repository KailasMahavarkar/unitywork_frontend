<template>
	<div class="flex flex-col items-center w-full shadow-lg">
		<!-- STEPS -->
		<ul class="steps" v-if="showSteps">
			<!-- create title, set category and tags -->
			<step-list
				:value="isHeaderValid"
				:currentStep="step"
				:expectedStep="1"
			>
				Create Header
			</step-list>

			<!-- create body -->
			<step-list
				:value="isBodyValid"
				:currentStep="step"
				:expectedStep="2"
			>
				Create Body
			</step-list>

			<!-- create pricing -->
			<step-list
				:value="isPricingValid"
				:currentStep="step"
				:expectedStep="3"
			>
				Create Pricing
			</step-list>

			<!-- upload images -->
			<step-list
				:value="isImagesValid"
				:currentStep="step"
				:expectedStep="4"
			>
				Upload Images
			</step-list>

			<!-- preview -->
			<step-list
				:value="step === 5"
				:currentStep="step"
				:expectedStep="5"
			>
				Preview & Publish
			</step-list>
		</ul>

		<!-- child component -->
		<slot></slot>
	</div>
</template>

<script>
import stepListVue from "@/components/stepList.vue";

export default {
	name: "gigStepComponent",
	components: {
		"step-list": stepListVue,
	},
	props: {
		step: {
			type: Number,
			required: true,
		},
		showSteps: {
			type: Boolean,
			required: false,
			default: true,
		},
		isHeaderValid: {
			type: Boolean,
			required: true,
		},
		isBodyValid: {
			type: Boolean,
			required: true,
		},
		isPricingValid: {
			type: Boolean,
			required: true,
		},
		isImagesValid: {
			type: Boolean,
			required: true,
		},
	},
};
</script>
