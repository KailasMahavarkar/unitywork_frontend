<!-- this is a layout template -->
<!-- this component should only be used in view and not in any other component -->

<template>
	<div class="
    flex flex-col justify-center items-center my-5
    min-h-[80vh] w-full h-full 
    shadow p-5
    dark:bg-base-200
    ">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "pageComponent",
	components: {},
	data: () => ({}),
	props: {},
	methods: {},
};
</script>
