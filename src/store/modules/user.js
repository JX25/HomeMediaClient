import {
    userApi, authHeader
} from '../api';



export default {
    namespaced: true,
    state: {
        login: '',
        email: '',
        token: '',
        type: '',
        age: '',
        active: '',
        users: [],
        admins: [],
    },
    mutations: {
        setLogin(state, login) {
            state.login = login
        },
        setEmail(state, email) {
            state.email = email
        },
        setToken(state, token) {
            state.token = token
            localStorage.setItem("token", token)
        },
        setType(state, type) {
            state.type = type
            localStorage.setItem("type", type)
        },
        setAge(state, age) {
            state.age = age
        },
        setUsers(state, users) {
            state.users = users
        },
        setAdmins(state, admins) {
            state.admins = admins
        },
        setActive(state, active){
            state.active = active
        },
        clear(state){
            state.login = ''
            state.email = ''
            state.age = ''
            state.users = []
            state.admins = []
            state.token = ''
            state.type = ''
            state.active = ''
        },
        pass(){
            return
        },
    },
    getters: {
        login: state => {
            return state.login
        },
        email: state => {
            return state.email
        },
        age: state => {
            return state.age
        },
        token: state => {
            return state.token
        },
        type: state => {
            return state.type
        },
        users: state => {
            return state.users
        },
        admins: state => {
            return state.admins
        },
        active: state => {
            return state.active
        }
    },
    actions: {
        login: ({
            commit
        }, user) => {
            return new Promise((res, rej) => {
                userApi.post('login', user, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        useCredentials: true
                    })
                    .then(result => {
                        let data = result.data.response
                        const token = data.token
                        const type = data.type
                        const login = data.username
                        const email = data.email
                        const age = data.age
                        const active = data.active
                        commit('setToken', token)
                        commit('setType', type)
                        commit('setLogin', login)
                        commit('setEmail', email)
                        commit('setAge', age)
                        commit('setActive', active)
                        res(data)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        register: ({commit}, data) => {
            //console.log(data)
            return new Promise((res, rej) => {
                userApi.post('', data)
                    .then(result => {
                        res(result)
                        commit('clear')
                    })
                    .catch(error => {
                        //console.log(error)
                        rej(error)
                    })
            })
        },
        clear: ({
            commit
        }) => {
            commit('clear')

        },

        getAllAdmins: ({commit}) =>{
            return new Promise((res, rej) => {
                userApi.get('all/admins', authHeader()).then((result) =>{
                    //console.log("SADASD", result.data.response)
                    commit('setAdmins', result.data.response)
                }).catch(error => {
                    //console.log(error)
                    rej(error)
                })
            })
        },
        getAllUsers: ({commit}) => {
            return new Promise((res, rej) =>{
                userApi.get('all', authHeader()).then(result =>{
                    commit('setUsers', result.data.response)
                    res("Users downloaded")
                }).catch(error => {
                    //console.log(error)
                    rej(error)
                })
            })
        },
        deleteUser: ({commit, getters}, login) => {
            //console.log("Z", login)
            return new Promise((res, rej) => {
                userApi.delete('login/' + login + '/' + getters.type, authHeader()).then(result =>{
                    //console.log(result)
                    commit('pass')
                    res(result)
                }).catch(error => {
                    //console.log(error)
                    rej(error)
                })
            })
        },
        editUser: ({commit, getters}, data) => {
            //console.log("Z", data)
            return new Promise((res, rej) => {
                userApi.patch('login/' + data.nickname + '/' + getters.type, data, authHeader()).then(result =>{
                    //console.log(result)
                    commit('pass')
                    res(result)
                }).catch(error => {
                    //console.log(error)
                    rej(error)
                })
            })
        },
        changePassword: (login, data) => {
            return new Promise((res, rej) => {
                userApi.patch('password/' + login, data, authHeader()).then(result =>{
                    //console.log(result)
                    res(result)
                }).catch(error => {
                    //console.log(error)
                    rej(error)
                })
            })
        }
    }
}