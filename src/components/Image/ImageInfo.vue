<template>
  <div class="infoBox">
    <i class="icon far fa-times-circle fa-2x" @click="hideInfo()"></i>
    <ul>
      <li v-for="(info, key) in imageInfo" :key="key">{{info}}</li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'ImageInfo',
  methods: {
    ...mapActions("image", ["hideInfo"])
  },
  computed: {
    ...mapGetters("image", ["imageInfo"])
  }
}
</script>

<style scoped>


.infoBox{
    background-color: rgba(117, 117, 245, 0.85);
    margin: auto;
    min-width: 60%;
    max-width: 90%;
    min-height: 40px;
    position: fixed;
    border-radius: 10px;
    z-index: 100;
    left: 50%;
    transform: translate(-50%);
    bottom: 5px;
    border: solid 2px rgba(33, 66, 33, 0.8)
}
ul {
    list-style-type: none;
}
li {
    display: block;
    right: 10px;
    font-size: 16pt;
}
i {
    position: absolute;
    right: 5px;
    top: 5px;
}
i:hover{
    cursor: pointer;
}
</style>