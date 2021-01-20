import axios from 'axios'
import { getToken } from "./auth"

const instance = axios.create({
    baseURL: "http://192.168.203.66:20002",
    timeout: 20000,
})


// 拦截 请求
instance.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false;
   if(process.env.NODE_ENV === "production"){
        const pref = config.url.split("/")[1]
        if (pref === "api")  config.baseURL = "http://health.pcl.ac.cn/"
        else if (pref === "get_token") config.baseURL = "http://health.pcl.ac.cn/"
    }
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