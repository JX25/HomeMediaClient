<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <router-link to="/home">MediaCenter</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/sign_in">Logowanie</router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link to="/sign_up">Rejestracja</router-link>
          </b-nav-item>

          <b-nav-item >
            <router-link to="/about">O projekcie</router-link>
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
i{
  color: white;
}
button href{
	text-decoration: none;
  color: white;
}
a{
    text-decoration: none;
}
</style>