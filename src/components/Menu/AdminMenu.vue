<template>
  <div id="menu">
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <b-navbar-brand href="#">
        Home Media Center <h6>Admin Panel</h6></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="auto">
          <b-nav-item-dropdown text="Filmy" left>
            <template slot="button-content">
              <i class="fas fa-film fa-2x"></i>
              <div class="navi-title">Filmy</div>
            </template>
            <b-dropdown-item href="#">
              <router-link to="/admin/video">Przeglądaj</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link to="/admin/video/add">Dodaj nowy</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Muzyka" left>
            <template slot="button-content">
              <i class="fas fa-music fa-2x"></i>
              <div class="navi-title">Muzyka</div>
            </template>
            <b-dropdown-item href="#">
              <router-link to="/admin/audio/">Przeglądaj</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link to="/admin/audio/add">Dodaj muzykę</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Zdjęcia" left>
            <template slot="button-content">
              <i class="fas fa-image fa-2x"></i>
              <div class="navi-title">Zdjęcia</div>
            </template>
            <b-dropdown-item href="#">
              <router-link to="/admin/image">Przeglądaj</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link to="/admin/image/add">Dodaj zdjęcia</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
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
.navbar{
    z-index: 1;
}
.navi-title {
  font-size: 15px;
}
@media (min-width: 995px){
.navbar {
  padding-top: 20px;
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