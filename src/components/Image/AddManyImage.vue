<template>
  <form @submit.prevent="vlidateAndSendAlbum">
    <table class="table">
      <tbody>
        <tr>
          <th>Nazwa albumu</th>
          <td>
            <input type="text" v-model="collection" />
          </td>
        </tr>
        <tr>
          <th>Zdjęcia / Pliki graficzne</th>
          <td>
            <div class="input-group mb-3">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  ref="imageFiles"
                  accept=".png, .jpeg, .jpg, .tiff"
                  @change="handleImageFiles"
                  multiple
                />
                <label class="custom-file-label" for="inputGroupFile02">Wybierz plik...</label>
              </div>
            </div>
          </td>
        </tr>
        <template v-if="filesDetails">
          <template v-for="(image, index) in this.files" class="fileDetails">
            <tr class="fileDetailName" :key="image.name">
              <th>Plik #{{index + 1}}</th>
              <td>{{image.name}}</td>
              <td>
                <img :src="image.src" alt v-if="loaded[index]" />
              </td>
            </tr>
            <tr :key="image.title">
              <th>Tytuł</th>
              <td>
                <input type="text" v-model="title[index]" />
              </td>
            </tr>
            <tr :key="image.timestamp">
              <th>Data zrobienia zdjęcia</th>
              <td>
                <input type="text" v-model="timestamp[index]" />
              </td>
            </tr>
            <tr :key="image.tags">
              <th>
                Słowa kluczowe
                <sub>a,b</sub>
              </th>
              <td>
                <input type="text" v-model="tags[index]" />
              </td>
            </tr>
            <tr :key="image.description">
              <th>Opis</th>
              <td>
                <textarea type="text" v-model="description[index]"></textarea>
              </td>
            </tr>
            <tr :key="image.height">
              <th>Wysokość (px)</th>
              <td>
                <input type="text" v-model="height[index]" />
              </td>
            </tr>
            <tr :key="image.width">
              <th>Szerokość (px)</th>
              <td>
                <input type="text" v-model="width[index]" />
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <b-button variant="primary" type="submit">Dodaj album</b-button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddManyImage",
  data() {
    return {
      title: [],
      timestamp: [],
      collection: "",
      tags: [],
      imageFiles: [],
      description: [],
      height: [],
      width: [],
      loaded: [],
      filesDetails: false
    };
  },
  methods: {
    ...mapActions("image", ["clearInfo", "setInfo", "showInfo"]),
    validateAndSendAlbum: function() {},
    handleImageFiles: function() {
      this.imageFiles = this.$refs.imageFiles.files;
      for (let i = 0; i <= this.imageFiles.length - 1; ++i) {
        this.handleImageFile(this.imageFiles[i], i);
      }
      this.filesDetails = true;
    },
    handleImageFile: function(image, index) {
      console.log(image, index);
      /*
     //this.imageFiles[index] = new Image()
      let tmpImage = new Image();
      tmpImage.src = URL.createObjectURL(image);
      tmpImage.onload = () => {
        tmpImage.width = this.imageFiles[index].width;
        tmpImage.height = this.imageFiles[index].height;
        this.loaded[index] = true;
      };
      this.timestamp[index] = this.imageFiles[index].lastModifiedDate
        .toString()
        .slice(0, 24);
      this.title[index] = image.name.split(".")[0];
      this.imageFiles[index] = tmpImage;*/
    },
    validateAndSend: function(i) {
      console.log(i);
    }
  }
};
</script>

<style>
</style>