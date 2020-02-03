import { audioApi } from "../api"

export default {
    namespaced: true,
    state:{
        audios: [],
        audio: {},
        audioToEdit: {},
        uploadAudio: '',
        uploadAudioThumbnail: '',
        uploadMetaData: {},
        info: [],
        showInfo: false,
    },
    mutations:{
        setAudios(state, audios){
            state.audios = audios
        },
        setAudio(state, audio){
            state.audio = audio
        },
        setAudioToUpload(state, data){
            state.uploadAudio = data
        },
        setAudioThumbnailToUpload(state, data){
            state.uploadVideoThumbnail = data
        },
        setAudioMetaData(state, data){
            state.uploadMetaData = data
        },
        clearUpload(state){
            state.uploadAudio = ''
            state.uploadVideoThumbnail = ''
            state.uploadMetaData = ''
        },
        setAudioToEdit(state, audio){
            state.audioToEdit = audio
        },
        removeAudio(state, slug){
            state.audios.filter(x => x.slug != slug)
        },
        setInfo(state, info){
            state.info.push(info)
        },
        infoVisible(state, value){
            state.showInfo = value
        },
        clearInfo(state){
            state.info = []
        },
        updateAudioList(state, audio, index){
            state.audios[index] = audio
        }
    },
    getters:{
        audios: state => {return state.audios},
        audio: state => {return state.audio},
        videoBySlug: (state,slug) => {return state.audios.filter(audio => audio.slug == slug)},
        editAudio: state => {return state.audioToEdit},
        uploadAudio: state => {return state.uploadAudio},
        uploadThumbnail: state => {return state.uploadAudioThumbnail},
        uploadMetaData: state => {return state.uploadMetaData},
        infoVisibility: state => {return state.showInfo},
        audioInfo: state => {return state.info}
    },
    actions:{
        hideInfo: ({commit}) =>{
            commit("infoVisible", false)
        },
        showInfo: ({commit}) =>{
            commit("infoVisible", true)
        },
        setInfo: ({commit}, info) =>{
            commit("setInfo", info)
        },
        clearInfo: ({commit}) => {
            commit("clearInfo")
        },
        updateAudioList: ({commit}, audio, index) =>{
            commit("updateAudioList", audio, index)
        },
        audioDetail: ({commit}, audio) => {
            commit("setAudio", audio)
        },
        audioToEdit: ({commit}, audio) =>{
            commit("setAudioToEdit", audio)
        },
        audioBySlug: ({commit}, slug) =>{
            return new Promise( (res, rej) => {
                audioApi.get(slug + '/detail', {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    commit('setAudio', result.data.response)
                    res(result)
                })
                .catch(error =>{
                    rej(error)
                })
            })
        },
        getAllAudio: ({commit}) => {
            return new Promise( (res, rej) => {
                audioApi.get('all',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        console.log(result.data.response)
                        commit('setAudios', result.data.response)
                        res(result)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        uploadMetaData: ({commit}, payload)=>{
            return new Promise( (res, rej) => {
                audioApi.post("", payload, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        commit('setAudioMetaData', result)
                        res(result.data.response)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        updateMetaData: ({commit}, payload)=>{
            return new Promise( (res, rej) => {
                audioApi.put(payload.OLDslug, payload, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        commit('setAudioMetaData', result)
                        res(result.data.response)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        uploadThumbnail: ({commit},  payload)=>{
            let formData = new FormData()
            formData.append("thumbnail", payload.thumbnail)
            return new Promise( (res, rej) => {
                audioApi.patch('upload-thumbnail/'+payload.slug, formData, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    commit('setAudioThumbnailToUpload', result)
                    res(result)
                })
                .catch(error => {
                    rej(error)
                })              
            })
        },
        uploadAudio: ({commit}, payload)=>{
            let formData = new FormData()
            formData.append("file", payload.file)
            return new Promise( (res, rej) => {
                audioApi.patch('upload/'+ payload.slug, formData, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    commit('setAudioToUpload', result)
                    res(result)
                })
                .catch(error => {
                    rej(error)
                })              
            })
        },
        deleteAudio: ({commit}, slug) => {
            return new Promise( (res, rej) => {
                audioApi.delete(slug, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    console.log(result)
                    commit('removeAudio', slug)
                    res(result)
                })
                .catch(error => {
                    rej(error)
                })
            })
        }
    },
}