<template>
<body>
    <GuestMenu />
    <div id="navigation">
    </div>
</body>
</template>

<script>
import GuestMenu from './Menu/GuestMenu.vue';
export default {
  name: 'View',
  props: {
    msg: String,
  },
  components: {
    GuestMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
