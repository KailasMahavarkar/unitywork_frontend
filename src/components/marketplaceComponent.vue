<template>
	<section class="flex flex-col items-center justify-center">
		<h1 class="text-3xl font-bold text-center">
			Open Marketplace for freelancers
		</h1>
        <marketplace-block>
		
    </marketplace-block>
	</section>
</template>

<script>
import marketplaceBlock from "./partials/marketplace.vue";

export default {
	name: "marketplaceComponent",
	components: {
		"marketplace-block": marketplaceBlock,
	},
	data: function () {
		return {
			replace: [
				{
					text: "Welcome to the CodeBuddy Platform",
					replace: "Stuck in code/design get help now",
				},
			],
		};
	},
};
</script>
