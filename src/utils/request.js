import axios from 'axios'
import { getToken } from "./auth"

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000,
})


// 拦截 请求
instance.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false;
    if (getToken() && !isToken) {
        config.headers['Authorization'] = 'Token ' + getToken()
    }
    return config
}, error => {
    console.log('请求错误')
    Promise.reject(error)
})


// 拦截 响应
instance.interceptors.response.use(res => {
    return res;
}, error => {
    console.log('响应错误')
    console.log(error.response)
    // alert(error.response.data)
    return Promise.reject(error);
})

export default instance