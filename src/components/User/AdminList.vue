<template>
  <div>
      <table class="table table-bordered table-dark table-striped">
          <thead>
              <tr>
                  <th scope='col'># </th>
                  <th scope='col'>email </th>
                  <th scope='col'>Admin </th>
                  <th scope='col'>Active </th>
                  <th scope='col'>Phone </th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in admins" :key="index">
                <th scope="row"> {{ index }} </th>
                <td> {{ user.email }} </td>
                <td> {{ user.is_admin }} </td>
                <td> {{ user.active }} </td>
                <td> {{ user }} </td>
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    name: 'AdminList'
}
</script>

<style>

</style>