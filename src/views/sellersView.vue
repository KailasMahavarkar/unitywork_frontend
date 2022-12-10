<template>
	<fragment> </fragment>
</template>

<script>
import api from "@/api";
import { handleCustomError } from "@/helper";
export default {
	name: "sellersView",
	components: {},
	data: () => ({
		sellers: [],
	}),
	props: {},
    mounted() {
        this.getSellers();
    },
	methods: {
		async getSellers() {
			// get the sellers from the api
			try {
				const result = await api.get("/sellers");

				if (result.status === 200) {
					this.sellers = result.data.data;
				}

                console.log(this.sellers);

			} catch (error) {
				handleCustomError(error);
			}
		},
	},
};
</script>
