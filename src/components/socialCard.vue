<template>
	<div class="flex items-center justify-center my-5">
		<div
			class="flex justify-center items-center"
			v-for="social in Object.keys(socials)"
			:key="social"
		>
			<div
				class="flex justify-center items-center mx-2"
				v-if="socials[social]"
			>
				<a
					target="_blank"
					:href="'https://' + social + '.com/' + socials[social]"
				>
					<font-awesome-icon
						:icon="['fab', social]"
						class="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
					/>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { socialDefault } from "@/data/default";

export default {
	name: "socialCard",
	props: {
		socials: {
			type: Object,
			required: true,
			default: () => socialDefault,
		},
	},
};
</script>
