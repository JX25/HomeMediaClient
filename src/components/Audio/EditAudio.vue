<template>
  <div class="editAudio col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12">
    <div class="header">
      <h2>Edycja danych pliku audio</h2>
    </div>
    <b-form @submit.prevent="validateAndUpdate">
      <table class="table table-hover">
        <tbody>
          <tr>
            <th>Tytuł</th>
            <td>
              <b-form-input v-model="editAudio.title"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Album</th>
            <td>
              <b-form-input v-model="editAudio.album"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Autor/Zespół</th>
            <td>
              <b-form-input v-model="editAudio.author"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>
              <b-form-input v-model="editAudio.description"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Rok</th>
            <td>
              <b-form-input type="number" v-model="editAudio.year"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Gatunek</th>
            <td>
              <b-form-input v-model="editAudio.genre"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Wiek</th>
            <td>
              <b-form-select v-model="editAudio.age_rate" selected="editAudio.age_rate">
                <option value="0">Familijny</option>
                <option value="1">do 16lat</option>
                <option value="2">powyżej 16lat</option>
              </b-form-select>
            </td>
          </tr>
          <tr>
            <th>Język</th>
            <td>
              <b-form-input v-model="editAudio.language"></b-form-input>
            </td>
          </tr>

          <tr>
            <th>Słowa kluczowe</th>
            <td>
              <b-form-input v-model="tags"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Miniatura</th>
            <td>
              <b-form-file
                accept=".jpeg, .jpg"
                ref="thumbnail"
                placeholder="nowa miniatura..."
                drop-placeholder="Upuść plik tutaj..."
              ></b-form-file>
            </td>
          </tr>
          <tr>
            <th>Plik audio</th>
            <td>
              <b-form-file
                accept="audio/*"
                @change="fileHandle()"
                ref="audio"
                placeholder="nowy plik audio..."
                drop-pl
                aceholder="Upuść plik tutaj..."
              ></b-form-file>
            </td>
          </tr>

          <tr>
            <th>Długość utworu [s]</th>
            <td>
              <b-form-input v-model="editAudio.length" disabled></b-form-input>
            </td>
          </tr>

          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      <input @click="validateAndUpdate" class="btn btn-primary submit" value="Zakutalizuj" />
    </b-form>
  </div>
</template>

<script>
import slug from "slug";
import { mapActions, mapGetters } from "vuex";
import getBlobDuration from "get-blob-duration";
export default {
  name: "EditAudio",
  data() {
    return {
      slug: this.$route.params.slug,
      result: [],
      indexOfAudio: 0,
      tags: ''
    };
  },
  methods: {
    ...mapActions("audio", [
      "showInfo",
      "clearInfo",
      "setInfo",
      "audioBySlug",
      "audioToEdit",
      "updateAudioList"
    ]),
    validateAndUpdate: function() {
      //console.log(this.$refs.video.files[0] === undefined)
      //validate();
      //if(!validate) {}
      let metadata = {};
      console.log("DBD", this.editAudio.tags);
      metadata.tags = this.tags.split(",").map(obj => obj.trim());
      metadata.title = this.editAudio.title;
      metadata.description = this.editAudio.description;
      metadata.year = this.editAudio.year;
      metadata.album = this.editAudio.album;
      metadata.author = this.editAudio.author;
      metadata.genre = this.editAudio.genre;
      metadata.language = this.editAudio.language;
      metadata.age_rate = this.editAudio.age_rate;
      metadata.length = this.editAudio.length;
      // files
      let files = {};
      files.file = this.$refs.audio.$refs.input.files[0];
      files.thumbnail = this.$refs.thumbnail.$refs.input.files[0];
      files.slug = slug(
        this.editAudio.title +
          "_" +
          this.editAudio.year +
          "_" +
          this.editAudio.album
      );

      this.updateAudio(metadata, files);
    },
    setAudio: async function() {
      this.audio = this.editAudio;
    },
    loadArrays: function() {
      try {
        this.tags = this.audio.tags.join(", ");
      } catch (error) {
        console.log(error);
      }
    },
    updateAudio: function(meta, files) {
      console.log(files);
      meta.slug = slug(meta.title + "_" + meta.year + "_" + meta.album);
      meta.OLDslug = this.slug;
      this.clearInfo();
      this.$store
        .dispatch("audio/updateMetaData", meta)
        .then(result => {
          this.result.push(result[0]);
          this.setInfo("Dane pliku audio: " + result[0]);

          if (files.thumbnail != undefined) {
            this.$store
              .dispatch("audio/uploadThumbnail", files)
              .then(result => {
                this.setInfo("Miniatura: " + result.data.response);
              });
          }
          if (files.file != undefined) {
            this.$store.dispatch("audio/uploadAudio", files).then(result => {
              this.setInfo("Plik wideo: " + result.data.response);
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.setInfo("Błąd: " + error);
        });

      this.showInfo();
      this.$router.push("/admin/audio");
    },
    fileHandle: function() {
      let fileURL = URL.createObjectURL(this.$refs.audio.$refs.input.files[0]);
      getBlobDuration(fileURL).then(duration => {
        this.audio.length = parseInt(duration);
      });
    }
  },
  created() {
    this.tags = this.editAudio.tags.join(",")
    this.indexOfAudio = this.audios.findIndex(x => {
      return x._id == this.editAudio._id;
    });
    this.setAudio().then(() => {
      if (this.audioToEdit === undefined) {
        this.audioBySlug(this.slug);
        this.audioToEdit(this.audio);
        this.loadArrays();
      }
    });
  },
  computed: {
    ...mapGetters("audio", ["editAudio", "audios"])
  }
};
</script>

<style scoped>
.header {
  position: realtive;
  width: 100vw !important;
  text-align: center;
}

.editAudio {
  padding: 0;
  margin: 0px;
  top: 1em;
  padding-bottom: 2em;
  width: 100% !important;
}



.table {
  width: 100vw !important;
  position: relative;
  top: 1em;
}

th {
  left: 0px;
  width: fit-content;
  font-size: 1em;
  text-align: left;
  max-width: 15vw;
  font-size: 13pt;
}

td {
  width: 100vw;
  padding: 0px;
}

.submit {
  position: relative;
  left: 0.2em;
  top: 0.5em;
  width: 96vw !important;
}
</style>