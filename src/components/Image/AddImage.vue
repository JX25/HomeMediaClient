<template>
  <div class="add-graphic">
    <h3>Dodawanie nowej grafiki</h3>
    <b-tabs content-class="col md-6 mt-12" align="center">
      <b-tab title="Jeden..." active>
        <AddOneImage />
      </b-tab>
      <b-tab title="Wiele...">
        <AddManyImage />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import AddOneImage from "./AddOneImage";
import AddManyImage from "./AddManyImage";

export default {
  name: "AddImage",
  components: {
    AddOneImage,
    AddManyImage
  }
};
</script>

<style>
.add-graphic{
  position: relative;
  width: 100%!important;
  top: 0.5em;
  padding-bottom: 2em;
}

h3{
  text-align:center;
}
</style>