<template>
  <div id="adminList">
    <center>
      <h1>Lista administratorów</h1>
    </center>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="userIndex">#</th>
          <th>Nazwa użytkownika</th>
          <th>Adres Email</th>
          <th>Data utworzenia</th>
          <th>Ostatnia edycja</th>
          <th>Kat. wiekowa / Wyłącz / Usuń / Typ użytk.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in admins" :key="index">
          <td class="userIndex">{{index+1}}</td>
          <td>{{user.nickname}}</td>
          <td>{{user.email}}</td>
          <td>{{user.created_date.toString().slice(0,10)}}</td>
          <td>{{user.modified_date.toString().slice(0,10)}}</td>
          <td class="buttons">
            <div>
              <b-button
                class="age-rate"
                :variant="user.age_rate === 0 ? 'primary' : 'grey'"
                @click="changeAgeRate(user, index, 0)"
              >Dziecko</b-button>
            </div>
            <div>
              <b-button
                class="age-rate"
                :variant="user.age_rate === 1 ? 'primary' : 'grey'"
                @click="changeAgeRate(user, index, 1)"
              >Młodzież</b-button>
            </div>
            <div>
              <b-button
                class="age-rate"
                :variant="user.age_rate === 2 ? 'primary' : 'grey'"
                @click="changeAgeRate(user, index, 2)"
              >Dorosły</b-button>
            </div>
          </td>
          <td class="off-delete" v-if="user.nickname != 'administrator'">
            <div @click="changeActive(user.nickname, index)">
              <b-button variant="success" v-if="user.active">AKTYWNE</b-button>
              <b-button variant="warning" v-else>NIEAKTYWNE</b-button>
            </div>
            <div>
              <b-button variant="warning" @click="changeType(user.nickname, index)">Odbierz uprawnienia</b-button>
            </div>
            <div>
              <b-button variant="danger" @click="removeUser(user.nickname, index)">USUŃ</b-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserList",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions("user", ["getAllAdmins", "editUser", "deleteUser"]),
    userAge: function(value) {
      switch (value) {
        case 0:
          return "Dziecko";
        case 1:
          return "Młodzież";
        default:
          return "Dorosły";
      }
    },
    changeAgeRate: function(user, index, value) {
      if (user.age_rate != value) {
        let updateData = {
          nickname: user.nickname,
          age_rate: value
        };
        this.editUser(updateData)
          .then(result => {
            console.log(result);
            this.users[index].age_rate = value;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    removeUser: function(nickname, index) {
      this.$dialog
        .confirm("Czy na pewno chcesz usunąć użytkownika " + nickname)
        .then(() => {
          this.deleteUser(nickname, this.type)
            .then(result => {
              console.log(result);
              this.users.splice(index, 1);
            })
            .catch(error => {
              console.log(error);
            });
        });
    },
    changeActive: function(nickname, index) {
      let updateData = {
        nickname: nickname,
        active: !this.users[index].active
      };
      console.log(nickname, index);
      this.editUser(updateData)
        .then(result => {
          console.log(result);
          this.users[index].active = updateData.active;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters("user", ["age", "admins", "type"])
  },
  created() {
    console.log("XD");
    this.getAllAdmins().then(() => {
      console.log("Downloaded all users");
    });
    console.log("#", this.users);
  }
};
</script>

<style scoped>
table {
  width: 100% !important;
  text-align: center;
}
.buttons {
  display: flex;
}
.buttons .button {
  width: fit-content;
}

td {
  vertical-align: middle !important;
}

@media (max-width: 1024px) {
  .userIndex {
    display: none;
  }
}

@media (max-width: 878px) {
  tr {
    display: grid;
    width: 100vw!important;
  }
}
.off-delete{
  display: flex;
}
</style>