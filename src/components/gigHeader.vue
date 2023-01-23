<template>
	<div class="flex flex-col w-full items-center my-[50px]">
		<div class="flex flex-col w-[90%]">
			<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
				Gig Title
			</h2>
			<div class="flex">
				<input
					type="text"
					:value="gigTitle"
					placeholder="like I will create a 'your portfolio website'"
					class="input rounded-sm w-full shadow flex-1 dark:input-bordered"
					@input="
						$emit('update:gigTitle', Object($event.target).value)
					"
				/>
			</div>
		</div>

		<div class="flex flex-col w-[90%] mt-10">
			<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
				Gig Category
			</h2>
			<div class="flex">
				<select
					@change="
						$emit('update:gigCategory', Object($event.target).value)
					"
					class="input rounded-sm w-full shadow flex-1 font-bold dark:select-bordered"
				>
					<option selected>Select Category</option>
					<option v-for="category in gigTagsEnum" :key="category">
						{{ category }}
					</option>
				</select>
			</div>
		</div>

		<div class="flex flex-col w-[90%] mt-10">
			<!-- loop through tags -->

			<h2 class="text-left m-2 text-gray-500 dark:text-gray-300">
				Gig Tags
			</h2>

			<div class="flex flex-wrap">
				<!-- preview tags -->
				<div
					v-for="tag in gigTags"
					:key="tag"
					class="btn btn-outline no-animation mx-2"
				>
					{{ tag }}

					<button
						class="btn btn-sm btn-warning btn-circle mx-2"
						@click="removeTag(tag)"
					>
						x
					</button>
				</div>

				<!-- add tag -->
				<div
					class="flex items-center justify-center"
					v-if="gigTags.length < 5"
				>
					<input
						type="text"
						id="tag"
						v-model="tag"
						@keyup.enter="addTag"
						class="input rounded-sm w-full shadow flex-1 font-bold dark:input-bordered"
					/>

					<div
						class="flex mx-5 cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
						@click="addTag"
					>
						<span class="text-gray-500 dark:text-gray-300">+</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import customToast from "@/toast";
import { gigTagsEnum } from "@/data/data";

export default {
	name: "gigHeader",
	props: {
		gigTitle: String,
		gigTags: {
			type: Array,
			default: () => [],
		},
	},

	data: () => ({
		gigTagsEnum: gigTagsEnum,
		tag: "",
	}),

	computed: {
		tagsArray() {
			return this.gigTags;
		},
		isHeaderValid() {
			const isCategorySelected = this.gigCategory !== "Select Category";
			const isTitleFilled = this.gigTitle.length > 0;
			const isTagsFilled = this.gigTags.length > 0;
			const headerValid =
				isCategorySelected && isTitleFilled && isTagsFilled;
			this.$emit("update:isHeaderValid", headerValid);
			return headerValid;
		},
	},

	methods: {
		// tags
		addTag() {
			if (this.gigTags.includes(this.tag)) {
				return customToast({
					message: "Tag already exists",
					icon: "error",
				});
			}

			if (this.gigTags.length >= 5) {
				return customToast({
					message: "You can't add more than 5 tags",
					icon: "error",
				});
			}

			if (this.tag.length < 3) {
				return customToast({
					message: "Tag should be atleast 3 characters long",
					icon: "error",
				});
			}

			this.tagsArray.push(this.tag);
			this.tag = "";
			this.$emit("update:gigTags", this.tagsArray);
		},
		removeTag(tag) {
			const index = this.gigTags.indexOf(tag);
			this.tagsArray.splice(index, 1);
			this.$emit("update:gigTags", this.tagsArray);
		},
	},

	updated() {
		this.$emit("update:isHeaderValid", this.isHeaderValid);
	},

	mounted() {},

	destroyed() {},
};
</script>
