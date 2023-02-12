export interface UserInfo {
    avatarUrl: string | null,
    createTime: string,
    email: string | null,
    gender: string | null,
    id: number,
    isDelete: boolean | null,
    phone: string | null,
    planetCode: string | null,
    tags: string | null,
    updateTime: string | null,
    userAccount: string,
    userPassword: string,
    userRole: number,
    userStatus: 0 | 1 | 2,
    username: string | null
}