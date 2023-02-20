import { defineStore, createPinia } from 'pinia';
import { UserInfo } from '@/api/user';

export const pinia = createPinia();


export const useStore = defineStore('main', {
    state: () => ({
        userData: <UserInfo | null>null,
        notice: <string>''
    }),
    actions: {
        addUser(data: UserInfo) {
            this.userData = {...data};
        },
        deleteUser() {
            this.userData = null;
        },
        updateNotice(noticeTitle: string) {
            this.notice = '';
            setTimeout(() => {
                this.notice = noticeTitle;
            })
        }
    }
})