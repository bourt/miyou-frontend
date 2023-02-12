import { defineStore } from 'pinia'
import { UserInfo } from '@/api/user'
import { reactive } from "vue";

export const useStore = defineStore('main', {
    state: () => ({
        userData: <UserInfo>{}
    }),
    actions: {
        addUser(data: UserInfo) {
            this.userData = {...data}
        }
    }
})