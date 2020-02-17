<template>
  <div class="userDetails">
    <center><h1>Dane użytkownika</h1></center>
    <form action>
      <b-form-group>
        <label for>Nazwa użytkownika</label>
        <p><b>{{login}}</b></p>
      </b-form-group>
      <b-form-group>
        <label for>Adres email</label>
        <p><b>{{email}}</b></p>
      </b-form-group>
      <b-form-group>
        <label for>Wiek</label>
        <p><b>{{age==0 ? 'Dziecko' : age==1 ? 'Młodzież' : 'Dorosły'}}</b></p>
      </b-form-group>
      <b-form-group>
        <label for>Typ konta</label>
        <p><b>{{type ? 'Zwykły użytkownik' : 'administrator'}}</b></p>
      </b-form-group>
      <b-form-group>
        <label for>Aktywne</label>
        <p><b>{{active ? 'Aktywne': 'Nieaktywne'}}</b></p>
      </b-form-group>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserSettings",
  computed: {
    ...mapGetters("user", ["login", "email", "active", "type", "age"])
  }
};
</script>

<style scoped>
.userDetails {
  top: 10px;
  padding: 50px;
  left: 50%;
  transform: translate(-50%);
  min-width: 50vw !important;
  position: relative;
  background-color: rgba(0,0,0,0.1);
}
</style>