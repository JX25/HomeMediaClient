<template>
  <div id="app">
    <SiteMenu />
    <SiteView />
    <SiteFooter />

  </div>
</template>


<script>
import SiteView from './components/SiteView.vue'
import SiteMenu from './components/Menu/SiteMenu.vue'
import SiteFooter from './components/Footer/SiteFooter.vue'
export default {
  name: 'app',
  components: {
    SiteView,
    SiteMenu,
    SiteFooter
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
