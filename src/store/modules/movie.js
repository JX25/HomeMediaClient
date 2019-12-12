import {movieApi} from '../api'

export default {
    namespaced: true,
    state:{
        movies: [],
        uploadMovie: '',
        uploadMovieThumbnail: '',
        uploadMetaData: {}
    },
    mutations:{
        setMovies(state, movies){
            state.movies = movies
        },
        setMovieToUpload(state, data){
            state.uploadMovie = data
        },
        setMovieThumbnailToUpload(state, data){
            state.uploadMovieThumbnail = data
        },
        setMovieMetaData(state, data){
            state.uploadMetaData = data
        },
        clearUpload(state){
            state.uploadMovie = ''
            state.uploadMovieThumbnail = ''
            state.uploadMetaData = ''
        }
    },
    getters:{
        movies: state => {return state.movies},
        uploadMovie: state => {return state.uploadMovie},
        uploadThumbnail: state => {return state.uploadMovieThumbnail},
        uploadMetaData: state => {return state.uploadMetaData},
    },
    actions:{
        allMovies: ({commit}) => {
            return new Promise( (res, rej) => {
                movieApi.get('all',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        console.log(result.data.response)
                        commit('setMovies', result.data.response)
                        res(result)

                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        uploadMetaData: ({commit}, payload)=>{
            return new Promise( (res, rej) => {
                movieApi.post('', payload, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        commit('setMovieMetaData', result)
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
                movieApi.patch('upload-thumbnail/'+payload.slug, formData, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    commit('setMovieThumbnailToUpload', result)
                    res(result)
                })
                .catch(error => {
                    rej(error)
                })              
            })
        },
        uploadMovie: ({commit}, payload)=>{
            let formData = new FormData()
            formData.append("file", payload.file)
            return new Promise( (res, rej) => {
                movieApi.patch('upload/'+ payload.slug, formData, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    commit('setMovieToUpload', result)
                    res(result)
                })
                .catch(error => {
                    rej(error)
                })              
            })
        }
    }
}