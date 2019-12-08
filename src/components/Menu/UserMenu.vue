<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">HomeMedia</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/movie">Filmy</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/music">Muzyka</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/photo">Zdjęcia</router-link>
          </b-nav-item>

          <b-nav-item-dropdown text="Ustawienia" right>
            <b-dropdown-item href="#">
              <router-link to="/user/edit">Edycja konto</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link to="/user/">---</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link to="/user/delete">Usuń konto</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item>
            <b @click="logout">Wylogowanie</b>
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
}
.menu-box {
  height: 120px;
  top: 0;
  width: 100%;
}
</style>