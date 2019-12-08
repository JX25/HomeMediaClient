<template>
  <div>
    <h1>Zaloguj się</h1>
    <div v-if="this.error">{{this.errorContent}}</div>
    <div v-if="this.success">{{this.successContent}}</div>
    <form>
      <div>
        <label>Login</label>
        <input v-model="nickname" type="text" />
      </div>
      <div>
        <label>Hasło</label>
        <input v-model="password" type="password" />
      </div>
      <div>
        <button v-on:click.prevent="login()">Zaloguj się</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "SignIn",
  data: () => {
    return {
      nickname: "",
      password: "",
      success: false,
      successContent: "",
      error: false,
      errorContent: ""
    };
  },
  methods: {
    login: function() {
      this.$store
        .dispatch("user/login", {
          nickname: this.nickname,
          password: this.password
        })
        .then(result => {
          this.success = true
          this.successContent = result.message
          setTimeout( () => {
            this.$router.push('Home')
          }, 1500)

        })
        .catch(error => {
          this.error = true
          this.errorContent = error
        })
    }
  }
};
</script>

<style>
</style>