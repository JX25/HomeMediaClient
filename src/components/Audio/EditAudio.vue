<template>
  <div>
    <form @submit.prevent="validateAndUpdate">
      <table class="table">
        <tbody>
          <tr>
            <th>Tytuł</th>
            <td>
              <input type="text" v-model="editAudio.title" />
            </td>
          </tr>
          <tr>
            <th>Album</th>
            <td>
              <input type="text" v-model="editAudio.album" />
            </td>
          </tr>
          <tr>
            <th>Autor/Zespół</th>
            <td>
              <input type="text" v-model="editAudio.author" />
            </td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>
              <input type="text" v-model="editAudio.description" />
            </td>
          </tr>
          <tr>
            <th>Rok</th>
            <td>
              <input type="text" v-model="editAudio.year" />
            </td>
          </tr>
          <tr>
            <th>Gatunek</th>
            <td>
              <input type="text" v-model="editAudio.genre" />
            </td>
          </tr>
          <tr>
            <th>Wiek</th>
            <td>
              <select type="text" v-model="editAudio.age_rate" selected="editAudio.age_rate">
                <option value="0">Familijny</option>
                <option value="1">do 16lat</option>
                <option value="2">powyżej 16lat</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Język</th>
            <td>
              <input type="text" v-model="editAudio.language" />
            </td>
          </tr>

          <tr>
            <th>Słowa kluczowe</th>
            <td>
              <input type="text" v-model="editAudio.tags" />
            </td>
          </tr>
          <tr>
            <th>Miniatura</th>
            <td>
              <input type="file" accept=".jpeg, .jpg, .png" id="thumbnail" ref="thumbnail" />
            </td>
          </tr>
          <tr>
            <th>Plik audio</th>
            <td>
              <input type="file" accept="audio/*" @change="fileHandle()" id="audio" ref="audio" />
            </td>
          </tr>

          <tr>
            <th>Długość utworu [s]</th>
            <td>
              <input type="text" v-model="editAudio.length" disabled />
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
    };
  },
  methods: {
    ...mapActions("audio", [
      "showInfo",
      "clearInfo",
      "setInfo",
      "audioBySlug",
      "audioToEdit",
      "updateAudioList",
    ]),
    validateAndUpdate: function() {
      //console.log(this.$refs.video.files[0] === undefined)
      //validate();
      //if(!validate) {}
      let metadata = {};
      console.log("DBD", this.editAudio.tags);
      metadata.tags = this.editAudio.tags[0].split(",").map(obj => obj.trim());
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
      files.file = this.$refs.audio.files[0];
      files.thumbnail = this.$refs.thumbnail.files[0];
      files.slug = slug(
        this.editAudio.title +
          "_" +
          this.editAudio.year +
          "_" +
          this.editAudio.author
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
      meta.slug = slug(meta.title + "_" + meta.year + "_" + meta.author);
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
      let fileURL = URL.createObjectURL(this.$refs.video.files[0]);
      getBlobDuration(fileURL).then(duration => {
        this.audio.length = parseInt(duration);
      });
    }
  },
  created() {
    this.indexOfAudio = this.audios.findIndex(x=>{
      return (x._id == this.editAudio._id)
    })
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
</style>