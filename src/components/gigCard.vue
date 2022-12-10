<template>
	<div class="card shadow dark:border-gray-700 dark:border-[1px]">
		<!-- conditonal routing in routerlink -->
		<router-link
			:to="{
				name: 'gigView',
				params: { id: gigId },
			}"
		>
			<!-- gig thumbnail -->
			<figure class="mb-0 mt-0">
				<img
					class="w-full h-[250px] object-cover rounded-t-md"
					:src="gigThumbnail"
				/>
			</figure>
			<div class="card-body">
				<div class="flex">
					<!-- seller avatar -->
					<img
						:src="sellerAvatar"
						class="rounded-full shadow w-[80px] h-[80px] p-1 m-0"
					/>
					<div class="flex w-full m-auto justify-end">
						<div
							class="flex flex-col items-end justify-end"
							v-if="gigVerified || sellerVerified"
						>
							>
							<!-- seller name -->
							<div
								class="font-bold text-sm my-1"
								v-if="gigVerified"
							>
								<span class="text-info child:mx-2">
									Gig Verified
									<font-awesome-icon
										icon="fa-solid fa-circle-check"
									/>
								</span>
							</div>
							<!-- seller level -->
							<div
								class="font-bold text-sm my-1"
								v-if="sellerVerified"
							>
								<span class="text-info child:mx-2">
									Seller Verified
									<font-awesome-icon
										icon="fa-solid fa-circle-check"
									/>
								</span>
							</div>
						</div>
					</div>
				</div>

				<div class="flex font-extrabold">
					{{ sellerName }}
				</div>

				<!-- title and tags -->
				<div class="card-actions">
					<p class="text-start m-0 text-md line-clamp-3">
						{{ gigTitle }}
					</p>
					<span
						class="badge badge-outline"
						v-for="(item, index) in gigTags"
						:key="index"
					>
						{{ item }}
					</span>
				</div>

				<div class="divider h-[0.25rem] m-2"></div>
				<!-- likes -->
				<div class="flex items-center justify-center child:mx-2">
					<div
						class="badge badge-primary badge-outline tooltip"
						data-tip="likes"
					>
						{{ gigLikes }}
						<font-awesome-icon
							class="mx-2"
							icon="fa-solid fa-thumbs-up"
						/>
					</div>
					<div
						class="badge badge-error badge-outline tooltip"
						data-tip="dislikes"
					>
						{{ gigDislikes }}
						<font-awesome-icon
							class="mx-2"
							icon="fa-solid fa-thumbs-down"
						/>
					</div>
					<div class="badge badge-outline tooltip" data-tip="views">
						{{ gigViews }}
						<font-awesome-icon
							class="mx-2"
							icon="fa-solid fa-eye"
						/>
					</div>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
export default {
	name: "gigCard",
	data() {
		return {};
	},
	props: {
		sellerName: {
			type: String,
			required: true,
		},
		sellerLevel: {
			type: String,
			required: true,
		},
		sellerAvatar: {
			type: String,
			required: true,
		},

		sellerVerified: {
			type: Boolean,
			required: false,
			defualt: false,
		},
		gigVerified: {
			type: Boolean,
			required: false,
			defualt: false,
		},

		// gig id is unique and is used to route to the gig page
		gigId: {
			type: String,
			required: true,
		},
		gigLikes: {
			type: Number,
			required: true,
			default: 0,
		},
		gigDislikes: {
			type: Number,
			required: true,
			default: 0,
		},
		gigViews: {
			type: Number,
			required: true,
			default: 0,
		},

		gigRating: {
			type: String,
			required: true,
		},
		gigTitle: {
			type: String,
			required: true,
		},
		gigTags: {
			type: Array,
			required: true,
		},
		gigThumbnail: {
			type: String,
			required: true,
		},
	},
	methods: {},
};
</script>
