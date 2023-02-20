import axios from 'axios';
import type {AxiosResponse} from "axios";
import {useStore} from "@/store";

const store = useStore()


axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log("服务端响应数据", response)
        const data = response.data.data;
        const code = response.data.code;
        if(code === 0) {
            console.log('成功，返回数据中···')
            return data
        } else {
            console.log('失败，查找问题中···')
            let err: string;
            switch (code) {
                case 40000:
                    err = '请求参数错误'
                    break
                case 40001:
                    err = '请求数据为空'
                    break
                case 40002:
                    err = '账号或密码错误'
                    break
                case 40100:
                    err = '未登录'
                    break
                case 40101:
                    err = '无权限'
                    break
                case 50000:
                    err = '系统内部异常'
                    break
                default:
                    err = code;
                    break
            }
            store.updateNotice(err)
            return Promise.reject(err)
        }
    }, (error) => {
        return Promise.reject(error.message)
    }
)

export default axios
