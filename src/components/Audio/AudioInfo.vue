<template>
  <div class="infoBox">
    <i class="icon far fa-times-circle fa-2x" @click="hideInfo()"></i>
    <ul>
      <li v-for="(info, key) in audioInfo" :key="key">{{info}}</li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'AudioInfo',
  methods: {
    ...mapActions("audio", ["hideInfo"])
  },
  computed: {
    ...mapGetters("audio", ["audioInfo"])
  }
}
</script>

<style scoped>
.infoBox{
    background-color: rgba(31, 22, 15, 0.85);
    margin: auto;
    width: 100%;
    color: white;
    min-height: fit-content;
    position: fixed;
    border-radius: 10px;
    z-index: 10;
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
    font-size: 10pt;
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