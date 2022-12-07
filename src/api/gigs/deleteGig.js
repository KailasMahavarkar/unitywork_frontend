import api from '@/api';
import { handleCustomError } from '@/helper';
import customToast from '@/toast';
import Swal from 'sweetalert2';

import store from '@/store';



function useAPI(onSuccess, onFailed) {

}

async function deleteGig(gigId, title) {
    const deleteGIGAfterConfirm = async (gigId) => {

        try {
            return await api.delete(URL, {
                headers: {
                    authorization:
                        "Bearer " + store.state.user.accessToken,
                },
            });
        } catch (error) {
            return handleCustomError(error);
        }
    };


}