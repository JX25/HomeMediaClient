import {serverApi, authHeader} from "../api"
import parse from "../../plugins/parseServerData"
export default {
    namespaced: true,
    state:{
        memory: [],
        disk: [],
        network: [],
        cpu: [],
    },
    mutations:{
        setMemory(state, mem){
            state.memory = mem
        },
        setDisk(state, disk){
            state.disk = disk
        },
        setNetwork(state, net){
            state.network = net
        },
        setCPU(state, cpu){
            state.cpu = cpu
        }
    },
    getters:{
        memory: state => {return state.memory},
        disk: state => {return state.disk},
        network: state => {return state.netowrk},
        cpu: state => {return state.cpu}
    },
    actions:{ //
        loadData: ({commit}) =>{
            return new Promise((res, rej) => {
                serverApi.get('info', authHeader())
                .then(result =>{
                    let data = parse(result.data.params)
                    commit("setMemory", data.memory)
                    commit("setDisk", data.disk)
                    commit("setNetwork", data.network)
                    commit("setCPU", data.cpu)
                    res(result)
                }).catch(error => {
                    rej(error)
                })
            })
        }
    }
}