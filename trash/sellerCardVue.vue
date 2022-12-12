<section class="py-6">
    <div class="w-full px-4 mx-auto">
        <div
            class="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2"
        >
            <fragment v-for="gig in gigs" :key="gig.gigId">
            <!-- <gig-card
								:seller-avatar="gig.sellerAvatar"
            :seller-level="gig.sellerLevel"
            :seller-name="gig.sellerName"
            :gig-title="gig.gigTitle"
            :gig-price="gig.gigPrice"
            :gig-rating="gig.gigRating"
            :gig-thumbnail="gig.gigThumbnail"
            :gig-tags="gig.gigTags"
            :gig-id="gig.gigId"
							>
        </gig-card> -->
    </fragment>
</div>
				</div >
			</section >