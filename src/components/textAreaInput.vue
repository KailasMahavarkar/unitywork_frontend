<template>
	<div class="flex w-full flex-wrap">
		<div class="mb-2 mx-2 w-full">
			<label class="label">
				<span class="label-text font-extrabold">
					<slot> Description </slot>
				</span>
			</label>
			<textarea
				:v-model="value"
				class="textarea textarea-bordered w-full min-h-[200px]"
				:class="textareaClass"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: "formInput",
	components: {},
	data: () => ({}),
	props: {
		change: {
			type: Function,
			required: false,
		},
		textareaClass: {
			type: String,
			required: false,
		},
		value: {
			type: String,
			required: false,
		},
	},
};
</script>
