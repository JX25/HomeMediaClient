<template>
  <div class="register-form">
    <h1>Rejestracja konta</h1>
    <form>
      <div>
      <b-form-group>
        <b-form-input type="text" v-model="form.nickname" placeholder="Nazwa konta..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-form-input type="mail" v-model="form.email" placeholder="Email..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-form-input type="password" v-model="form.password1" placeholder="Hasło..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-form-input type="password" v-model="form.password2" placeholder="Powtórz hasło..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-form-input type="date" v-model="form.birthDay" placeholder="Data urodzenia..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-button variant="success" @click.prevent="register()">Zarejestruj się</b-button>
      </b-form-group>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({
    form: {
      active: false,
      nickname: '',
      email: '',
      password1: '',
      password2: '',
      birthDay: ''
    }
  }),
  methods: {
    register: function() {     
      this.$store.dispatch("user/register",{
        nickname: this.form.nickname,
        password: this.form.password1,
        email: this.form.email,
        age_rate: this.age_rate
      }).then(result => {
        if(result.status === 200){
          this.info = "Użytkownik został utworzony pomyślnie\nMożesz się teraz zalogować"
          this.showInfo = true
          setTimeout( () => {
              this.$router.push('/sign_in')
          }, 1000)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    log: function(){
      console.log("ABC")
    }
  }
};
</script>

<style scoped>
.register-form{
  position: relative;
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
</style>