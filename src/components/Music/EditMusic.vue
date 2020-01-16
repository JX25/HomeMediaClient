<template>
  <div>
    <form @submit.prevent="editMusic">
      <table class="table">
        <tbody>
          <tr>
            <th>Tytuł</th>
            <td>
              <input type="text" v-model="music.title" />
            </td>
          </tr>
          <tr>
            <th>Album</th>
            <td>
              <input type="text" v-model="music.album" />
            </td>
          </tr>
          <tr>
            <th>Autor/Zespół</th>
            <td>
              <input type="text" v-model="music.author" />
            </td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>
              <input type="text" v-model="music.description" />
            </td>
          </tr>
          <tr>
            <th>Rok</th>
            <td>
              <input type="text" v-model="music.year" />
            </td>
          </tr>
          <tr>
            <th>Gatunek</th>
            <td>
              <input type="text" v-model="music.genre" />
            </td>
          </tr>
          <tr>
            <th>Wiek</th>
            <td>
              <select type="text" v-model="music.age_rate" :selected="music.age_rate">
                <option value="0">Familijny</option>
                <option value="1">do 16lat</option>
                <option value="2">powyżej 16lat</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Język</th>
            <td>
              <input type="text" v-model="music.language" />
            </td>
          </tr>

          <tr>
            <th>Słowa kluczowe</th>
            <td>
              <input type="text" v-model="this.tags" />
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
              <input
                type="file"
                accept="audio/*"
                @change="fileHandle()"
                id="music"
                ref="music"
              />
            </td>
          </tr>

          <tr>
            <th>Długość utworu [s]</th>
            <td>
              <input type="text" v-model="music.length" disabled />
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
import { mapActions, mapGetters } from "vuex";
import getBlobDuration from "get-blob-duration";
export default {
  name: "EditMusic",
  data() {
    return {
      music: this.musicToEdit,
      tags: [],
      slug: this.$route.params.slug,
      result: []
    };
  },
  methods: {
    ...mapActions("music", ["showInfo", "clearInfo", "setInfo"]),
    validateAndUpdate: function() {
      //console.log(this.$refs.video.files[0] === undefined)
      //validate();
      //if(!validate) {}
      let metadata = {};
      metadata.tags = this.tags.split(",").map(obj => obj.trim());
      //console.log(this.actors, this.director, this.tags)
      //console.log(metadata.actors, metadata.director, metadata.tags)
      metadata.title = this.music.title;
      metadata.description = this.music.description;
      metadata.year = this.music.year;
      metadata.album = this.music.album;
      metadata.author = this.music.author;
      metadata.genre = this.music.genre;
      metadata.language = this.music.language;
      metadata.age_rate = this.music.age_rate;
      metadata.length = this.music.length;
      // files
      let files = {};
      files.file = this.$refs.music.files[0];
      files.thumbnail = this.$refs.thumbnail.files[0];
      files.slug = this.music.title + "_" + this.music.year + "_" + this.music.
      this.updatemusic(metadata, files);
    },
    setmusic: async function() {
      this.music = this.editmusic;
    },
    loadArrays: function() {
      this.tags = this.music.tags.join(", ");
    },
    updatemusic: function(meta, files) {
      meta.slug = meta.title + "_" + meta.year + "_" + meta.author;
      meta.OLDslug = this.slug;
      this.clearInfo();
      console.log(meta.length);
      this.$store.dispatch("music/updateMetaData", meta).then(result => {
        //console.log("01", result)
        this.result.push(result[0]);
        this.setInfo("Dane pliku audio: " + result[0]);
      });
      if (files.thumbnail != undefined) {
        this.$store.dispatch("music/uploadThumbnail", files).then(result => {
          //console.log("02", result)
          this.setInfo("Miniatura: " + result.data.response);
        });
      }
      if (files.file != undefined) {
        this.$store.dispatch("music/uploadMusic", files).then(result => {
          //console.log("02", result)
          this.setInfo("Plik wideo: " + result.data.response);
        });
      }
      this.showInfo();
      this.$router.push("/admin/music");
    },
    fileHandle: function() {
      let fileURL = URL.createObjectURL(this.$refs.video.files[0]);
      getBlobDuration(fileURL).then(duration => {
        this.music.length = parseInt(duration);
      });
    }
  },
  created() {
    console.log(this.musicToEdit)
    this.setmusic().then(() => {
      let objLength = Object.entries(JSON.parse(JSON.stringify(this.musicToEdit)))
        .length;
      if (objLength === 0) {
        if (this.musics.length === 0) {
          this.$store.dispatch("music/musicBySlug", this.slug).then(() => {
            this.music = this.getmusic;
            this.loadArrays();
          });
        } else {
          this.music = this.getmusicBySlug(this.slug);
        }
      }
      this.loadArrays();
    });
  },
  computed:{
    ...mapGetters("music",["editMusic"])
  }
};
</script>

<style scoped>
</style>