<template>
    <div>
        <GuestMenu v-if="accountType" /> <!-- v-if="this.accountType === user" />
        <UserMenu v-else-if="this.accountType === admin" />
        <GuestMenu  v-else />-->
        <AdminMenu v-else-if="accountType=='XD'"/>
        <UserMenu v-else/>
    </div>
</template>

<script>
import AdminMenu from "./AdminMenu.vue";
import UserMenu from "./UserMenu.vue";
import GuestMenu from "./GuestMenu.vue";

export default {
    name: 'SiteMenu',
    data() {
        return {
            accountType : 'admin'
        }
    },
    components:{
        AdminMenu,
        UserMenu,
        GuestMenu,
    }
}
</script>

<style>

</style>