<template>
	<div>
		<div class="card__image">
			<img src="{state.images[x]}" alt="" />
		</div>
		<div class="card__control">
			<div class="card__control__button">
				<div>
					<div class="card__upload__text">{`Upload image ${x}`}</div>
				</div>
			</div>
			<div class="card__control__button">
				<div class="card__upload__delete">delete</div>
			</div>
		</div>
	</div>
</template>

<script>
// export component
export default {
	name: "imageUploaderComponent",
	data() {
		return {};
	},
	methods: {},
};
</script>
