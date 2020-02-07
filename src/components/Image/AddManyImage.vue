<template>
  <form @submit.prevent="validateAndSendAlbum">
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
          <template v-for="(image, index) in this.imageFiles" class="fileDetails">
            <tr class="fileDetailName" :key="image.name">
              <th colspan="2">Plik #{{index + 1}}</th>              
            </tr>
            <tr :key="imgs[index]">
              <td>
                <img :src="imgs[index].src" width="300px" />
              </td><td>{{image.name}}</td>
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
                <input type="text" v-model="timestamp[index]" disabled />
              </td>
            </tr>
            <tr :key="index">
              <th>
                Słowa kluczowe
                <sub>a,b</sub>
              </th>
              <td>
                <input type="text" v-model="tags[index]" />
              </td>
            </tr>
            <tr :key="index">
              <th>Opis</th>
              <td>
                <textarea type="text" v-model="description[index]"></textarea>
              </td>
            </tr>
            <tr :key="index">
              <th>Wysokość (px)</th>
              <td>
                <input type="text" v-model="height[index]" disabled/>
              </td>
            </tr>
            <tr :key="index">
              <th>Szerokość (px)</th>
              <td>
                <input type="text" v-model="width[index]" disabled/>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
      <tr>
        <b-button variant="primary" type="submit">Dodaj album</b-button>
      </tr>
    </table>
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
      imgs: [],
      description: [],
      height: [],
      width: [],
      loaded: [],
      filesDetails: false
    };
  },
  methods: {
    ...mapActions("image", ["clearInfo", "setInfo", "showInfo"]),
    validateAndSendAlbum: function() {
      this.clearInfo()
      for(let i = 0; i<this.imageFiles.length; ++i){
        this.send(i)
      }
      this.showInfo()
      this.$router.push("/admin/image")
    },
    send: function(index){
      //VALIDATE
      this.tags[index] = this.tags[index].split(",").map(x => x.trim())
      this.timestamp[index] = new Date(this.timestamp[index]).getTime() / 1000
      this.title[index].trim()
      this.collection.trim()
      let data = {
        title: this.title[index],
        timestamp: this.timestamp[index],
        tags: this.tags[index],
        collection: this.collection,
        width: this.width[index],
        height: this.height[index],
        description: this.description[index]  
      }
      this.$store.dispatch("image/uploadMetaData", data)
        .then(result => {
          this.setInfo("Dane pliku #" + index + ":" + result.msg)
          console.log(result)
          const slug = result.slg
          this.$store.dispatch("image/uploadImage",{
            slug: slug,
            file: this.imageFiles[index]
          }).then(result2 => {
            this.setInfo("Plik #"+index+" "+result2.data.response)
          })
        })
    },
    handleImageFiles: function() {
      this.imageFiles = this.$refs.imageFiles.files
      for (let i = 0; i < this.imageFiles.length; ++i) {
        this.handleImageFile(this.imageFiles[i], i);
      }
      this.filesDetails = true;
    },
    handleImageFile: function(image, index) {
      console.log(image, index, image.name);
      this.title[index] = image.name;
      this.timestamp[index] = image.lastModifiedDate.toString().slice(0, 24);
      this.imgs[index] = new Image();
      this.imgs[index].src = URL.createObjectURL(image);
      this.imgs[index].onload = () => {
        console.log(this.imgs[index].width);
        this.width[index] = this.imgs[index].width;
        this.height[index] = this.imgs[index].height;
      };
    },
  }
};
</script>

<style scoped>
img{
  width: 250px;
  height: auto;
}
</style>