<template>
  <div class="guest-menu">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <router-link to="/home">MediaCenter</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/sign_in">
              <i class="fas fa-sign-in-alt fa-2x"></i>
              <div class="navi-title">Logowanie</div>
            </router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link to="/sign_up">
            <i class="fas fa-user-plus fa-2x"></i>
            <div class="navi-title">Rejestracja</div></router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link to="/about">
            <i class="fas fa-tasks fa-2x"></i>
            <div class="navi-title">O projekcie</div></router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "GuestMenu",
  components: {}
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