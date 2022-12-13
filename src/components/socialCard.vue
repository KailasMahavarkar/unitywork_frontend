<template>
	<div class="flex items-center justify-center my-5">
		<div class="mx-2" v-for="social in Object.keys(socials)" :key="social">
			<div class="flex justify-center items-center">
				<a
					target="_blank"
					:href="'https://' + social + '.com/' + socials[social]"
				>
					<font-awesome-icon
						:icon="['fab', social]"
						class="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 "
					/>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "socialCard",
	props: {
		socials: {
			type: Object,
			required: true,
		},
	},
};
</script>
