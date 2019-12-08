<template>
    <div>
        <AdminMenu v-if="this.$store.state.user.type===true"/> 
        <UserMenu v-else-if="this.$store.state.user.type===false"/>
        <GuestMenu v-else/>
    </div>
</template>

<script>
import AdminMenu from "./AdminMenu.vue";
import UserMenu from "./UserMenu.vue";
import GuestMenu from "./GuestMenu.vue";

export default {
    name: 'SiteMenu',
    components:{
        AdminMenu,
        UserMenu,
        GuestMenu,
    },
}
</script>

<style>

</style>