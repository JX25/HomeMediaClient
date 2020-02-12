<template>
  <div class="infoBox">
    <i class="icon far fa-times-circle fa-2x" @click="hideInfo()"></i>
    <ul>
      <li v-for="(info, key) in videoInfo" :key="key">{{info}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "VideoInfo",
  methods: {
    ...mapActions("video", ["hideInfo"])
  },
  computed: {
    ...mapGetters("video", ["videoInfo"])
  }
};
</script>

<style scoped>
.infoBox {
  position: fixed;
  bottom: 10px;
  padding-right: 30px;
  width: 100%!important;
  left: 0;
  background-color: rgba(15, 27, 21, 0.8);
  margin: auto;
  min-height: fit-content;
  overflow-wrap: break-word;
  border-radius: 10px;
  z-index: 150;
}
ul {
  list-style-type: none;
}
li {
  display: block;
  color:white;
  font-size: 12pt;
}
i {
  color:white;
  position: absolute;
  right: 5px;
  top: 5px;
}
i:hover {
  cursor: pointer;
}
</style>