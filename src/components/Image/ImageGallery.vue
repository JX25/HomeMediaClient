<template>
  <div class="fullscreen" v-if="showGallery">
    <img
      :src="streamImage(currentSrc)"
      @keyup.left="swipe(-1)"
      @keyup.right="swipe(1)"
      tabindex="0"
      @touchstart="touchStart()"
      @touchmove="touchMove()"
      @touchend="touchEnd()"
      ref="mainImage"
      :class="'rotate-'+rotation"
    />

    <i class="close gallery-btn fas fa-window-close" @click="changeShowGallery(false)"></i>
    <i
      class="arrow-left gallery-btn fas fa-chevron-left fa-3x"
      @click="swipe(-1)"
      @keyup.escape="changeShowGallery(false)"
    ></i>
    <i
      class="arrow-right gallery-btn fas fa-chevron-right fa-3x"
      @click="swipe(1)"
      @keyup.escape="changeShowGallery(false)"
    ></i>
    <i class="fas fa-undo fa-3x left" @click="rotateLeft"></i>
    <i class="fas fa-redo fa-3x right" @click="rotateRight"></i>
  </div>
</template>

<script>
import { address } from "../../store/api";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ImageGallery",
  props: {
    images: Array,
    index: Number
  },
  data() {
    return {
      touch: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
      },
      currentSrc: this.streamImage(this.images[this.index].file_path),
      currentIndex: this.index,
      rotation: 0
    };
  },
  methods: {
    ...mapActions("image", ["changeShowGallery"]),
    touchStart: function() {
      ////console.log("e", event);
      this.touch.startX = event.touches[0].clientX;
      this.touch.startY = event.touches[0].clientY;
      ////console.log(this.touch);
    },
    touchMove: function() {
      ////console.log("ee", event);
      this.touch.endX = event.touches[0].clientX;
      this.touch.endY = event.touches[0].clientY;
      ////console.log(this.touch);
    },
    touchEnd: function() {
      let swipeValue = this.touch.endX - this.touch.startX;
      // //console.log(swipeValue);
      if (swipeValue > 0 && swipeValue > 100) this.swipe(1);
      if (swipeValue < 0 && swipeValue < -100) this.swipe(-1);
    },
    swipe: function(value) {
      this.rotation = 0;
      this.currentIndex += value;
      if (this.currentIndex < 0) this.currentIndex = this.images.length - 1;
      if (this.currentIndex >= this.images.length) this.currentIndex = 0;
      this.currentSrc = this.streamImage(
        this.images[this.currentIndex].file_path
      );
    },
    streamImage: function(path, thmb = "") {
      if (typeof path !== "undefined") {
        let parts = path.split("/");
        let slug = parts[parts.length - 1];
        return address + "/api/v1/image/stream" + thmb + "/" + slug;
      } else return "";
    },
    rotateLeft: function() {
      if (this.rotation <= 0)
        this.rotation = 360 - (Math.abs(this.rotation - 90) % 360);
      else this.rotation = (this.rotation - 90) % 360;
      //console.log(this.$refs.mainImage);
    },
    rotateRight: function() {
      this.rotation = (this.rotation + 90) % 360;
    }
  },
  computed: {
    ...mapGetters("image", ["showGallery"])
  }
};
</script>

<style scoped>
.fullscreen {
  height: 100%;
  width: 100%;
  background-color: rgba(10, 10, 10, 0.9);
  z-index: 1000000;
  position: fixed;
  top: 0px;
  overflow: hidden;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  color: rgba(240, 240, 240, 0.3);
}

.gallery-btn:hover {
  color: rgba(240, 240, 240, 0.9);

  cursor: pointer;
}

.arrow-left {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(0%, -50%);
  color: rgba(240, 240, 240, 0.5);
}

.arrow-right {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0%, -50%);
  color: rgba(240, 240, 240, 0.5);
}

.fullscreen > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 30%;
  max-width: 95% !important;
  max-height: 95% !important;
  transition: 0.3s ease-in;
}

.left {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  opacity: 0.6;
}

.right {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  opacity: 0.6;
}

.left:hover,
.right:hover {
  opacity: 1;
}
/* .rotate--90 , .rotate--180, .rotate--270 */
.rotate-0 {
}
.rotate-90 {
  transform: rotate(90deg) translate(-50%, 50%) !important;
}
.rotate-180 {
  transform: rotate(180deg) translate(50%, 50%) !important;
}
.rotate-270 {
  transform: rotate(270deg) translate(50%, -50%) !important;
}
</style>