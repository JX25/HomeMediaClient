import axios from 'axios'
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)
import store from './index'

export const address = 'http://192.168.0.254:8000'
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



export function authHeader(){
    //console.log("662",store)
    return {headers: {'Authorization': 'Bearer '+store.state.user.token}}
}

