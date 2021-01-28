import axios from 'axios'
// import { Message } from 'element-ui';
import { getToken } from "./auth"

const instance = axios.create({
    timeout: 1000 * 10,
})


// 拦截 请求
instance.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false;
    if (process.env.NODE_ENV === "production") {
        config.baseURL = "https://acad-access.pcl.ac.cn/"
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
  
    return Promise.reject(error);
})

export default instance