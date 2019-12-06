import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user';
import Movie from './modules/movie';
import Music from './modules/music';
import Photo from './modules/photo';

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    user: User,
    movie: Movie,
    music: Music,
    photo: Photo,
  }
})

export default store;
