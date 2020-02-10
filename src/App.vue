<template>
  <div id="app">
    <SiteMenu id="site-menu" />
    <SiteView id="site-view" />
    <VideoPlayer class="video-player" />
    <AudioPlayer class="audio-player" />
    <SiteFooter id="footer" />
  </div>
</template>


<script>
import VideoPlayer from "./components/Video/VideoPlayer";
import AudioPlayer from "./components/Audio/AudioPlayer";
import SiteView from "./components/SiteView.vue";

import SiteMenu from "./components/Menu/SiteMenu.vue";
import SiteFooter from "./components/Footer/SiteFooter.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    SiteView,
    SiteMenu,
    SiteFooter,
    VideoPlayer,
    AudioPlayer
  },
  computed: {
    ...mapGetters("user", ["type"])
  }
};
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
#site-menu {

}
#site-view {
  height: 80vh;
}
#footer {

}

.video-player {
  height: 480px;
  width: 640px;
  position: fixed !important;
  left: 15px;
  z-index: 10;
}

.audio-player {
  width: 100%;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  position: fixed !important;
  left: 0px;
  bottom: 0px;
  z-index: 50;
}

@media (max-width: 750px) {
  .video-player {
    width: 50%;
  }
}
</style>
