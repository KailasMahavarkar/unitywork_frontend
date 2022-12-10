<template>
	<div
		class="flex items-start justify-center w-full h-full shadow-md min-h-screen"
	>
		<div class="flex flex-col w-full max-w-[90%]">
			<div class="flex flex-col items-center w-full">
				<div class="flex flex-col">
					<img
						:src="gig.sellerAvatar"
						class="rounded-full m-0 p-0 shadow w-[150px] h-[150px]"
					/>
					<p
						class="mx-2 my-0 flex items-center justify-center text-lg text-left font-bold"
					>
						{{ gig.sellerName }}
					</p>
				</div>

				<div class="flex flex-col mx-2 items-start justify-end">
					<p
						class="mx-2 my-0 flex items-center justify-center badge badge-md"
					>
						Seller level

						<span class="font-bold">
							&nbsp;{{ gig.sellerLevel }}
						</span>
					</p>
				</div>
			</div>

			<div class="divider"></div>

			<div class="flex flex-col w-full items-center">
				<div class="flex flex-row flex-wrap">
					<div
						v-for="tag in gig.tags"
						:key="tag"
						class="badge badge-lg badge-outline m-1"
					>
						{{ tag }}
					</div>
				</div>
			</div>

			<div class="divider"></div>
			<div
				class="flex max-w-[80%] justify-between w-full text-start mx-5"
			>
				<div
					class="child:m-0 child:p-1"
					v-if="gig.blog"
					v-html="gig.blog"
				></div>
			</div>
			<div class="divider mb-0"></div>

			<!-- show packages -->
			<h2>Gig Pricing</h2>
			<div class="w-full flex justify-center ">
				<fragment v-for="pack in gig.pricings" :key="pack.id">
					<div
						v-if="
							pack.name &&
							pack.price &&
							pack.revisions &&
							pack.deliveryTime
						"
						class="card w-96 bg-base-100 shadow-xl mx-2"
					>
						<div class="overflow-x-auto">
							<table class="table w-full">
								<tbody>
									<tr>
										<td>Name</td>
										<td>{{ pack.name }}</td>
									</tr>
									<tr>
										<th>Price</th>
										<td>{{ pack.price }}</td>
									</tr>
									<tr>
										<th>Revisions</th>
										<td>{{ pack.revisions }}</td>
									</tr>
									<tr>
										<th>Revisions</th>
										<td>{{ pack.deliveryTime }}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</fragment>
			</div>
			<div class="divider"></div>
			<div class="card-actions justify-center my-5">
				<button class="btn btn-primary">Contact Seller</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		gig: {
			type: Object,
			required: true,
		},
	},
};
</script>
