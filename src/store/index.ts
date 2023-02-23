import { defineStore, createPinia } from 'pinia';
import { type UserInfo } from '@/api/user';
import { type Team } from '@/api/team';

export const pinia = createPinia();


export const useStore = defineStore('main', {
    state: () => ({
        userData: <UserInfo | null>null,
        otherUser: <UserInfo>{},
        notice: <string>'',
        publicTeam: <Array<Team>>[],
        privateTeam: <Array<Team>>[],
        mineTeam: <Array<Team>>[]
    }),
    actions: {
        addUser(data: UserInfo) {
            this.userData = {...data};
        },
        addOtherUser(data: UserInfo) {
            this.otherUser = {...data};
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