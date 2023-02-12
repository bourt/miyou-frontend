import axios from 'axios';
import type {AxiosResponse} from "axios";
import {log} from "util";

axios.defaults.baseURL = "http://localhost:8080/api";

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        const data = response.data.data;
        const code = response.data.code;
        if(code == 200) {
            console.log('成功，返回数据中···')
            return data
        } else {
            console.log('失败，查找问题中···')
            let err: string;
            switch (code) {
                case 201:
                    err = '创建完成'
                    break
                case 401:
                    err = '未授权'
                    break
                case 403:
                    err = '禁止访问'
                    break
                case 404:
                    err = '没有找到'
                default:
                    err = '未知错误'
                    break
            }
            alert(err)
        }
    }, (error) => {
        return Promise.reject(error.message)
    }
)

export default axios
