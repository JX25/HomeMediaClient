<template>
  <div class="infoBox">
    <i class="icon far fa-times-circle fa-2x" @click="hideInfo()"></i>
    <ul>
      <li v-for="(info, key) in imageInfo" :key="key">{{info}}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ImageInfo",
  methods: {
    ...mapActions("image", ["hideInfo"])
  },
  computed: {
    ...mapGetters("image", ["imageInfo"])
  }
};
</script>

<style scoped>
.infoBox {
  background-color: rgba(55, 162, 11, 0.85);
  margin: auto;
  width: 100%;
  min-height: fit-content;
  position: fixed;
  color: white;
  border-radius: 10px;
  z-index: 100;
  left: 50%;
  transform: translate(-50%);
  bottom: 5px;
  border: solid 2px rgba(33, 66, 33, 0.8);
}
ul {
  list-style-type: none;
}
li {
  display: block;
  position:relative;
  right: 15px;

  font-size: 12pt;
}
i {
  position: absolute;
  right: 5px;
  top: 5px;
}
i:hover {
  cursor: pointer;
}
</style>