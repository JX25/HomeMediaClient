<template>
  <div id="menu">
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <b-navbar-brand href="#">
        Home Media Center
        <h6>Admin Panel</h6>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="auto">
          <b-nav-item>
            <router-link to="/admin/video">
              <i class="fas fa-film fa-2x"></i>
              <div class="navi-title">Wideo</div>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/admin/audio">
              <i class="fas fa-music fa-2x"></i>
              <div class="navi-title">Audio</div>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/admin/image">
              <i class="fas fa-image fa-2x"></i>
              <div class="navi-title">Grafika</div>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/admin/users">
              <i class="fas fa-users fa-2x"></i>
              <div class="navi-title">Użytkownicy</div>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/admin/admins">
              <i class="fas fa-user-tie fa-2x"></i>
              <div class="navi-title">Administratorzy</div>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/admin/server">
              <i class="fas fa-hdd fa-2x"></i>
              <div class="navi-title">Serwer</div>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/myaccount">
              <i class="fas fa-user-edit fa-2x"></i>
              <div class="navi-title">Konto</div>
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
  name: "AdminMenu",
  components: {},
  props: ["accountType"],
  methods: {
    logout: function() {
      localStorage.clear();
      this.$store.dispatch("user/clear");
      this.$router.push("/home");
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
a:hover {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
}
.navbar {
  z-index: 150;
}
.navi-title {
  font-size: 15px;
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