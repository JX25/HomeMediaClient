import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import SignIn from '../components/Login/SignIn.vue'
import SignUp from '../components/Login/SignUp.vue'
import MovieList from '../components/Movie/MovieList.vue'
import Music from '../components/Music/Music.vue'
import Photo from '../components/Photo/Photo.vue'
import UserSettings from '../components/User/UserSettings.vue'
import AddMovie from '../components/Movie/AddMovie'
import EditMovie from '../components/Movie/EditMovie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/sign_in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/sign_up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/admin/movie',
    name: 'MovieList',
    component: MovieList
  },
  {
    path: '/music',
    name: 'Music',
    component: Music
  },
  {
    path: '/photo',
    name: 'Photo',
    component: Photo
  },
  {
    path: '/settings',
    name: 'UserSettings',
    component: UserSettings
  },
  {
    path: '/admin/movie/add',
    name: 'AddMovie',
    component: AddMovie
  },
  {
    path: '/admin/movie/edit/:slug',
    name: 'EditMovie',
    component: EditMovie
  }

]

const router = new VueRouter({
  routes
})

export default router
