<template>
	<div
		class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg mt-16"
	>
		<!-- seller avatar & seller name -->
		<div class="flex flex-wrap justify-center">
			<div class="w-full px-4 flex justify-center">
				<div class="flex justify-center relative w-[150px] h-[90px]">
					<img
						:src="avatar"
						class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-12"
					/>
				</div>
			</div>
			<h3>{{ name }}</h3>

			<div class="w-full flex justify-center">
				<div class="flex justify-center space-x-6 align-center">
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="https://github.com/kailasmahavarkar"
						aria-label="GitHub"
					>
						<font-awesome-icon
							icon="fa-brands fa-github"
							class="w-4 h-4 fill-current"
						>
						</font-awesome-icon>
					</a>
					<a rel="noopener noreferrer" href="#" aria-label="Dribble">
						<font-awesome-icon
							icon="fa-brands fa-dribbble"
							class="w-4 h-4 fill-current"
						>
						</font-awesome-icon>
					</a>
					<a rel="noopener noreferrer" href="#" aria-label="Twitter">
						<font-awesome-icon
							icon="fa-brands fa-twitter"
							class="w-4 h-4 fill-current"
						>
						</font-awesome-icon>
					</a>
					<a rel="noopener noreferrer" href="#" aria-label="Email">
						<font-awesome-icon
							icon="fa-solid fa-envelope"
							class="w-4 h-4 fill-current"
						>
						</font-awesome-icon>
					</a>
				</div>
			</div>
			<div class="w-full px-4 text-center">
				<div class="flex justify-center">
					<div class="mr-4 p-3 text-center">
						<span
							class="text-xl font-bold block uppercase tracking-wide"
						>
							{{ likes }}
						</span>
						<span class="text-sm">Followers</span>
					</div>
					<div class="mr-4 p-3 text-center">
						<span
							class="text-xl font-bold block uppercase tracking-wide"
						>
							{{ gigCount }}
						</span>
						<span class="text-sm">Gigs</span>
					</div>
					<div class="mr-4 p-3 text-center">
						<span
							class="text-xl font-bold block uppercase tracking-wide"
						>
							{{ gigViews }}
						</span>
						<span class="text-sm"> Gig Views </span>
					</div>
				</div>
			</div>
		</div>
		<div class="divider h-[0.25rem]"></div>

		<!-- seller location, job and education -->
		<div class="text-center">
			<h4 class="text-gray-400">
				{{ location }}
			</h4>
			<div class="mb-2 mt-6">
				<i class="fas fa-briefcase mr-2 text-lg"></i>
				{{ job }}
			</div>
			<div class="mb-2">
				<i class="fas fa-university mr-2 text-lg"></i>
				{{ education }}
			</div>
		</div>
		<div class="divider h-[0.25rem]"></div>

		<!-- seller description -->
		<div class="flex flex-wrap justify-center text-center">
			<div class="w-full px-10">
				<p>
					{{ description }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		avatar: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
			required: true,
		},
		gigCount: {
			type: Number,
			required: true,
		},
		gigViews: {
			type: Number,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		job: {
			type: String,
			required: true,
		},
		education: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	computed: {},
};
</script>
