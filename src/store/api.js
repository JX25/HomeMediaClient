import axios from 'axios'
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

export const userApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/user/'
});

export const movieApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/movie/'
});

export const musicApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/music/'
});

export const photoApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/photo/'
});

export const serverApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/server/'
});

export function setToken(jwt) {
    console.log(jwt)
    applicationCache.defaults.headers.common["Authorization"] = `Bearer ${jwt}`
}

export function clearToken() {
    delete applicationCache.defaults.headers.common["Authorization"]
    Vue.localStorage.clear()
}
