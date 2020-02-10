<template>
  <div>
    <form @submit.prevent="validateAndSend">
      <table class="table col-md-10">
        <tbody>
          <tr>
            <th>Tytuł zdjęcia</th>
            <td>
              <b-input v-model="title" type="text" />
            </td>
          </tr>
          <tr>
            <th>
              Czas zrobienia zdjęcia
              <input type="checkbox" class="form-check-input" />
            </th>

            <td>
              <b-input v-model="timestamp" type="text" disabled />
            </td>
          </tr>
          <tr>
            <th>Album/Kolekcja</th>
            <td>
              <b-input v-model="collection" type="text" />
            </td>
          </tr>
          <tr>
            <th>
              Słowa kluczowe
              <sub>a,b</sub>
            </th>
            <td>
              <b-input v-model="tags" type="text" />
            </td>
          </tr>
          <tr>
            <th>Plik graficzny / Zdjęcie</th>
            <td>
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    ref="imageFile"
                    accept=".png, .jpeg, .jpg, .tiff"
                    @change="handleImageFile"
                  />
                  <label class="custom-file-label" for="inputGroupFile02">Wybierz plik...</label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>
              <b-textarea v-model="description" type="textarea"></b-textarea>
            </td>
          </tr>
          <tr>
            <th>Kategoria wiekowa</th>
            <td>
              <b-select v-model="age_rate">
                <option value="0">Dla wszystkich</option>
                <option value="1">do 16</option>
                <option value="2">16+</option>
              </b-select>
            </td>
          </tr>
          <tr>
            <th>Wysokość (px)</th>
            <td>
              <b-input type="text" v-model="height" disabled />
            </td>
          </tr>

          <tr>
            <th>Szerokość (px)</th>
            <td>
              <b-input type="text" v-model="width" disabled />
            </td>
          </tr>
          <tr>
            <button class="btn btn-primary">Dodaj plik</button>
          </tr>
        </tbody>
      </table>
    </form>
    <img :src="img.src" v-if="loaded" />
  </div>
</template>

<script>
import EXIF from "exif-js";
import { mapActions } from "vuex";
export default {
  name: "AddOneImage",
  data() {
    return {
      title: "",
      timestamp: "",
      collection: "",
      tags: "",
      file: "",
      description: "",
      age_rate: 0,
      img: "",
      loaded: false,
      width: "",
      height: ""
    };
  },
  methods: {
    ...mapActions("image", ["clearInfo", "setInfo", "showInfo"]),
    validateAndSend: function() {
      //VALIDATE TODO
      this.tags = this.tags.split(",").map(x => x.trim());
      this.timestamp = new Date(this.timestamp).getTime();
      this.collection = this.collection.trim();
      //SEND
      this.clearInfo();
      let data = {
        title: this.title,
        timestamp: this.timestamp,
        tags: this.tags,
        collection: this.collection,
        width: this.width,
        height: this.height,
        description: this.description,
        age_rate: this.age_rate,
      }
      this.$store.dispatch("image/uploadMetaData", data).then(result => {
          console.log("333", result)
        this.setInfo("Dane pliku: " + result.msg);
        const slug = result.slg;
        this.$store
          .dispatch("image/uploadImage", {
            slug: slug,
            file: this.file
          })
          .then(result2 => {
            this.setInfo("Miniatura grafiki: " + result2.data.response);
          })
          .finally(() => {
            this.showInfo();
            this.$router.push("/admin/image");
          });
      });
    },
    handleImageFile: function() {
      this.file = this.$refs.imageFile.files[0];
      console.log("1", this.file);
      this.img = new Image();
      this.img.src = URL.createObjectURL(this.file);
      this.img.onload = () => {
        this.width = this.img.width;
        this.height = this.img.height;
        this.loaded = true;
      };
      this.timestamp = this.file.lastModifiedDate.toString().slice(0, 24);
      this.title = this.file.name.split(".")[0];
      EXIF.getData(this.file, () => {
        //console.log("image info", this);
        //console.log("exif data", this.exifdata);
      });
    }
  }
};
</script>

<style scoped>
.btn {
  position: relative;
  left: 50%;
  width: 100%;
  transform: translate(50%);
}
img {
  position: relative;

  width: 50%;
}
</style>