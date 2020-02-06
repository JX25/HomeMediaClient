import axios from 'axios'
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

export const address = 'http://192.168.0.81:8000'
//export const address = 'https://localhost:8000'


export const userApi = axios.create({
    baseURL: address + '/api/v1/user/'
});

export const videoApi = axios.create({
    baseURL: address + '/api/v1/video/'
});

export const audioApi = axios.create({
    baseURL: address + '/api/v1/audio/'
});

export const imageApi = axios.create({
    baseURL: address + '/api/v1/image/'
});

export const serverApi = axios.create({
    baseURL: address + '/api/v1/server/'
});

export function setToken(jwt) {
    console.log(jwt)
    applicationCache.defaults.headers.common["Authorization"] = `Bearer ${jwt}`
}

export function clearToken() {
    delete applicationCache.defaults.headers.common["Authorization"]
    Vue.localStorage.clear()
}

export function authHeader(){
    return {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}
}

