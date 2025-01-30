import { defineStore } from "pinia";
import axiosClient from "../axios";

const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        async fetchUser () {
            return axiosClient.get('api/user').then(({data}) => {
                this.user = data;
            })
        }
    }
})

export default useUserStore;