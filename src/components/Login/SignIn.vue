<template>
  <div class="login-form">
    <h1>Panel logowania</h1>
    <div class="error-box" v-if="this.error">{{this.errorContent}}</div>
    <div class="success-box" v-if="this.success">{{this.successContent}}</div>
    <form @submit.prevent="login()">
      <div>
      <b-form-group>
        <b-form-input v-model="nickname" placeholder="Login..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-form-input type="password" v-model="password" placeholder="Hasło..."> </b-form-input>
      </b-form-group>
      <b-form-group>
        <b-button variant="primary"  type="submit" :disabled="allowSend">Zaloguj się</b-button>
      </b-form-group>
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
          console.log(result)
          this.successContent = result.message
          setTimeout( () => {
            this.$router.push('Home?status=login')
          }, 100)
        })
        .catch(error => {
          let code = error.response.status
          this.error = true
          switch(code){
            case 401:
            case 404:
              this.errorContent = "Nie można się zalogować na takiego użytkownika"
              break
            case 500:
              this.errorContent = "Problem z serwerem, nie można się zalogować"
              break
            default:
              this.erroContent = "Nieznany błąd, nie można się zalogować"
              break
          }
        })
    },
  },
  computed: {
  allowSend: function(){
      return (this.nickname.length<3 ||  this.password.length<3)
    }
  },
};
</script>

<style scoped>
.login-form{
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

div h1{
  padding-top: 7vh!important;
  padding: 10px;
  text-align: center;
}
form{
  margin: auto;
  max-width: 600px;
  min-width: 300px;
  padding: 1em;
}
button{
  width: 97%;

}

.error-box{
  position: relative;
  width: 100%;
  text-align: center;
  color: red;
}
.success-box{
  position: relative;
  width: 100%;
  text-align: center;
  color: green;
}
</style>