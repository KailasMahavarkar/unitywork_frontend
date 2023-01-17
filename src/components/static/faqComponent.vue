<template>
	<section
		class="prose lg:prose-lg xl:prose-xl max-w-none dark:text-gray-400"
	>
		<div class="py-8 px-4 mx-auto sm:py-16 lg:px-6">
			<h2 class="mb-8 tracking-tight font-extrabold">
				Frequently asked questions
			</h2>
			<div
				class="flex flex-col child:flex-1 md:flex-row child:mx-5 text-left border-t md:grid-cols-2"
			>
				<!----LEFT SIDE ---->
				<div>
					<faq>
						<template #title> What is UnityWork? </template>
						<template #content>
							UnityWork is a platform that connects freelancers
							and clients. We provide a platform for freelancers
							to showcase their skills and for clients to find the
							right freelancer for their project.
						</template>
					</faq>

					<faq>
						<template #title> How do I use unitywork? </template>
						<template #content>
							To use UnityWork, you need to create an account.
							Once you have an account, you can create a profile
							and you can start creating gigs.
						</template>
					</faq>

					<faq>
						<template #title> How do I create a gig? </template>
						<template #content>
							Once you are logged-in go to 'create-gig' page and
							the website will guide you for each steps.
						</template>
					</faq>
				</div>
				<!----RIGHT SIDE ---->
				<div>
					<faq>
						<template #title> Is this a free service? </template>
						<template #content>
							Yes, this is a free service. We do not charge
							anything for using this service.
						</template>
					</faq>

					<faq>
						<template #title>
							How does my gig rank in search?
						</template>
						<template #content>
							Due to the nature of the service, by default 
							every gig is ranked equally. 
						</template>
					</faq>

					<faq>
						<template #title>How do I get paid?</template>

						<template #content>
							This is an open marketplace to bring buyer and
							seller together, we do not handle any payment.
						</template>
					</faq>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import singleFaqVue from "../partials/singleFaq.vue";
export default {
	name: "faqComponent",
	components: {
		faq: singleFaqVue,
	},

	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
