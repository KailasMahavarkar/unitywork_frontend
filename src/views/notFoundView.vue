
<!-- this page handles path not exists errors -->

<template>
	<div class="flex items-center justify-center shadow">
		<div class="px-40 py-20 m-[30px] rounded-md shadow-xl">
			<div class="flex flex-col items-center">
				<h1 class="font-bold text-blue-600 m-2 text-9xl">404</h1>

				<h6 class="mb-2 text-2xl font-bold text-center md:text-3xl">
					<span class="text-red-500">Oops!</span> Page not found
				</h6>

				<p class="mb-8 text-center md:text-lg">
					The page you’re looking for doesn’t exist, redirecting in
                    <span class="font-extrabold">
                        {{ count }} seconds
                    </span>
				</p>

				<router-link to="/">
					<button class="btn btn-primary btn-wide">Go to Home</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "notFoundView",
	data() {
		return {
			count: 10,
		};
	},
	mounted() {
		setInterval(() => {
			this.count--;
		}, 1000);

		setTimeout(() => {
			this.$router.push("/");
		}, 11 * 1000);
	},
	methods: {},
};
</script>
