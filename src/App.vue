<template>
  <div id="app">
    <SiteMenu id="mn" />
    <SiteView id="vw" />
    <SiteFooter id="ftr" />
  </div>
</template>


<script>
import SiteView from "./components/SiteView.vue";
import SiteMenu from "./components/Menu/SiteMenu.vue";
import SiteFooter from "./components/Footer/SiteFooter.vue";
export default {
  name: "app",
  components: {
    SiteView,
    SiteMenu,
    SiteFooter
  }
};
</script>


<style lang="scss">
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  position: relative;
}
#mn {
  width: 100%;
  height: 80px;
}
#vw {
  padding-bottom: 100px;
  min-height: 91vh;
}
#ftr {
  background: #ffab62;
  width: 100%;
  height: 100px;
  position: relative;
  bottom: 0;
  left: 0;
}
</style>
