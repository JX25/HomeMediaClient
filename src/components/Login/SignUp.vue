<template>
  <div class="register-form">
    <h1>Rejestracja konta</h1>
    <div class="error-box">{{error}}</div>
    <form @submit.prevent="register()">
      <div>
        <b-form-group>
          <b-form-input
            v-model="nickname"
            name="login"
            v-validate="'min:4'"
            placeholder="Nazwa konta..."
            required
          ></b-form-input>
          <span class="error">{{errors.first('login')}}</span>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="email"
            name="email"
            v-model="email"
            placeholder="Email..."
            v-validate="'required|email'"
            required
          ></b-form-input>
          <span class="error">{{errors.first('email')}}</span>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="password"
            name="password1"
            v-model="password1"
            ref="password1"
            placeholder="Hasło..."
            v-validate="'required|min:6'"
            required
          ></b-form-input>
          <span class="error">{{errors.first('password1')}}</span>
        </b-form-group>
        <b-form-group>
          <b-form-input
            required
            type="password"
            name="password2"
            v-model="password2"
            placeholder="Powtórz hasło..."
            v-validate="'confirmed:password1'"
          ></b-form-input>
          <span class="error">{{errors.first('password2')}}</span>
        </b-form-group>
        <b-form-group>
          <b-form-input type="date" v-model="birthDay" name="birthday" required></b-form-input>
          <span class="error">{{errors.first('birthday')}}</span>
        </b-form-group>
        <b-form-group>
          <b-button variant="success" type="submit" :disabled="ifError">Zarejestruj się</b-button>
          <span class="error" v-if="ifError()">{{error}}</span>
        </b-form-group>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({
    nickname: "",
    email: "",
    password1: "",
    password2: "",
    birthDay: "",
    YEARS13: 315569260,
    YEARS16: 504910816,
    error: "Błąd"
  }),
  methods: {
    register: function() {
      if(this.errorsInForm) return
     // //console.log(this.birthDay);
      let seconds =
        new Date().getTime() / 1000 - new Date(this.birthDay).getTime() / 1000;
      let age_rate = 0;
      if (seconds < this.YEARS13) age_rate = 0;
      else if (seconds < this.YEARS16) age_rate = 1;
      else age_rate = 2;
    //  //console.log(
//        this.nickname,
  ///      this.password1,
     //   this.password2,
       // this.email,
       // age_rate
     // );
      this.$store
        .dispatch("user/register", {
          nickname: this.nickname,
          password: this.password1,
          email: this.email,
          age_rate: age_rate
        })
        .then(result => {
          if (result.status === 200) {
            this.info =
              "Użytkownik został utworzony pomyślnie\nMożesz się teraz zalogować";
            this.showInfo = true;
            setTimeout(() => {
              this.$router.push("/sign_in");
            }, 500);
          }
        })
        .catch(() => {
      //    //console.log(error);
        });
    },
    log: function() {
    //  //console.log("ABC");
    }
  },
  computed: {
      ifError: function(){ return this.$validator.errors.any()}
    }
  };
</script>

<style scoped>
.register-form {
  position: relative;
}

div h1 {
  padding-top: 7vh !important;
  padding: 10px;
  text-align: center;
}
form {
  margin: auto;
  max-width: 600px;
  min-width: 300px;
  padding: 1em;
}
button {
  position: realtive;
  width: 97%;
}

.error {
  font-size: 8pt;
  color: red;
}
</style>