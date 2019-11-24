<template>
  <div>
    <h1>Załóż konto</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="15"
              label="Pseudonim"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              :type="password"
              v-model="password1"
              :rules="passwordRules"
              :counter="10"
              label="password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              :type="password"
              v-model="password2"
              :rules="passwordRules"
              :counter="10"
              label="repeat password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
          Data urodzenia: <br/>
            <v-date-picker
              v-model="picker"
              :landscape="landscape"
              :reactive="reactive"
              :full-width="fullWidth"
              :show-current="showCurrent"
              :type="month ? 'month' : 'date'"
              :multiple="multiple"
              :events="enableEvents ? functionEvents : null"
            ></v-date-picker>
          </v-col>
        </v-row>
      </v-container>
      <v-row>
        <v-col>
          <v-btn primary cols="12" md="12">Załóż konto</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>

<style>
</style>