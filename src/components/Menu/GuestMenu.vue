<template>
    <div class="menu-box">
    <v-toolbar>
         <router-link to="/home"><v-toolbar-title><v-icon>tv</v-icon>HomeMediaCenter</v-toolbar-title></router-link>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <router-link to="/"><v-btn text><v-icon>home</v-icon>Start</v-btn></router-link>
             <router-link to="/sign_in"><v-btn text><v-icon>account_box</v-icon>Logowanie</v-btn></router-link>
             <router-link to="/sign_up"><v-btn text><v-icon>person_add</v-icon>Rejestracja</v-btn></router-link>
            <router-link to="/about"><v-btn text><v-icon>web_asset</v-icon>O projekcie</v-btn></router-link>
        </v-toolbar-items>

    </v-toolbar>     
    </div>
</template>
<script>
export default {
    name: 'GuestMenu',
    components: {
    }
}
</script>
<style scoped>
a { 
     text-decoration: none;
     }
.menu-box{
    height: 120px;
    top: 0;
    width: 100%;
}
</style>