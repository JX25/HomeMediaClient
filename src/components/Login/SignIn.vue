<template>
  <div>
    <h1>Panel logowania</h1>
    <div class="error-box" v-if="this.error">{{this.errorContent}}</div>
    <div class="success-box" v-if="this.success">{{this.successContent}}</div>
    <form>
      <b-form-group>
        <b-form-input v-model="nickname" placeholder="Login..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-form-input type="password" v-model="password" placeholder="Hasło..."> </b-form-input>
      </b-form-group>
      <b-form-group>
        <b-button variant="primary" @click.prevent="login()" :disabled="allowSend">Zaloguj się</b-button>
      </b-form-group>
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
            this.$router.push('Home')
          }, 1500)
        })
        .catch(error => {
          this.error = true
          this.errorContent = error
        })
    },
  },
  computed: {
  allowSend: function(){
      return (this.nickname.length<3 ||  this.password.length<6)
    }
  },
};
</script>

<style scoped>
div{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  max-width: 600px;
  min-width: 300px;
}

.error-box{
  position: relative;
  top: 10px;
  width: 50%;
  color: red;
}
.success-box{
  position: relative;
  top: 10px;
  width: 50%;
  color: green;
}
</style>