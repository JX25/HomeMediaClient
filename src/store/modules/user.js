import {userApi} from '../api';



export default {
    namespaced: true,
    state:{
       token:  '',
       type: 0, 
       users: [],
    },
    mutations:{
        setToken(state, token){
            state.token = token
            localStorage.setItem("token", token)
        },
        setType(state, type){
            state.type = type
            localStorage.setItem("type", type)
        },
        setUsers(state, users){
            state.users = users
        },
        pass(state){state}
    },
    getters:{
        token: state => {return state.token},
        type: state => {return state.type},
        user: state => {return state.user}
    },
    actions:{
        login: ({commit}, user) => {
            return new Promise( (res, rej) => {
                userApi.post('login', user, {headers: {'Content-Type':'application/json'}})
                    .then(result => {
                        const token = result.data.response.token
                        const type = result.data.response.type
                        commit('setToken', token)
                        commit('setType',type)
                        res(result.data.response)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        register: ({commit}, userData) => {
            return new Promise( (res, rej) => {
                userApi.post('', userData, {headers: {'Content-Type': 'application/json'}})
                .then( result => {
                    console.log(result)
                    commit('pass')
                    res(result)
                })
                .catch(error => {
                    console.log(error)
                    rej(error)
                })
            })
        },
        clear: ({commit}) => {
            commit('setToken', '')
            commit('setType','')
            commit('setUsers', [])
        }
    }
}