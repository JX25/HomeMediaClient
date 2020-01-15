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
      @click="play(!moviePlayer.play)"
      @dblclick="manageFullscreen()"
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
    <div class="options-block">
      <div v-bind:class="moviePlayer.fullscreen ? 'BotBarFullscreen row' : 'MenuBar BotBar row'">
        <i class="icon fas fa-pause" @click="play(false)" v-if="moviePlayer.play"></i>
        <i class="icon fas fa-play" @click="play(true)" v-else></i>
        &nbsp;
        <div class="volume-control" @mouseover="moviePlayer.showVolume = true">
          <i class="icon fas fa-volume-mute icon" v-if="moviePlayer.volume == 0"></i>
          <i
            class="icon fas fa-volume-down"
            v-else-if="moviePlayer.volume > 0 && moviePlayer.volume <= 50"
          ></i>
          <i class="icon fas fa-volume-up" v-else></i>
          <div class="vertical-volume-control">
            <input
              @mouseleave="moviePlayer.showVolume = false"
              type="range"
              min="0"
              max="100"
              v-model="moviePlayer.volume"
              @input="changeVideoVolume(getVolume)"
              class="volume-slider"
              v-bind:class="moviePlayer.fullscreen ? 'volume-sliderFullscreen' : 'volume-slider'"
              v-if="moviePlayer.showVolume"
            />
          </div>
        </div>
      </div>
      <div
        ref="videoTime"
        @click="changeVideoTime($event)"
        v-bind:class="moviePlayer.fullscreen ? 'progressFullscreen' : 'progress'"
      >
        <div
          :style="{width: getProgress +'%'}"
          v-bind:class="moviePlayer.fullscreen ? 'progress-barFullscreen' : 'progress-bar'"
        ></div>
      </div>
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
      "updateProgress",
      "changeVolume"
    ]),
    changeVideoTime: function(event) {
      let timeline = this.$refs.videoTime.clientWidth
      let timelinePart = event.layerX
      let duration = this.$refs.video.duration
      let currentTime = timelinePart/timeline * duration
      this.$refs.video.currentTime = currentTime
    },
    progress: function(currTime) {
      try {
        this.updateProgress((currTime * 100) / this.$refs.video.duration);
      } catch (error) {
        console.log(error);
        return 0;
      }
    },
    changeVideoVolume: function(newVolume) {
      console.log("vol", newVolume);
      this.$refs.video.volume = newVolume / 100.0;
      this.changeVolume(newVolume);
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
    ...mapGetters("moviePlayer", [
      "moviePlayer",
      "getFullscreen",
      "getShow",
      "getProgress",
      "getVolume"
    ])
  }
};
</script>

<style scoped>
.options-block {
  display: flex;
  bottom: 65px;
  left: 15px;
  color: blue;
}

.volume-slider {
  position: fixed;
  left: -10px;
  bottom: 40px;
  -webkit-appearance: slider-vertical;
  min-height: 100px;
  max-height: 150px;
  opacity: 1;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

.volume-sliderFullscreen {
  position: fixed;
  left: -15px;
  bottom: 40px;
  -webkit-appearance: slider-vertical;
  min-height: 100px;
  max-height: 150px;
  opacity: 1;
}

.MoviePlayer {
  z-index: 5;
  transition: 1.1s ease-out;
  position: relative;
  color: #fff;
  outline: none;
}

.MoviePlayerFullscreen {
  min-width: 90%;
  min-height: 90%;
  max-width: 100%;
  max-height: 100%;
}

.TopBar {
  text-align: right;
  opacity: 0.8;
  display: block;
  position: absolute;
  top: 60px;
  right: 30px;
}

.TopBarFullscreen {
  position: absolute;
  width: 100%;
  right: -45%;
  top: 0;
  width: 100%;
  opacity: 0;
}

.TopBarFullscreen:hover {
  opacity: 0.8;
}

.BotBar {
  max-height: 25px;
  opacity: 0.8;
  background-color: rgba(200, 200, 200, 0);
  text-align: left;
  position: absolute;
  padding-top: 5px;
  bottom: 70px;
  left: 15px;
}

.BotBarFullscreen {
  position: absolute;
  left: 10px;
  bottom: 5px;
  width: 100%;
  opacity: 0.9;
}

.BotBarFullscreen:hover {
  opacity: 0.9;
}

.MenuBar:hover {
  width: 100%;
  transition: 0.5s ease-out;
}

.videoContainter {
  position: relative;
}

.video {
  position: relative;
  width: 640px;
  height: 480px;
}

.videoFullscreen {
  width: 100%;
  height: 100%;
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
  color: rgba(15, 89, 250, 0.8);
}
.icon:hover {
  margin-left: 10px;
  font-size: 18pt;
  z-index: 10;
  cursor: pointer;
  opacity: 1;
  color: rgba(15, 89, 250, 0.8);
}

.progress {
  position: absolute;
  z-index: 2147483647;
  bottom: 50px;
  left: 0px;
  width: 100%;
  background-color: rgba(48, 48, 233, 0.411);
  cursor: pointer;
}

.progressFullscreen {
  position: absolute;
  z-index: 2147483647;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 5px;
  background-color: rgba(48, 48, 233, 0.411);
  cursor: pointer;
}

.progress-bar {
  position: relative;
  z-index: 2147483646;
  padding-bottom: 3px;
  bottom: 0px;
  left: 0px;
  width: 0%;
  padding-bottom: 5px;
  background-color: blue;
}

.progress-bar:hover {
  transition: 0.2s ease-in;
  padding-bottom: 8px;
}

.progress-barFullscreen {
  position: relative;
  z-index: 2147483647;
  padding-bottom: 3px;
  bottom: 0px;
  left: 0px;
  width: 0%;
  padding-bottom: 10px;
  background-color: blue;
}
</style>