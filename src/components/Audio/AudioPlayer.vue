<template>
  <div
    ref="audioContainer"
    v-if="audioPlayer.show"
    @keyup.space="play(!audioPlayer.play)"
    @keyup.up="updateVolume(volume + 5)"
    @keyup.down="updateVolume(volume - 5)"
    @keyup.left="swipe(-1)"
    @keyup.right="swipe(1)"
    tabindex="0"
    class="audioPlayer"
  >
    <img :src="audioPlayer.coverSrc" class="cover" />
    <div class="audio-controls">
      <div class="top-control">
        <b>{{audios[getAudioIndex].title}}</b>
        - {{audios[getAudioIndex].album}} by {{audios[getAudioIndex].author}} ({{audios[getAudioIndex].year}})
      </div>
      <div class="mid-control">
        <i class="fas fa-play-circle fa-2x" v-if="!audioPlayer.play" @click="play()"></i>
        <i class="fas fa-pause-circle fa-2x" @click="play()" v-else></i>
        <span class="volume-control" @mouseenter="audioPlayer.showVolume = true" @click="audioPlayer.showVolume = true">
          <i class="fas fa-volume-up fa-2x" v-if="audioPlayer.volume > 50"></i>
          <i class="fas fa-volume-down fa-2x" v-else-if="audioPlayer.volume <= 50 && audioPlayer.volume > 1"></i>
          <i class="fas fa-volume-mute fa-2x" v-else></i>
          <span v-if="audioPlayer.showVolume" style="margin-left: 15px;"></span>
          <input
            type="range"
            class="volume-slider"
            min="0"
            max="100"
            v-if="audioPlayer.showVolume"
            value="100"
            @mouseleave="audioPlayer.showVolume = false"
            v-model="audioPlayer.volume"
            @input="updateVolume(volume)"
          />
        </span>
        <i class="fas fa-chevron-circle-left fa-2x" @click="swipe(-1)"></i>
        <i class="fas fa-chevron-circle-right fa-2x" @click="swipe(1)"></i>
        <i class="fas fa-stop-circle fa-2x" @click="stop()"></i>
        
        <span class="toRight">
          <i
            class="fas fa-random fa-2x"
            :class="audioPlayer.random ? 'clicked':'notclicked'"
            @click="shuffle()"
          ></i>
          <i
            class="fas fa-infinity fa-2x"
            :class="audioPlayer.loop ? 'clicked':'notclicked'"
            @click="loop()"
          ></i>
          <i class="fas fa-window-close fa-2x" @click="close()"></i>
        </span>
      </div>
      <div class="bot-control">
        <span class="toLeft">
          {{current}}/{{duration}}
          <div class="progress" ref="audioTime" @click="changeAudioTime($event)">
            <div class="currentProgress" :style="{width: getProgress + '%'}"></div>
          </div>
        </span>
        <span class="toRight">
          <button class="button">wczytaj</button>
          <button class="button">zapisz</button>
          <button class="button">modyfikuj</button>
        </span>
      </div>
    </div>
    <audio
      ref="audio"
      @timeupdate="progress($event.target.currentTime)"
      @ended="swipe(1)"
      autoplay
      :src="audioPlayer.src"
    >
      <source type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AudioPlayer",
  data() {
    return {
      current: "0:00",
      duration: "0:00"
    };
  },
  methods: {
    ...mapActions("audioPlayer", [
      "startAudio",
      "pauseAudio",
      "hideAudioPlayer",
      "updateProgress",
      "changePlaylistIndex",
      "changeIndex",
      "changeSource",
      "changeCoverSource",
      "stopAudio",
      "changeLoop",
      "unshufflePlaylist",
      "shufflePlaylist",
      "copyPlaylist",
      "changeVolume",
      "showVolume"
    ]),
    ...mapActions("audio", []),
    play: function() {
      if (!this.audioPlayer.play) {
        this.startAudio();
        this.$refs.audio.play();
      } else {
        this.pauseAudio();
        this.$refs.audio.pause();
      }
    },
    loop: function() {
      console.log("X56D", this.audioPlayer.loop);
      this.changeLoop(!this.audioPlayer.loop);
    },
    updateVolume: function(volume) {
      let newVolume = volume > 100 ? 100 : volume < 0 ? 0 : volume
      this.changeVolume(newVolume);
      this.$refs.audio.volume = newVolume/100.0;
    },
    showVolume: function() {},
    swipe: function(value) {
      if (this.audioPlayer.playlist.length == 0) return;
      let newIndex = this.audioPlayer.currentPlaylistIndex + value;
      if (this.audioPlayer.loop) {
        if (newIndex == -1) {
          newIndex = this.audioPlayer.playlist.length - 1;
        } else if (newIndex >= this.audioPlayer.playlist.length) {
          newIndex = 0;
        }
      } else {
        if (newIndex == -1) {
          newIndex = 0;
        } else if (newIndex >= this.audioPlayer.playlist.length) {
          newIndex = this.audioPlayer.playlist.length - 1;
        }
      }
      let audioIndex = this.audios
        .map(x => x._id == this.audioPlayer.playlist[newIndex].id)
        .indexOf(true);
      this.changePlaylistIndex(newIndex);
      this.changeIndex(audioIndex);
      this.changeSource(this.audioPlayer.playlist[newIndex].src);
      this.changeCoverSource(this.audioPlayer.playlist[newIndex].coverSrc);
      this.$refs.audio.currentTime = 0;
      this.startAudio();
    },
    stop: function() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.pause();
      this.stopAudio();
    },
    progress: function(currTime) {
      try {
        let full = this.$refs.audio.duration || 0;
        let currFull = this.$refs.audio.currentTime || 0;
        this.current =
          Math.floor(currFull / 60, 0) +
          ":" +
          (currFull % 60 >= 10
            ? Math.floor(currFull % 60, 0)
            : "0" + Math.floor(currFull % 60, 0));
        this.duration =
          Math.floor(full / 60, 0) +
          ":" +
          (full % 60 >= 10
            ? Math.floor(full % 60, 0)
            : "0" + Math.floor(full % 60, 0));
        this.updateProgress((currTime * 100) / this.$refs.audio.duration);
      } catch (error) {
        console.log(error);
        return 0;
      }
    },
    changeAudioTime: function(event) {
      let timeline = this.$refs.audioTime.clientWidth;
      let timelinePart = event.layerX;
      let duration = this.$refs.audio.duration;
      let currentTime = (timelinePart / timeline) * duration;
      this.$refs.audio.currentTime = currentTime;
    },
    shuffle: function() {
      console.log(this.audioPlayer.random);
      if (this.audioPlayer.random) {
        this.unshufflePlaylist();
      } else {
        this.copyPlaylist();
        this.shufflePlaylist();
      }
    },
    close: function() {
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
      this.hideAudioPlayer();
      this.stopAudio();
    }
  },
  computed: {
    ...mapGetters("audioPlayer", [
      "audioPlayer",
      "getAudioIndex",
      "getProgress",
      "volume"
    ]),
    ...mapGetters("audio", ["audios"])
  },
  created() {
    this.$refs.audio.volume = 1;
  }
};
</script>

<style scoped>
.audioPlayer {
  height: 100px;
  background-color: rgba(0, 0, 0, 0.8);
}
.cover {
  float: left;
  width: 100px;
  height: 100px;
  position: fixed;
  left: 0px;
  z-index: 1000;
}
.cover:hover {
  transform: scale(2) translate(15%, -23%);
  transition: 0.2s ease-in;
}
.audio-controls {
  width: 100%;
  left: 100px;
  bottom: 0px;
  position: fixed;
  height: 100px;
  z-index: 11;
}
.top-control {
  padding-left: 25px;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
.mid-control {
  background-color: rgba(0, 0, 0, 0.7);
  text-align: left;
  padding-left: 25px;
  color: white;
  height: 50px;
}

.mid-control i {
  padding-top: 10px;
  padding-right: 10px;
}

.mid-control .toRight {
  position: relative;
  float: right;
  top: -10px;
  right: 5.5%;
}

.bot-control {
  height: 25px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
}

.bot-control .toRight {
  float: right;
  position: relative;
  right: 110px;
  bottom: 5px;
}

.button {
  font-size: 10pt;
  color: white;
  width: 75px;
  background-color: rgba(59, 61, 68, 0.9);
  border-color: rgba(0, 0, 0, 1);
  border-radius: 5px;
  margin-left: 10px;
}

.button:hover {
  background-color: rgba(79,81,88,0.9);
}

.notclicked {
  opacity: 0.1;
}
.clicked {
  opacity: 1 !important;
  color: rgba(255, 255, 255, 1) !important;
}
.toRight {
  position: fixed;
  right: 15px;
  padding-top: 5px;
  bottom: 10px;
}
.mid-control .toRight {
  bottom: 75px;
}
.toLeft {
  position: relative;
  left: 10px;
  float: left;
  width: 70%;
  bottom: 5px;
}
.progress {
  width: 100%;
  height: 5px;
  cursor: pointer;
}
.currentProgress {
  width: 0%;
  height: 5px;
  color: red;
  background-color: red;
}
.fas {
  cursor: pointer;
  opacity: 0.7;
}
.fas:hover {
  opacity: 1;
}

.volume-control{
  max-width: fit-content;
  height: fit-content;
}

.volume-slider {
  position: relative;
  bottom: 10px;
  right: 10px;
  -webkit-appearance: none;
  height: 3px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  margin: 0;
}

.volume-slider:hover {
  opacity: 1;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: rgb(90, 90, 241);
  cursor: pointer;
  border-radius: 50%;
}

.volume-slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgb(90, 90, 241);
  cursor: pointer;
}
</style>