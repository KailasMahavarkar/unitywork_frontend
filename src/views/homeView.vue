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

		<!-- get started redirects to login -->
		<router-link to="/register">
			<div class="m-[2em] text-primary">
				<button class="btn btn-wide btn-secondary">
					<span class="btn-text">Get Started</span>
				</button>
			</div>
		</router-link>
	</div>
</template>

<script>
import heroSection from "@/components/static/heroSection.vue";
import faqSnippet from "@/components/static/faqComponent.vue";
import marketplaceComponent from "@/components/static/marketplaceComponent.vue";

export default {
	name: "HomeView",
	components: {
		"faq-snippet": faqSnippet,
		"hero-section": heroSection,
		marketplace: marketplaceComponent,
	},
	data: function () {
		return {};
	},

	mounted() {},
};
</script>
