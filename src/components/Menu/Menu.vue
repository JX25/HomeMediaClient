<template>
    <div>
        <GuestMenu v-if="accountType ==='guest'" />
        <AdminMenu v-else-if="accountType ==='admin'" />
        <UserMenu  v-else />
    </div>
</template>

<script>
import AdminMenu from "./AdminMenu.vue";
import UserMenu from "./UserMenu.vue";
import GuestMenu from "./GuestMenu.vue";

export default {
    name: 'menu',
    data() {
        return {
            accountType : localStorage.type || 'guest'
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