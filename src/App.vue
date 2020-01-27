<template>
  <div id="app">
    <SiteMenu id="mn" />
    <SiteView id="vw" />
    <MoviePlayer class="movie-player" />
    <SiteFooter id="ftr" />
  </div>
</template>


<script>
import MoviePlayer from "./components/Movie/MoviePlayer";
import SiteView from "./components/SiteView.vue";
import SiteMenu from "./components/Menu/SiteMenu.vue";
import SiteFooter from "./components/Footer/SiteFooter.vue";
export default {
  name: "app",
  components: {
    SiteView,
    SiteMenu,
    SiteFooter,
    MoviePlayer
  }
};
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

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
  padding-bottom: 20px;
}
#vw {
  padding-bottom: 100px;
  min-height: 91vh;
}
#ftr {
  width: 100%;
  position: relative;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.movie-player {
  height: 480px;
  width: 640px;
  position: fixed !important;

  left: 15px;
  z-index: 10;
}

@media (max-width: 750px){
  .movie-player{
    width: 50%;
  }
  }
</style>
