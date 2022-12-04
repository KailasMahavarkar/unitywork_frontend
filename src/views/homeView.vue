<template>
	<div class="flex flex-col shadow">
		<section class="flex items-center justify-center">
			<hero-section />
		</section>
		<div class="divider"></div>

		<!-- marketplace section -->
		<marketplace></marketplace>

		<!-- Why Choose US -->
		<faq-snippet></faq-snippet>

		<div class="m-[2em] text-primary">
			<button class="btn btn-wide btn-secondary">
				<span class="btn-text">Get Started</span>
			</button>
		</div>
	</div>
</template>

<script>
import heroSectionVue from "@/components/heroSection.vue";
import faqSnippet from "@/components/faqComponent.vue";
import marketplaceComponent from "@/components/marketplaceComponent.vue";

export default {
	name: "HomeView",
	components: {
		"faq-snippet": faqSnippet,
		"hero-section": heroSectionVue,
		marketplace: marketplaceComponent,
	},
	data: function () {
		return {};
	},

	mounted() {},
};
</script>
