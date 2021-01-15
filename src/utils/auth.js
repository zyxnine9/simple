import Vue from 'vue'

const tokenKey = 'Admin-Token'

export function getToken(){
    return Vue.$cookies.get(tokenKey)
}

export function setToken(token){
    return Vue.$cookies.set(tokenKey, token, '3d')
}

export function removeToken(){
    return Vue.$cookies.remove(tokenKey)
}