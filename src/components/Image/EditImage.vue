<template>
  <div class="editImage col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12">
    <div class="header">
      <h2>Edycja danych pliku graficznego</h2>
    </div>
    <form @submit.prevent="validateAndUpdate">
      <table class="table table-hover">
        <tbody>
          <tr>
            <th>Tytuł</th>
            <td>
              <b-form-input type="text" v-model="editImage.title"></b-form-input>
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
              <b-form-input type="text" v-model="editImage.collections"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>
              <b-form-textarea type="text" v-model="editImage.description"></b-form-textarea>
            </td>
          </tr>
          <tr>
            <th>Słowa Kluczowe</th>
            <td>
              <b-form-input type="text" v-model="editImage.tags"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Ograniczenie wiekowe</th>
            <td>
              <b-form-select type="text" v-model="editImage.age_rate">
                <option value="0">Familijny</option>
                <option value="1">do 16lat</option>
                <option value="2">powyżej 16lat</option>
              </b-form-select>
            </td>
          </tr>
          <tr>
            <th>Szerokość</th>
            <td>
              <b-form-input type="text" v-model="editImage.width"></b-form-input>
            </td>
          </tr>

          <tr>
            <th>Wysokość</th>
            <td>
              <b-form-input type="text" v-model="editImage.height"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Plik</th>
            <td>
              <b-form-file
                accept=".jpeg, .jpg"
                ref="image"
                @change="fileHandle()"
                placeholder="nowa grafika..."
                drop-placeholder="Upuść plik tutaj..."
              ></b-form-file>
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      <input
        type="button"
        @click="validateAndUpdate"
        class="btn btn-primary submit"
        value="Zakutalizuj"
      />
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
      date: ""
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
      metadata.timestamp = this.date.getTime() / 1000;
      metadata.width = this.editImage.width;
      metadata.height = this.editImage.height;
      metadata.collection = this.editImage.collection;
      metadata.age_rate = this.editImage.age_rate;
      console.log(this.imageFile);
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
          console.log(files);
          if (files.file != undefined) {
            this.$store.dispatch("image/uploadImage", files).then(result => {
              this.setInfo("Plik graficzny: " + result.data.response);
            });
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
      this.imageFile = this.$refs.image.$refs.input.files[0];
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
  position:relative;
  top: 10px;
  width: 100%;
}
.editImage{
  margin: 0;
}
.submit {
  position: relative;
  left: 0.2em;
  top: 0.5em;
  width: 85vw !important;
}
</style>