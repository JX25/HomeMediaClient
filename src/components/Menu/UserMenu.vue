<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">HomeMedia</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/video">
              <i class="fas fa-film fa-2x"></i>
              <div class="navi-title">Wideo</div>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/audio">
              <i class="fas fa-music fa-2x"></i>
              <div class="navi-title">Audio</div>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/image">
              <i class="fas fa-image fa-2x"></i>
              <div class="navi-title">Grafika</div>
            </router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link to="/settings">
              <i class="fas fa-cog fa-2x"></i>
              <div class="navi-title">Ustawienia</div>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <b @click="logout">
              <i class="fas fa-sign-out-alt fa-2x"></i>
              <div class="navi-title">Wyloguj</div>
            </b>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "UserMenu",
  components: {},
  methods: {
    logout: function() {
      this.$store.dispatch("user/clear");
      this.$router.push("/home");
    }
  }
};
</script>
<style scoped>
a {
  padding-left: 10px;
  text-align: center;
  text-decoration: none;
  color: #fff;
}
a:hover {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
}
.navbar {
  z-index: 15;
}
.navi-title {
  position:relative;
  left: 5px;
  font-size: 15px;
  text-align:center;
}
@media (min-width: 995px) {
  .navbar {
    z-index: 1000;
    padding-top: 5px;
    height: 100px;
    position: relative;
    padding-bottom: 2px;
  }
  #nav-collapse {
    position: absolute;
    right: 1%;
  }
}
</style>