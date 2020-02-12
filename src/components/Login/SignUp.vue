<template>
  <div class="register-form">
    <h1>Rejestracja konta</h1>
    <div class="error-box">
      {{error}}
    </div>
    <form @submit.prevent="register()">
      <div>
      <b-form-group>
        <b-form-input v-model="nickname" placeholder="Nazwa konta..."> </b-form-input>

     </b-form-group>
      <b-form-group>
        <b-form-input type="email" v-model="email" placeholder="Email..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-form-input type="password" v-model="password1" placeholder="Hasło..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-form-input type="password" v-model="password2" placeholder="Powtórz hasło..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-form-input type="date" v-model="birthDay" placeholder="Data urodzenia..."> </b-form-input>
     </b-form-group>
      <b-form-group>
        <b-button variant="success" type="submit">Zarejestruj się</b-button>
      </b-form-group>
      </div>
    </form>
  </div>
</template>

<script>
import TYPES from '../../plugins/bootstrapTypes'


export default {
  name: "SignUp",
  data: () => ({
      nickname: '',
      email: '',
      password1: '',
      password2: '',
      birthDay: '',
      types: TYPES,
      YEARS13: 315569260,
      YEARS16: 504910816,
      error: '',
  }),
  methods: {
    register: function() {    
      console.log(this.birthDay)
      let seconds = new Date().getTime()/1000 - new Date(this.birthDay).getTime()/1000
      let age_rate = 0
      if(seconds < this.YEARS13) age_rate = 0
      else if(seconds < this.YEARS16) age_rate = 1
      else age_rate = 2
      console.log(this.nickname, this.password1, this.password2, this.email, age_rate)
      this.$store.dispatch("user/register",{
        nickname: this.nickname,
        password: this.password1,
        email: this.email,
        age_rate: age_rate
      }).then(result => {
        if(result.status === 200){
          this.info = "Użytkownik został utworzony pomyślnie\nMożesz się teraz zalogować"
          this.showInfo = true
          setTimeout( () => {
              this.$router.push('/sign_in')
          }, 500)
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
  position: realtive;
  width: 97%;
}
</style>