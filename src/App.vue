<template>
  <div id="app">
    <Menu />
    <View />
    <Footer />
  </div>
</template>

<script>

import View from './components/View.vue'
import Menu from './components/Menu/Menu.vue'
import Footer from './components/Footer/Footer.vue'

export default {
  name: 'app',
  components: {
    View,
    Menu,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html,body {
    margin:0;
    padding:0;
}
</style>
