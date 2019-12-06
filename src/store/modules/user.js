import {userApi} from '../api';
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

export default {
    state:{
       token: '',
       type: '', 
       user: {},
    },
    mutations:{
        setToken(state, token){
            state.token = token
        },
        setType(state, type){
            state.type = type
        }
    },
    getters:{
        token: state => state.token,
        type: state => state.type,
        user: state => state.user
    },
    actions:{
        login: ({commit}, user) => {
            return new Promise( (res, rej) => {
                userApi.post('login', user, {headers: {'Content-Type':'application/json'}})
                    .then(result => {
                        commit('setToken', result.data.response.token)
                        Vue.localStorage.set('token', result.data.response.token)
                        commit('setType',result.data.response.type)
                        Vue.localStorage.set('type',result.data.response.type)
                        console.log(result)
                        res(result.data.response)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        }
    }
}