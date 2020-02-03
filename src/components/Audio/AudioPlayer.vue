<template>
  <div
    ref="audioContainer"
    v-if="audioPlayer.show"
    @keyup.space="play(!audioPlayer.play)"
    @keyup.up="volume(5)"
    @keyup.down="volume(-5)"
    @keyup.left="swipe(-1)"
    @keyup.right="swipe(1)"
    tabindex="0"
    class="audioPlayer"
  >
    <img :src="audioPlayer.coverSrc" class="cover" />
    <div class="audio-controls">
      <div class="top-control">
        <b>Teraz odtwarzane:</b>
        {{audios[getAudioIndex].title}} - from {{audios[getAudioIndex].album}} by {{audios[getAudioIndex].author}} ({{audios[getAudioIndex].year}})
      </div>
      <div class="mid-control">
        <i class="fas fa-play-circle fa-4x" v-if="!audioPlayer.play" @click="play()"></i>
        <i class="fas fa-pause-circle fa-4x" @click="play" v-else></i>
        <span class="volume-control" @mouseenter="showVolume()" @click="showVolume()">
          <i class="fas fa-volume-up fa-4x" v-if="audioPlayer.volume > 50"></i>
          <i
            class="fas fa-volume-down fa-4x"
            v-else-if="audioPlayer.volume <= 50 && audioPlayer.volume > 50"
          ></i>
          <i class="fas fa-volume-mute fa-4x" v-else></i>
          <input
            type="range"
            class="volume-slider"
            min="0"
            max="100"
            v-if="showVolume()"
            value="100"
            @mouseleave="hideVolume()"
            v-model="volume"
            @input="changeVolume(volume)"
          />
        </span>
        <i class="fas fa-chevron-circle-left fa-3x" @click="swipe(-1)"></i>
        <i class="fas fa-chevron-circle-right fa-3x" @click="swipe(1)"></i>
        <i class="fas fa-stop-circle fa-3x" @click="stopAudio"></i>

        <span class="toRight">
          <i
            class="fas fa-random fa-3x"
            :class="audioPlayer.random ? 'clicked':'notclicked'"
            @click="shuffle"
          ></i>
          <i class="fas fa-chevron-down fa-3x"></i>
          <i class="fas fa-window-close fa-3x" @click="close()"></i>
        </span>
      </div>
      <div class="bot-control">
        <span class="toLeft">
          {{current}}/{{duration}}
          <div class="progress" ref="audioTime" @click="changeTime($event)">
            <div class="currentProgress" :style="{width: getProgress()+ '%'}"></div>
          </div>
        </span>
        <span class="toRight">
          <button class="btn btn-info">Wczytaj...</button>
          <button class="btn btn-success">Zapisz...</button>
          <button class="btn btn-primary">Modyfikuj...</button>
        </span>
      </div>
    </div>
    <audio
      ref="audio"
      @timeupdate="updateProgress($event.target.currentTime)"
      @ended="change(1)"
      autoplay
    >
      <source :src="audioPlayer.src" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AudioPlayer",
  data() {
    return {
      current: 0,
      duration: 0
    };
  },
  methods: {
    ...mapActions("audioPlayer", []),
    ...mapActions("audio", []),
    play: function() {},
    volume: function() {},
    swipe: function() {},
    showVolume: function() {},
    changeTime: function() {},
    stopAudio: function() {},
    getProgress: function() {},
    shuffle: function() {}
  },
  computed: {
    ...mapGetters("audioPlayer", ["audioPlayer", "getAudioIndex"]),
    ...mapGetters("audio", ["audios"])
  },
  created() {}
};
</script>

<style scoped>
.audioPlayer {
  height: 150px;
  background-color: rgba(0, 0, 0, 0.8);
}
.cover {
  width: 150px;
  height: 150px;
  position: fixed;
  left: 0px;
  z-index: 1000;
}
.cover:hover {
  transform: scale(2) translate(15%, -23%);
  transition: 0.2s ease-in;
}
.audio-controls {
  left: 150px;
  bottom: 0px;
  position: fixed;
  min-width: 160px;
  width: 95%;
  min-height: 150px;
  z-index: 11;
}
.top-control {
  position: relative;
  color: white;
  text-align: left;
  padding-left: 15px;
  top: 0px;
  background-color: rgba(0, 102, 255, 0.7);
  height: 25px;
  z-index: 10;
}
.top-control i {
}
.mid-control i {
  padding-left: 25px;
  padding-top: 5px;
  color: rgba(30, 30, 155, 0.2);
}
.mid-control {
  position: relative;
  padding-left: 15px;
  color: white;
  text-align: left;
  background-color: rgba(0, 102, 255, 1);
  height: 75px;
}
.bot-control {
  color: white;
  background-color: rgba(0, 102, 255, 1);
  bottom: 0px;
  padding-left: 15px;
  position: relative;
  height: 50px;
}
.notclicked {
  opacity: 0.1;
}
.clicked {
  opacity: 1 !important;
  color: #00000055 !important;
}
.toRight {
  padding-top: 10px;
  position: fixed;
  right: 15px;
  padding-top: 5px;
  bottom: 10px;
}
.mid-control .toRight{
  bottom: 60px;
}
.toLeft {
  position: fixed;
  left: 0px;
  left: 155px;
  min-width: 50%;
  max-width: 50%;
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

.volume-slider {
  position: relative;
  bottom: 20px;
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
  background: rgba(30, 30, 155, 1);
  cursor: pointer;
  border-radius: 50%;
}

.volume-slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(30, 30, 155, 1);
  cursor: pointer;
}
</style>