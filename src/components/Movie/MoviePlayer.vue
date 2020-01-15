<template>
  <div
    ref="videoContainer"
    v-if="getShow"
    @keyup.space="play(!moviePlayer.play)"
    @keyup.f="manageFullscreen()"
    tabindex="0"
    @fullscreenchange="fullScreenChange()"
    v-bind:class="moviePlayer.fullscreen ? 'MoviePlayerFullScreen' : 'MoviePlayer'"
  >
    <video
      :src="moviePlayer.src"
      v-bind:class="moviePlayer.fullscreen ? 'videoFullscreen' : 'video'"
      autoplay
      ref="video"
      @timeupdate="progress($event.target.currentTime)"
      @dblclick="openFullscreen()"
    >
      <source type="video/mp4" />
    </video>
    <div v-bind:class="moviePlayer.fullscreen ? 'TopBarFullscreen' : 'MenuBar TopBar row'">
      <i
        class="icon fas fa-window-maximize fa-2x"
        @click="openFullscreen()"
        v-if="!moviePlayer.fullscreen"
      ></i>
      <i class="icon fas fa-window-minimize fa-2x" @click="closeFullscreen()" v-else></i>
      <i class="icon far fa-times-circle fa-2x" @click="hideVideoPlayer()"></i>
    </div>
    <div v-bind:class="moviePlayer.fullscreen ? 'BotBarFullscreen' : 'MenuBar BotBar row'">
      <i class="icon fas fa-pause" @click="play(false)" v-if="moviePlayer.play"></i>
      <i class="icon fas fa-play" @click="play(true)" v-else></i>
      &nbsp;
      <i class="icon fas fa-volume-mute icon" v-if="moviePlayer.volume == 0"></i>
      <i
        class="icon fas fa-volume-down"
        v-else-if="moviePlayer.volume > 0 && moviePlayer.volume <= 0.5"
      ></i>
      <i class="icon fas fa-volume-up" v-else></i>
      <div class="vertical-volume-control"></div>
      <div class="progress-bar" :style="{width: getProgress +'%'}"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MoviePlayer",
  methods: {
    ...mapActions("moviePlayer", [
      "hideVideoPlayer",
      "showFullscreen",
      "minimizeFullscreen",
      "updateProgress"
    ]),
    progress: function(currTime) {
      try {
        this.updateProgress((currTime * 100) / this.$refs.video.duration)
      } catch (error) {
        console.log(error);
        return 0;
      }
    },
    play: function(value) {
      if (value) {
        this.$refs.video.play();
        this.moviePlayer.play = true;
      } else {
        this.$refs.video.pause();
        this.moviePlayer.play = false;
      }
    },
    manageFullscreen: function() {
      let value = !this.moviePlayer.fullscreen;
      value ? this.openFullscreen() : this.closeFullscreen();
    },
    closeFullscreen: function() {
      this.minimizeFullscreen();
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    openFullscreen: function() {
      this.showFullscreen();
      console.log(this.$refs.videoContainer);
      if (this.$refs.videoContainer.requestFullScreen) {
        this.$refs.videoContainer.requestFullscreen();
      } else if (this.$refs.videoContainer.webkitRequestFullScreen) {
        this.$refs.videoContainer.webkitRequestFullScreen();
      } else if (this.$refs.videoContainer.mozRequestFullScreen) {
        this.$refs.videoContainer.mozRequestFullScreen();
      } else if (this.$refs.videoContainer.msRequestFullscreen) {
        this.$refs.videoContainer.msRequestFullscreen();
      }
    },
    fullScreenChange: function() {
      console.log("ASDDSADAS");
      this.moviePlayer.fullscreen = false;
      this.minimizeFullscreen();
    }
  },
  computed: {
    ...mapGetters("moviePlayer", ["moviePlayer", "getFullscreen", "getShow","getProgress"])
  }
};
</script>

<style scoped>
.MoviePlayer {
  transition: 1.1s ease-out;
  border: none;
  color: #fff;
}

.MoviePlayerFullscreen {
  width: 100%;
  height: 100%;
}

.TopBar {
  text-align: right;
  opacity: 0.8;
  background-color: rgba(200, 200, 200, 0);
  display: block;
  position: absolute;
  top: 60px;
  right: 15px;
}

.TopBarFullscreen {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  opacity: 0.8;
}

.TopBarFullscreen:hover {
}

.BotBar {
  opacity: 0.8;
  background-color: rgba(200, 200, 200, 0);
  display: block;
  text-align: left;
  position: absolute;
  padding-top: 5px;
  bottom: 65px;
  left: 15px;
}

.BotBarFullscreen {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  opacity: 0.8;
}

.BotBarFullscreen:hover {
}

.MenuBar:hover {
  width: 100%;
  background-color: rgba(102, 99, 99, 0.8);
  transition: 0.5s ease-out;
}

.videoContainter {
}

.video {
  width: 640px;
  height: 480px;
}

.videoFullscreen {
  width: 100%;
  height: 100%;
}

video {
  border-radius: 5px;
  color: #fff;
}

video::-webkit-media-controls {
  display: none !important;
}
video::-webkit-media-controls-enclosure {
  display: none !important;
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
  z-index: 2147483647;
  padding-bottom: 3px;
  bottom: 60px;
  left: 0px;
  width: 0%;
  padding-bottom: 5px;
  background-color: red;
}
</style>