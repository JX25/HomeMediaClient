<template>
  <div class="MoviePlayer" v-if="this.show">
    <div class="MenuBar row">
      <button type="button" class="close" aria-label="Close" @click="hidePlayer">
        <span aria-hidden="true">&times;</span>
      </button>
      <button type="button" class="close" aria-label="Close" @click="hidePlayer">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <video width="640" height="480" controls autoplay disablePictureInPicture controlsList="nodownload">
      <source :src=this.src type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: "MoviePlayer",
  props: {
    src: String,
    show: Boolean,
  },
  data() {
    return {
    };
  },
  methods: {
    hidePlayer: function() {
      this.show = false;
    }
  },
};
</script>

<style>
.MoviePlayer{
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding-top: 0px;
  width: 750px;
  height: 500px;
  background-color: rgba(224, 26, 26, 0);
  transition: 1.1s ease-out;
  border-radius: 5px;
}
.MenuBar{
  opacity: 1;
  display: block;
  position: absolute;
  top: 0;
  right: 30px;
}
.MoviePlayer:hover{
  background-color: rgba(255, 0, 43, 0.644);
}
source{
  border-radius: 5px;
}
span{
  font-size: 30pt;
}
</style>