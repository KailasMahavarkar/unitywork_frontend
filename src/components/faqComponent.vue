<template>
	<!-- Why Choose US -->
	<section
		class="prose lg:prose-lg xl:prose-xl max-w-none dark:text-gray-400"
	>
		<div class="py-8 px-4 mx-auto sm:py-16 lg:px-6">
			<h3 class="mb-8 text-4xl tracking-tight font-extrabold">
				Frequently asked questions
			</h3>
			<div
				class="flex child:flex-1 gap-10 text-left border-t md:grid-cols-2"
			>
				<!--------------------
        ----- LEFT SIDE -----
        --------------------->
				<div>
					<div class="mb-10">
						<h3 class="flex items-center mb-4 text-lg font-bold">
							<font-awesome-icon
								:icon="['fas', 'question']"
								:class="questionIconClass"
							>
							</font-awesome-icon>
							What is UnityWork?
						</h3>
						<p>
							UnityWork is a platform that connects freelancers
							and clients. We provide a platform for freelancers
							to showcase their skills and for clients to find the
							right freelancer for their project.
						</p>
					</div>
					<div class="mb-10">
						<h3 class="flex items-center mb-4 text-lg font-bold">
							<font-awesome-icon
								:icon="['fas', 'question']"
								:class="questionIconClass"
							>
							</font-awesome-icon>
							How do I use unitywork?
						</h3>
						<p>
							To use UnityWork, you need to create an account.
							Once you have an account, you can create a profile
							and you can start creating gigs.
						</p>
					</div>
					<div class="mb-10">
						<h3 class="flex items-center mb-4 text-lg font-bold">
							<font-awesome-icon
								:icon="['fas', 'question']"
								:class="questionIconClass"
							>
							</font-awesome-icon>
							How do I create a gig?
						</h3>
						<p>
							Once you are logged-in go to 'create-gig' page and
							the website will guide you for each steps.
						</p>
					</div>
				</div>
				<!--------------------
        ----- RIGHT SIDE -----
        --------------------->
				<div>
					<div class="mb-10">
						<h3 class="flex items-center mb-4 text-lg font-bold">
							<font-awesome-icon
								:icon="['fas', 'question']"
								:class="questionIconClass"
							>
							</font-awesome-icon>
							Is this a free service?
						</h3>
						<p>
							Yes, this is a free service. We do not charge
							anything for using this service.
						</p>
					</div>
					<div class="mb-10">
						<h3 class="flex items-center mb-4 text-lg font-bold">
							<font-awesome-icon
								:icon="['fas', 'question']"
								:class="questionIconClass"
							>
							</font-awesome-icon>
							How does my gig rank in search?
						</h3>
						<p>
							Due to the nature of the service, we re-analyze your
							gig at fix interval of time, and if we find any
							issue with your gig, we will pause your gig and
							notify you with email.
						</p>
					</div>
					<div class="mb-10">
						<h3 class="flex items-center mb-4 text-lg font-bold">
							<font-awesome-icon
								:icon="['fas', 'question']"
								:class="questionIconClass"
							>
							</font-awesome-icon>
							How do I get paid?
						</h3>
						<div class="flex-col inline-flex">
							<p>
								This is an open marketplace to bring buyer and
								seller together, we do not handle any payment.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "faqComponent",
	data() {
		return {
			questionIconClass:
				"rounded-[50%] p-[0.2rem] h-[1rem] mr-[0.5rem] w-[1rem] bg-black text-white dark:text-black dark:bg-white  ",
		};
	},
	props: {},
	methods: {},
};
</script>
