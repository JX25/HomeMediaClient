<template>
  <div>
        <h1>
          Błąd 401 Brak uprawnień
        </h1>
        <p>Możliwe, że wygasł token</p>
        <p>{{message}}</p>
        <b-button>Wróć</b-button>
  </div>
</template>

<script>
export default {
    name: 'Error401',
    data() {
        return {
            message: this.$router.params.message,
        }
    },
}
</script>

<style>

</style>