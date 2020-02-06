<template>
  <div>
<div>
    <h3>Dodawanie nowej grafiki / zdjęcia</h3>
    <b-tabs content-class="col md-6 mt-12">
        <b-tab title="Dodaj jeden plik graficzny" active>
            <AddOneImage />    
        </b-tab>
        <b-tab title="Dodaj album plików graficznych">
            <AddManyImage />
        </b-tab>
    </b-tabs>
</div>
  </div>
</template>

<script>
import AddOneImage from "./AddOneImage"
import AddManyImage from "./AddManyImage"

export default {
    name: 'AddImage',
    components:{
        AddOneImage,
        AddManyImage,
    }
}
</script>

<style>

</style>