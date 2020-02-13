import {
    userApi
} from '../api';



export default {
    namespaced: true,
    state: {
        login: '',
        email: '',
        token: '',
        type: '',
        age: '',
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
        clear(state){
            state.login = ''
            state.email = ''
            state.age = ''
            state.users = []
            state.admins = []
            state.token = ''
            state.type = ''
        }
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
        user: state => {
            return state.user
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
                        const login = data.login
                        const email = data.email
                        const age = data.age
                        commit('setToken', token)
                        commit('setType', type)
                        commit('setLogin', login)
                        commit('setEmail', email)
                        commit('setAge', age)
                        res(result.data.response)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        register: (userData) => {
            return new Promise((res, rej) => {
                userApi.post('', userData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(result => {
                        res(result)
                    })
                    .catch(error => {
                        console.log(error)
                        rej(error)
                    })
            })
        },
        clear: ({
            commit
        }) => {
            commit('clear')

        }
    }
}