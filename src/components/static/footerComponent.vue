<template>
	<fragment>
		<footer
			class="mt-10 footer footer-center p-4 bg-base-200 rounded-t-lg text-base-content"
		>
			<div>
				<p>Copyright © {{ year }} | UnityWork</p>
			</div>
		</footer>
	</fragment>
</template>

<script>
export default {
	name: "footerComponent",
	data() {
		return {
			year: new Date().getFullYear(),
		};
	},

	computed: {},
};
</script>
