<template>
  <div class="infoBox">
    <i class="icon far fa-times-circle fa-2x" @click="hideInfo()"></i>
    <ul>
      <li v-for="(info, key) in movieInfo" :key="key">{{info}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MovieInfo",
  methods: {
    ...mapActions("movie", ["hideInfo"])
  },
  computed: {
    ...mapGetters("movie", ["movieInfo"])
  }
};
</script>

<style scoped>
.infoBox{
    background-color: rgba(117, 117, 245, 0.5);
    margin: auto;
    width: 60%;
    min-height: 40px;
    position: relative;
    border-radius: 10px;
    z-index: 10;
}
ul {
    list-style-type: none;
}
li {
    display: block;
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