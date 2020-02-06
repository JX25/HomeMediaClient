<template>
  <div>
    <h3>Dodawanie nowego utworu muzycznego</h3>
    <b-tabs content-class="col md-6 mt-12">
      <b-tab title="Dodaj pojedynczy utwór" active>
        <AddOneAudio />
      </b-tab>
      <b-tab title="Dodaj cały album">
        <AddManyAudio />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>

import AddOneAudio from "./AddOneAudio"
import AddManyAudio from "./AddManyAudio"

export default {
  name: "AddAudio",
  components: {
    AddOneAudio,
    AddManyAudio
  },
  data() {
    return {
      filesDetails: false
    };
  },
  methods: {
  }
};
</script>

<style scoped>

</style>