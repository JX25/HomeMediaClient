export default {
    namespaced: true,
    state:{
        src: '',
        coverSrc: '',
        show: false,
        minimized: false,
        random: false,
        loop: false,
        showVolume: false,
        volume: 50,
        play: true,
        duration: 100,
        currentTime: 0,
        progress: 0,
        currentPlaylistIndex: -1,
        audioIndex: -1,
        playlist: [],
        playlistInOrder: [],
    },
    mutations:{
        setSrc(state, src){
            state.src = src
        },
        setCoverSrc(state, src){
            state.coverSrc = src
        },
        setShow(state, show){
            state.show = show
        },
        setMinimized(state, minimized){
            state.minimized = minimized
        },
        setRandom(state, random){
            state.random = random
        },
        setLoop(state, loop){
            state.loop = loop
        },
        setShowVolume(state, showVolume){
            state.showVolume = showVolume
        },
        setVolume(state, volume){
            state.volume = volume
        },
        setPlay(state, play){
            state.play = play
        },
        setDuration(state, duration){
            state.duration = duration
        },
        setProgress(state, progress){
            state.progress = progress
        },
        setCurrentPlaylistIndex(state, index){
            state.currentPlaylistIndex = index
        },
        setAudioIndex(state, index){
            state.audioIndex = index
        },
        setPlaylist(state, playlist){
            state.playlist = playlist
        },
        setPlaylistInOrder(state, playlist){
            state.playlistInOrder = playlist
        },
        addToPlaylist(state, audio){
            state.playlist.push(audio)
        },
        removeFromPlaylist(state, index){
            delete state.playlist[index]
        },
        shufflePlaylist(state){
            for(let i = (state.playlist.length; i > 0; i--){
                const j = Math.floor(Math.random() * i)
                const temp = array[i]
                array[i] = array[j]
                array[j] = temp
              }
        }
    },
    getters:{
        audioPlayer: state => {return state},
        getSrc: state =>{return state.src},
        getCoverSrc: state =>{return state.coverSrc},
        getShow: state =>{return state.show},
        getMinimized: state =>{return state.minimized},
        getPlay: state =>{return state.play},
        getVolume: state =>{return state.volume},
        getDuration: state =>{return state.duration},
        getCurrentTime: state =>{return state.currentTime},
        getProgress: state =>{return state.progress},
        getPlaylist: state => {return state.playlist},
        getPlaylistInOrder: state =>{return state.playlistInOrder},
        getCurrentPlaylistIndex:state =>{return state.currentPlaylistIndex},
        getAudioIndex: state => {return state.audioIndex},
    },
    actions: {
        changeSource: ({commit}, src) => {
            commit("setSrc", src)
        },
        changeCoverSource: ({commit}, src) => {
            commit("setCoverSrc", src)
        },
        showAudioPlayer: ({commit}) =>{
            commit('setShow', true)
        },
        hideAudioPlayer: ({commit}) =>{
            commit('setShow', false)
        },
        showVolume: ({commit}) =>{
            let show = !this.state.showVolume
            commit('setShowVolume', show)
        },
        minimizeAudioPlayer: ({commit},) =>{
            commit('setMinimized', true)
        },
        unminimizeAudioPlayer: ({commit}) =>{
            commit('setMinimized', false)
        },
        startAudio: ({commit}) =>{
            commit('setPlay', true)
        },
        pauseAudio: ({commit}) =>{
            commit('setPlay', false)
        },
        stopAudio: ({commit}) =>{
            commit('setCurrentTime', 0),
            commit('setPlay', false)
        },
        changeLoop: ({commit}, value) =>{
            console.log("X5D")
            commit('setLoop', value)
        },
        changeVolume: ({commit}, volume) =>{
            commit('setVolume', volume)
        },
        changeIndex: ({commit}, index) =>{
            commit('setAudioIndex', index)
        },
        changePlaylistIndex: ({commit}, index) =>{
            commit('setCurrentPlaylistIndex', index)
        },
        updateProgress: ({commit}, progress) =>{
            commit('setProgress', progress)
        },
        addToPlaylist: ({commit}, data) =>{
            commit('addToPlaylist', data)
        },
        removeFromPlaylist: ({commit}, index) =>{
           commit('removeFromPlaylist', index) 
        },
        removePlaylist: ({commit},) =>{
            commit('setPlaylist', [])
        },
        shufflePlaylist: ({commit, state}) =>{
            commit('setRandom', true)
            commit('setPlaylistInOrder', state.playlist)
            commit('shufflePlaylist')
        },
        unshufflePlaylist:({commit, state}) => {
            commit('setRandom', false)
            commit('setPlaylist', state.playlistInOrder)
        }
    }
}