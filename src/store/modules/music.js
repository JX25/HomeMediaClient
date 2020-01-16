import { musicApi } from "../api"

export default {
    namespaced: true,
    state:{
        musics: [],
        music: {},
        musicToEdit: {},
        uploadMusic: '',
        uploadMusicThumbnail: '',
        uploadMetaData: {},
        info: [],
        showInfo: false,
    },
    mutations:{
        setMusics(state, musics){
            state.musics = musics
        },
        setMusic(state, music){
            state.music = music
        },
        setMusicToUpload(state, data){
            state.uploadMusic = data
        },
        setMusicThumbnailToUpload(state, data){
            state.uploadMovieThumbnail = data
        },
        setMusicMetaData(state, data){
            state.uploadMetaData = data
        },
        clearUpload(state){
            state.uploadMusic = ''
            state.uploadMovieThumbnail = ''
            state.uploadMetaData = ''
        },
        setMusicToEdit(state, music){
            state.musicToEdit = music
        },
        removeMusic(state, slug){
            state.musics.filter(x => x.slug != slug)
        },
        setInfo(state, info){
            state.info.push(info)
        },
        infoVisible(state, value){
            state.showInfo = value
        },
        clearInfo(state){
            state.info = []
        }
    },
    getters:{
        musics: state => {return state.musics},
        music: state => {return state.music},
        movieBySlug: (state,slug) => {return state.musics.filter(music => music.slug == slug)},
        editMusic: state => {return state.musicToEdit},
        uploadMusic: state => {return state.uploadMusic},
        uploadThumbnail: state => {return state.uploadMusicThumbnail},
        uploadMetaData: state => {return state.uploadMetaData},
        infoVisibility: state => {return state.showInfo},
        musicInfo: state => {return state.musicInfo}
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
        musicDetail: ({commit}, music) => {
            commit("setMusic", music)
        },
        musicToEdit: ({commit}, music) =>{
            commit("setMusicToEdit", music)
        },
        musicBySlug: ({commit}, slug) =>{
            return new Promise( (res, rej) => {
                musicApi.get(slug + '/detail', {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    commit('setMusic', result.data.response)
                    res(result)
                })
                .catch(error =>{
                    rej(error)
                })
            })
        },
        getAllMusic: ({commit}) => {
            return new Promise( (res, rej) => {
                musicApi.get('all',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        console.log(result.data.response)
                        commit('setMusics', result.data.response)
                        res(result)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        uploadMetaData: ({commit}, payload)=>{
            return new Promise( (res, rej) => {
                musicApi.post("", payload, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        commit('setMusicMetaData', result)
                        res(result.data.response)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        updateMetaData: ({commit}, payload)=>{
            return new Promise( (res, rej) => {
                musicApi.put(payload.OLDslug, payload, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        commit('setMusicMetaData', result)
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
                musicApi.patch('upload-thumbnail/'+payload.slug, formData, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    commit('setMusicThumbnailToUpload', result)
                    res(result)
                })
                .catch(error => {
                    rej(error)
                })              
            })
        },
        uploadMusic: ({commit}, payload)=>{
            let formData = new FormData()
            formData.append("file", payload.file)
            return new Promise( (res, rej) => {
                musicApi.patch('upload/'+ payload.slug, formData, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    commit('setMusicToUpload', result)
                    res(result)
                })
                .catch(error => {
                    rej(error)
                })              
            })
        },
        deleteMusic: ({commit}, slug) => {
            return new Promise( (res, rej) => {
                musicApi.delete(slug, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    console.log(result)
                    commit('removeMusic', slug)
                    res(result)
                })
                .catch(error => {
                    rej(error)
                })
            })
        }
    },
}