import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user';
import Movie from './modules/movie';
import moviePlayer from './modules/moviePlayer';
import Music from './modules/music';
import Photo from './modules/photo';

import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    user: User,
    movie: Movie,
    moviePlayer: moviePlayer,
    music: Music,
    photo: Photo,
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, {expires: 3, secure: true})
    })
  ]
})

export default store;
