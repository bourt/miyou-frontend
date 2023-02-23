export interface AddTeam {
    "description": string,
    "expireTime": string,
    "maxNum": number,
    "name": string,
    "password": string | null,
    "status": number,
    "userId": number
}

export interface Team {
    createTime: string,
    description: string,
    expireTime: string,
    id: number,
    isDelete: number,
    maxNum: 1 | 2 | 3 | 4 | 5,
    name: string,
    password: string,
    status: number,
    updateTime: string,
    userId: number
}