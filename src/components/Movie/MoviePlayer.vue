<template>
  <div class="MoviePlayer" v-if="this.$store.state.movie.moviePlayer.show">
    <video
      height="480"
      width="640"
      autoplay
      disablePictureInPicture
      disableFullscreen
      controlslist="nodownload"
      ref="video"
      @timeupdate="progressBar"
    >
      <source :src="this.moviePlayer.src" type="video/mp4" />
    </video>
    <div class="MenuBar TopBar row">
      <i class="icon fas fa-window-maximize fa-2x" @click="fullScreen()"></i>
      <i class="icon far fa-times-circle fa-2x" @click="hideVideoPlayer()"></i>
    </div>
    <div class="MenuBar BotBar row">
      <div class="progress-bar" :style="{width: progressBar() +'%'}"></div>
      <i class="icon fas fa-window-maximize fa-2x" @click="fullScreen()"></i>
      <i class="icon far fa-times-circle fa-2x" @click="hideVideoPlayer()"></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MoviePlayer",
  data() {
    return {
      progress: 0
    };
  },
  methods: {
    ...mapActions("movie", ["hideVideoPlayer"]),
    fullScreen: function() {
      console.log(this.$refs.video);
      console.log(this.$refs.video.duration);
      console.log(this.$refs.video.currentTime);
      console.log(this.$refs.video.volume);
      this.$refs.video.requestFullscreen();
    },
    progressBar: function() {
      let currentTime = this.$refs.video.currentTime ? this.$refs.video.currentTime : 0;
      let allTime = this.$refs.video.duration;
      console.log(currentTime, allTime);
      console.log((currentTime * 100) / allTime);
      let width = (currentTime * 100) / allTime;
      console.log(width, "width");
      return width;
    }
  },
  computed: {
    ...mapGetters("movie", ["moviePlayer"])
  }
};
</script>

<style scoped>
.MoviePlayer {
  transition: 1.1s ease-out;
  border: none;
  color: #fff;
}
.TopBar {
  opacity: 0.8;
  background-color: rgba(200, 200, 200, 0);
  display: block;
  position: absolute;
  top: 60px;
  right: 15px;
}

.BotBar {
  opacity: 0.8;
  background-color: rgba(200, 200, 200, 0);
  display: block;
  position: absolute;
  bottom: 65px;
  left: 15px;
}

.MenuBar:hover {
  text-align: right;
  width: 100%;
  background-color: rgba(102, 99, 99, 0.8);
  transition: 0.5s ease-out;
}

video {
  border-radius: 5px;
  color: #fff;
}
span {
  font-size: 30pt;
}
.icon {
  margin-left: 10px;
  font-size: 18pt;
  z-index: 10;
  cursor: pointer;
  opacity: 0.6;
}
.icon:hover {
  margin-left: 10px;
  font-size: 18pt;
  z-index: 10;
  cursor: pointer;
  opacity: 1;
}

.progress-bar {
  bottom: 60px;
  left: 0px;
  width: 0%;
  background-color: red;
  height: 2px;
}
</style>