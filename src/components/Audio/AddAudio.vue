<template>
  <div class="add-audio">
    <h3>Dodawanie nowego audio</h3>
    <b-tabs content-class="col md-6 mt-12" align="center">
      <b-tab title="Jeden..." active>
        <AddOneAudio />
      </b-tab>
      <b-tab title="Wiele...">
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
.add-audio{
  position: relative;
  width: 100%!important;
  top: 0.5em;
  padding-bottom: 2em;
}

h3{
  text-align:center;
}
</style>