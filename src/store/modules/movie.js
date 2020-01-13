import {movieApi} from '../api'

export default {
    namespaced: true,
    state:{
        movies: [],
        movie: {},
        movieToEdit: {},
        uploadMovie: '',
        uploadMovieThumbnail: '',
        uploadMetaData: {},
        info: [],
        showInfo: false,
        moviePlayer: {
            src: '',
            show: false,
            currentTime: 0,
            time: 0,
            sound: 0.5,
            play: true,
        }
    },
    mutations:{
        setMovies(state, movies){
            state.movies = movies
        },
        setMovie(state, movie){
            state.movie = movie
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
        },
        setMovieToEdit(state, data){
            state.movieToEdit = data
        },
        removeMovie(state, slug){
            state.movies.filter(x => x.slug != slug)
        },
        setMoviePlayerVisibility(state, visible){
            state.moviePlayer.show = visible
        },
        hideMoviePlayer(state){
            state.moviePlayer.show = false
        },
        setMoviePlayerSrc(state, src){
            state.moviePlayer.src = src
        },
        setInfo(state, info){
            console.log("ZZC",state.info, info)
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
        editMovie: state => {return state.movieToEdit},
        getMovie: state => {return state.movie},
        getMovieBySlug: (state, slug) => {return state.movies.filter(movie => {movie.slug === slug})},
        movies: state => {return state.movies},
        uploadMovie: state => {return state.uploadMovie},
        uploadThumbnail: state => {return state.uploadMovieThumbnail},
        uploadMetaData: state => {return state.uploadMetaData},
        moviePlayer: state => {return state.moviePlayer},
        infoVisibility: state => {return state.showInfo},
        movieInfo: state => {return state.info}
    },
    actions:{
        hideInfo : ({commit}) => {
            commit("infoVisible", false)
        },
        showInfo : ({commit}) => {
            commit("infoVisible", true)
        },
        setInfo : ({commit}, info) => {
            commit("setInfo", info)
        },
        clearInfo : ({commit}) => {
            commit("clearInfo")
        },
        hideVideoPlayer: ({commit}) => {
            commit("setMoviePlayerVisibility", false)
        },
        showVideoPlayer: ({commit}, src) => {
            commit("setMoviePlayerSrc", src)
            commit("setMoviePlayerVisibility", true)
        },
        movieToEdit: ({commit}, movie) => {
            commit("setMovieToEdit", movie)
        },
        movieBySlug: ({commit}, slug) => {
            return new Promise( (res, rej) => {
                movieApi.get(slug + '/detail', {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    console.log(result.data.response)
                    commit('setMovie', result.data.response)
                    res(result)
                })
                .catch(error => {
                    rej(error)
                })
            })
        },
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
                movieApi.post("", payload, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        commit('setMovieMetaData', result)
                        res(result.data.response)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        updateMetaData: ({commit}, payload)=>{
            return new Promise( (res, rej) => {
                movieApi.put(payload.OLDslug, payload, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        console.log(result)
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
        },
        deleteMovie: ({commit}, slug) => {
            return new Promise( (res, rej) => {
                movieApi.delete(slug, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .then(result => {
                    console.log(result)
                    commit('removeMovie', slug)
                    res(result)
                })
                .catch(error => {
                    rej(error)
                })
            })
        }
    }
}