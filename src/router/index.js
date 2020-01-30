import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import SignIn from '../components/Login/SignIn.vue'
import SignUp from '../components/Login/SignUp.vue'
import VideoList from '../components/Video/VideoList.vue'
import Audio from '../components/Audio/Audio.vue'
import AddAudio from '../components/Audio/AddAudio.vue'
import AudioList from '../components/Audio/AudioList.vue'
import Photo from '../components/Photo/Photo.vue'
import UserSettings from '../components/User/UserSettings.vue'
import AddVideo from '../components/Video/AddVideo'
import EditVideo from '../components/Video/EditVideo'
import EditAudio from '../components/Audio/EditAudio'
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
    path: '/admin/video',
    name: 'VideoList',
    component: VideoList
  },
  {
    path: '/admin/audio',
    name: 'AudioList',
    component: AudioList
  },
  {
    path: '/admin/audio/add',
    name: 'AddAudio',
    component: AddAudio
  },
  {
    path: '/audio',
    name: 'Audio',
    component: Audio
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
    path: '/admin/video/add',
    name: 'AddVideo',
    component: AddVideo
  },
  {
    path: '/admin/video/edit/:slug',
    name: 'EditVideo',
    component: EditVideo
  },
  {
    path: '/admin/audio/edit/:slug',
    name: 'EditAudio',
    component: EditAudio
  },

]

const router = new VueRouter({
  routes
})

export default router
