<template>
	<div class="mb-10">
		<h3 class="flex items-center mb-4 text-lg font-bold">
			<font-awesome-icon
				:icon="['fas', 'question']"
				class="rounded-[50%] p-[0.2rem] h-[1rem] mr-[0.5rem] w-[1rem] bg-black text-white dark:text-black dark:bg-white"
			>
			</font-awesome-icon>
			<slot name="title"> </slot>
		</h3>
		<p>
			<slot name="content"> </slot>
		</p>
	</div>
</template>

<script>
export default {
	name: "singleFaq",
	components: {},

	data() {
		return {};
	},
};
</script>
