//import {movieApi} from '../api'

export default {
    namespaced: true,
    state:{
        src: '',
        show: false,
        play: true,
        duration: 100,
        currentTime: 0,
        fullscreen: false,
        progress: 0,
    },
    mutations:{
        setSrc(state, src){
            state.src = src
        },
        setShow(state, show){
            state.show = show
        },
        setPlay(state, play){
            state.src = play
        },
        setDuration(state, duration){
            state.src = duration
        },
        setCurrentTime(state, currentTime){
            state.src = currentTime
        },
        setFullscreen(state, fullscreen){
            state.fullscreen = fullscreen
        },
        setProgress(state, progress){
            state.progress = progress
        }
    },
    getters:{
        moviePlayer: state => {return state},
        getSrc: state => {return state.src},
        getShow: state => {return state.show},
        getPlay: state => {return state.play},
        getDuration: state => {return state.duration},
        getCurrentTime: state => {return state.currentTime},
        getFullscreen: state => {return state.fullscreen},
        getProgress: state => {return state.progress},
    },
    actions:{
        changeSource: ({commit}, src) => {
            commit("setSrc", src)
        },
        showVideoPlayer: ({commit}, src) => {
            commit("setSrc", src)
            commit("setShow", true)
        },
        hideVideoPlayer: ({commit}) => {
            commit("setFullscreen", false)
            commit("setShow", false)
        },
        startVideo: ({commit}) => {
            commit("setPlay", true)
        },
        pauseVideo: ({commit}) => {
            commit("setPlay", false)
        },
        showFullscreen: ({commit}) => {
            commit("setFullscreen", true)
        },
        minimizeFullscreen: ({commit}) => {
            commit("setFullscreen", false)            
        },
        updateProgress: ({commit}, value) => {
            commit("setProgress", value)
        }
    }

}