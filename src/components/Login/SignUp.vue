<template>
  <div>
    <h1>Załóż konto</h1>
    <form v-if="!formValues.submitted" class="">
      <div class="form-box col span-4">
        <div class="form-group col-md-4 form-inline">
          <label>Nick:</label>
          <input type="text" class="form-control" v-model="formValues.nickname" />
        </div>
        <div class="form-group col-md-4 form-inline">
          <label>e-mail:</label>
          <input type="email" class="form-control" v-model="formValues.email" />
        </div>
        <div class="form-group col-md-4 form-inline">
          <label>haslo:</label>
          <input type="password" class="form-control" v-model="formValues.password1" />
        </div>
        <div class="form-group col-md-4 form-inline">
          <label>powtorz haslo:</label>
          <input type="password" class="form-control" v-model="formValues.password2" />
        </div>
        <div class="form-group col-md-4 form-inline">
          <label>Data urodzenia:</label>
         
        </div>
        <div class="form-group col-md-4 form-inline">
          <button @click="this.checkForm" class="btn flat btn-primary">Zarejestruj się</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: "SignUp",
  data: () => ({
    formValues: {
      nickname: "",
      email: "",
      password1: "",
      password2: "",
      birthDate: new Date(2019, 1, 1),
      submitted: false
    }
  }),
  components: {
 
  },
  methods: {
    checkForm() {
        console.log("XD");
    },
    registerUser: () => {
      
    }
  },
};
</script>

<style>
.form-box {
}
label {
  padding: 5px;
}
</style>