<template>
  <div>
    <form @submit.prevent="validateAndUpdate">
      <h1>Edycja danych pliku graficznego</h1>
      <table class="table">
        <tbody>
          <tr>
            <th>Tytuł</th>
            <td>
              <input type="text" v-model="editImage.title" />
            </td>
          </tr>
          <tr>
            <th>Data</th>
            <td>
              <date-picker v-model="date" type="datetime" :placeholder="`Data do...`"></date-picker>
            </td>
          </tr>
          <tr>
            <th>Kolekcja</th>
            <td>
              <input type="text" v-model="editImage.collections" />
            </td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>
              <textarea type="text" v-model="editImage.description"></textarea>
            </td>
          </tr>
          <tr>
            <th>Słowa Kluczowe</th>
            <td>
              <input type="text" v-model="editImage.tags" />
            </td>
          </tr>
          <tr>
            <th>Ograniczenie wiekowe</th>
            <td>
              <select type="text" v-model="editImage.age_rate">
                <option value="0">Familijny</option>
                <option value="1">do 16lat</option>
                <option value="2">powyżej 16lat</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Szerokość</th>
            <td>
              <input type="text" v-model="editImage.width" />
            </td>
          </tr>

          <tr>
            <th>Wysokość</th>
            <td>
              <input type="text" v-model="editImage.height" />
            </td>
          </tr>
          <tr>
            <th>Plik</th>
            <td>
              <input type="file" accept="image/*" @change="fileHandle()" id="image" ref="image" />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="button"
                @click="validateAndUpdate"
                class="btn btn-primary"
                value="Zakutalizuj"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <img :src="currentSrc" alt />
  </div>
</template>

<script>
import slug from "slug";
import { mapActions, mapGetters } from "vuex";
import "vue2-datepicker/index.css";
import { address } from "../../store/api";
import DatePicker from "vue2-datepicker";
export default {
  name: "EditImage",
  components: {
    DatePicker
  },
  data() {
    return {
      slug: this.$route.params.slug,
      currentSrc: "",
      result: [],
      imageFile: "",
      indexOfAudio: 0,
      date: "",
    };
  },
  methods: {
    ...mapActions("image", [
      "showInfo",
      "clearInfo",
      "setInfo",
      "imageBySlug",
      "imageToEdit",
      "updateImageList"
    ]),
    validateAndUpdate: function() {
      //console.log(this.$refs.video.files[0] === undefined)
      //validate();
      //if(!validate) {}
      let metadata = {};
      console.log("DBD", this.editImage.tags);
      metadata.tags = this.editImage.tags[0].split(",").map(obj => obj.trim());
      metadata.title = this.editImage.title;
      metadata.description = this.editImage.description;
      metadata.timestamp = this.date.getTime()/1000;
      metadata.width = this.editImage.width;
      metadata.height = this.editImage.height;
      metadata.collection = this.editImage.collection;
      metadata.age_rate = this.editImage.age_rate;
      console.log(this.imageFile)
      // files
      let files = {};
      files.file = this.imageFile;
      files.slug = slug(metadata.title + "_" + metadata.timestamp);

      this.updateImage(metadata, files);
    },
    setImage: async function() {
      this.image = this.editImage;
    },
    loadArrays: function() {
      try {
        this.tags = this.image.tags.join(", ");
      } catch (error) {
        console.log(error);
      }
    },
    updateImage: function(meta, files) {
      meta.slug = slug(meta.title + "_" + meta.timestamp);
      meta.OLDslug = this.slug;
      this.clearInfo();
      this.$store
        .dispatch("image/updateMetaData", meta)
        .then(result => {
          this.result.push(result);
          this.setInfo("Dane pliku: " + result[0]);
          console.log(files)
          if (files.file != undefined) {
            this.$store.dispatch("image/uploadImage", files).then(result => {
              this.setInfo("Plik graficzny: " + result.data.response);
            })
          }
        })
        .catch(error => {
          console.log(error);
          this.setInfo("Błąd: " + error);
        });

      this.showInfo();
      this.$router.push("/admin/image");
    },
    fileHandle: function() {
      this.imageFile = this.$refs.image.files[0];
      this.tmpFile = URL.createObjectURL(this.imageFile);
      console.log(this.tmpFile);
      this.currentSrc = this.tmpFile;
    },
    imageToStream: function(path, thmb = "") {
      //console.log(path, "1");
      if (typeof path !== "undefined") {
        //console.log(path, "2");
        let parts = path.split("/");
        let slug = parts[parts.length - 1];
        return address + "/api/v1/image/stream" + thmb + "/" + slug;
      } else return "";
    }
  },
  created() {
    this.indexOfImage = this.images.findIndex(x => {
      return x._id == this.editImage._id;
    });
    this.setImage().then(() => {
      if (this.imageToEdit === undefined) {
        this.imageBySlug(this.slug);
        this.imageToEdit(this.image);
        this.loadArrays();
      }
    });
    this.date = new Date(this.editImage.timestamp * 1000);
    this.currentSrc = this.imageToStream(this.editImage.file_path);
  },
  computed: {
    ...mapGetters("image", ["editImage", "images"])
  }
};
</script>

<style scoped>
img {
  max-width: 80%;
}
</style>