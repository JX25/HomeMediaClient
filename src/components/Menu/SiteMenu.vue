<template>
    <div id="menu">
        <AdminMenu v-if="type===true"/> 
        <UserMenu v-else-if="type===false"/>
        <GuestMenu v-else/>
    </div>
</template>

<script>
import AdminMenu from "./AdminMenu.vue";
import UserMenu from "./UserMenu.vue";
import GuestMenu from "./GuestMenu.vue";
import { mapGetters } from 'vuex';

export default {
    name: 'SiteMenu',
    components:{
        AdminMenu,
        UserMenu,
        GuestMenu,
    },
    computed: {
        ...mapGetters("user", ["type"])
    },
}
</script>

<style scoped>

</style>