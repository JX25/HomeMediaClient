<template>
  <div>
    <h1>Załóż konto</h1>
    <form>
      <div>
        <label for>Nazwa użytkownika</label>
        <input type="text" v-model="form.nickname" />
      </div>
      <div>
        <label for>Email użytkownika</label>
        <input type="email" v-model="form.email" />
      </div>
      <div>
        <label for>Hasło</label>
        <input type="password" v-model="form.password1" />
      </div>
      <div>
        <label for>Powtórz hasło</label>
        <input type="password" v-model="form.password2" />
      </div>
      <div>
        <label for>Data urodzenia</label>
        <input type="number" v-model="form.birthDay" />
      </div>
      <div>
        <button @click.prevent="register()">Zarejestruj się</button>
      </div>
    </form>
    <div v-if="showError">
      <ul>
        <li v-for="error in errors" :key="error.id">{{ error }}</li>
      </ul>
    </div>
    <div v-if="showInfo">
      {{this.info}}
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({
    form: {
      nickname: '',
      email: '',
      password1: '',
      password2: '',
      birthDay: ''
    },
    errors: [],
    showError: false,
    info: '',
    showInfo: false
  }),
  components: {},
  methods: {
    register: function() {
      this.errors = []
      let isOK = this.checkForm()
      if(!isOK){
          this.showError = true
      }
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
    checkForm: function (){
      let status = true
      //nickname
      if(this.form.nickname.length < 4){
        this.errors.push("Nick za mało liter")
        status = false
      }
      //email

      //password
      if(this.form.password1 != this.form.password2){
        this.errors.push("Hasła są różne")
        status = false
      }

      //birthDay
      if(this.form.birthDay < 12) this.age_rate = 0
      else if(this.form.birthday >= 12 && this.form.birthday <= 16) this.age_rate = 1
      else this.age_rate = 2
      return status
    }
  }
};
</script>

<style>
.form-box {
}
label {
  padding: 5px;
}
</style>