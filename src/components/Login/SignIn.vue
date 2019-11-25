<template>
  <div>
    <h1>Zaloguj się</h1>
    <form v-if="!submitted" class="">
      <div class="form-box col span-4">
        <div class="form-group col-md-4 form-inline">
          <label>Nick:</label>
          <input type="text" class="form-control" v-model="nickname" />
        </div>
        <div class="form-group col-md-4 form-inline">
          <label>haslo:</label>
          <input type="password" class="form-control" v-model="password1" />
        </div>

        <div class="form-group col-md-4 form-inline">
          <button @click.prevent="submitted = true" class="btn flat btn-primary">Zaloguj się</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
    name: 'SignIn',
    data() {
      return {
        nickname: '',
        password1: '',
        submitted: false
      }
    },
}
</script>

<style>

</style>