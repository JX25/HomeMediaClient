<template>
  <div class="menu-box">
    <v-toolbar>
      <v-toolbar-title class="text-uppercase grey--text">
        <v-icon>tv</v-icon>HomeMediaCenter
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <router-link to="/">
          <v-btn text>
            <v-icon>home</v-icon>Start
          </v-btn>
        </router-link>
        <router-link to="/movie/">
          <v-btn text>
            <v-icon>movie</v-icon>Filmy
          </v-btn>
        </router-link>
        <router-link to="/photo/">
          <v-btn text>
            <v-icon>photo</v-icon>Zdjęcia
          </v-btn>
        </router-link>
        <router-link to="/music/">
          <v-btn text>
            <v-icon>music_note</v-icon>Muzyka
          </v-btn>
        </router-link>
        <router-link to="/settings/">
          <v-btn text>
            <v-icon>settings</v-icon>
          </v-btn>
        </router-link>     
      <router-link to="/logout">
        <v-btn text>
          <v-icon>power_settings_new</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "UserMenu",
  components: {}
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.menu-box {
  height: 120px;
  top: 0;
  width: 100%;
}
</style>