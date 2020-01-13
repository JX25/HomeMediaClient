<template>
  <div class="MoviePlayer" v-if="this.$store.state.movie.moviePlayer.show">
    <video
      width="640"
      height="480"
      controls
      autoplay
      disablePictureInPicture
      controlslist="nodownload"
    >
      <source :src="this.moviePlayer.src" type="video/mp4" />
    </video>
    <div class="MenuBar row">
      <i class="icon far fa-minus-square fa-2x"></i>
      <i class="icon fas fa-window-maximize fa-2x"></i>
      <i class="icon far fa-times-circle fa-2x" @click="hidePlayer()"></i>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "MoviePlayer",
  data() {
    return {};
  },
  methods: {
    ...mapActions("movie", ["hideVideoPlayer"])

  },
  computed: {
    ...mapGetters("movie",["moviePlayer"])
  },
};
</script>

<style scoped>
.MoviePlayer {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding-top: 0px;
  width: 650px;
  height: 480px;
  background-color: rgba(224, 26, 26, 0);
  transition: 1.1s ease-out;
  border-radius: 5px;
}
.MenuBar {
  opacity: 0.8;
  display: block;
  position: absolute;
  top: 0;
  right: 30px;
}
.MoviePlayer:hover {
  background-color: rgba(50, 50, 50, 0.75);
}
source {
  margin-top: 10px;
  border-radius: 5px;
}
span {
  font-size: 30pt;
}
.icon {
  margin-left: 10px;
  font-size: 18pt;
  z-index: 10;
}
</style>