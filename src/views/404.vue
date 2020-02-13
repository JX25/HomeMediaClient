<template>
  <div>
      <h1>Błąd 404 nie znaleziono zasobu...</h1>
      <p>
          {{message}}
      </p>
      <b-button>Wróć</b-button>
  </div>
</template>

<script>
export default {
    name: 'Error404',
    data() {
        return {
            message: this.$router.params.message
        }
    },
}
</script>

<style>

</style>