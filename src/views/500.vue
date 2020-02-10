<template>
  <div>
    <h1>Błąd serwera</h1>
    <p>
      {{this.message}}
    </p>
    <b-button>Wróć</b-button>
  </div>
</template>

<script>
export default {
  name: 'Error500',
  data() {
    return {
      message: req.params.message
    }
  },
}
</script>

<style>

</style>