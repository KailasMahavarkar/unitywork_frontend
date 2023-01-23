<template>
	<fragment>
		<div class="container" :style="imgSize">
			<div v-for="i in [currentIndex]" :key="i" :style="imgSize">
				<img
					class="m-0 rounded-t-2xl"
					:width="width"
					:height="height"
					:src="currentImg"
				/>
			</div>

			<!-- hide controls if there is only one image -->
			<div v-if="(images.length > 1) && mode ==='normal'" class="prev" @click="prevHandler" href="#">&#10094;</div>
			<div v-if="(images.length > 1) && mode ==='normal'" class="next" @click="nextHandler" href="#">&#10095;</div>
		</div>
	</fragment>
</template>

<script>
export default {
	name: "imageSlider",
	data: () => ({
		timer: 0,
		currentIndex: 0,
	}),
	methods: {
		startSlide() {
			this.timer = setInterval(this.next, this.intervalVal);
		},
		stopSlide() {
			clearInterval(this.timer);
		},
		nextHandler() {
			this.currentIndex += 1;
		},
		prevHandler() {
			this.currentIndex -= 1;
		},
	},
	props: {
		images: {
			type: Array,
			required: true,
			default: () => [],
		},
		intervalVal: {
			type: Number,
			default: 3000,
		},
		height: {
			type: Number,
			default: 200,
		},
		width: {
			type: Number,
			default: 300,
		},

		mode: {
			type: String,
			required: false,
			default: "normal",
		}
	},

	computed: {
		currentImg: function () {
			return this.images[
				Math.abs(this.currentIndex) % this.images.length
			];
		},
		imgSize() {
			return {
				height: `${this.height}px`,
				width: `${this.width}px`,
			};
		},
	},
};
</script>

<style>
.container {
	position: relative;
}

img {
	width: 100%;
	height: 100%;
}
.prev,
.next {
	cursor: pointer;
	position: absolute;
	top: 40%;
	width: auto;
	padding: 16px;
	color: white;
	font-weight: bold;
	font-size: 18px;
	transition: 0.7s ease;
	border-radius: 0 4px 4px 0;
	text-decoration: none;
	user-select: none;
}
.next {
	right: 0;
}
.prev {
	left: 0;
}
.prev:hover,
.next:hover {
	background-color: rgba(0, 0, 0, 0.9);
}
</style>
