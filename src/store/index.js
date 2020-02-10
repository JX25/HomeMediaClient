import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user'
import Video from './modules/video'
import videoPlayer from './modules/videoPlayer'
import Audio from './modules/audio'
import AudioPlayer from './modules/audioPlayer'
import Image from './modules/image'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    user: User,
    video: Video,
    videoPlayer: videoPlayer,
    audio: Audio,
    audioPlayer: AudioPlayer,
    image: Image,
  },
  plugins: [
    createPersistedState()
  ]
})

export default store;
