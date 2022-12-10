<template>
	<div class="flex flex-wrap flex-1">
		<div class="mb-2 mx-2 w-full">
			<label class="label">
				<span class="label-text font-extrabold">
					<slot> FullName </slot>
				</span>
			</label>
			<input
				:type="type"
				:required="required"
				class="input input-bordered w-full"
				v-model="value"
				@input="$emit('input', value)"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: "formInput",
	components: {},
	data: () => ({
		value: "",
	}),
	props: {
		type: {
			type: String,
			required: false,
			default: "text",
		},
		required: {
			type: Boolean,
			required: false,
			default: false,
		},

		mode: {
			type: String,
			required: false,
			enum: ["single", "double"],
			default: "single",
		},
	},
	methods: {},
};
</script>
