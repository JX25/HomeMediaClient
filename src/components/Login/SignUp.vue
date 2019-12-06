<template>
  <div>
    <h1>Załóż konto</h1>
    <form>
      <div>
        <label for>Nazwa użytkownika</label>
        <input type="text" v-model="nickname"/>
      </div>
      <div>
        <label for>Email użytkownika</label>
        <input type="email" v-model="email"/>
      </div>
      <div>
        <label for>Hasło</label>
        <input type="password" v-model="password1"/>
      </div>
      <div>
        <label for>Powtórz hasło</label>
        <input type="password" v-model="password2"/>
      </div>
      <div>
        <label for>Data urodzenia</label>
        <input type="number" v-model="birthDay"/>
      </div>
      <div>
        <button @click.prevent="register()">Zarejestruj się</button>
      </div>
    </form>
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
    }
  }),
  components: {},
  methods: {}
};
</script>

<style>
.form-box {
}
label {
  padding: 5px;
}
</style>