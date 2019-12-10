<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <b-navbar-brand href="#">HomeMedia-Admin</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Filmy" right>
            <b-dropdown-item href="#">
              <router-link to="/admin/movie">Przeglądaj</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link to="/admin/movie/add">Dodaj film</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Muzyka" right>
             <b-dropdown-item href="#">
              <router-link to="/admin/music/">Przeglądaj</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link to="/admin/add/music/">Dodaj muzykę</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Zdjęcia" right>
            <b-dropdown-item href="#">
              <router-link to="/admin/photo">Przeglądaj</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link to="/admin/add/photo/">Dodaj zdjęcia</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item>
              <router-link to="/admin/users">Użytkownicy</router-link>              
          </b-nav-item>
          <b-nav-item>
              <router-link to="/admin/admins">Administratorzy</router-link>              
          </b-nav-item>
            <b-nav-item>
              <router-link to="/admin/server">Serwer</router-link>              
          </b-nav-item>
          <b-nav-item>
              <router-link to="/myaccount">Konto</router-link>              
          </b-nav-item>
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
  name: "AdminMenu",
  components: {},
  props: ['accountType'],
  methods: {
    logout: function() {
      localStorage.clear()
      this.$store.dispatch('user/clear')
      this.$router.push('/home')
    }
  },
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