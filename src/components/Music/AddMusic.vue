<template>
  <div>
    <h3>Dodawanie nowego utworu muzycznego</h3>
    <div id="errorbox" v-if="isError">{{this.error}}</div>
    <div id="successbox" v-if="isSuccess">{{this.success}}</div>
    <b-tabs content-class="col md-6 mt-12">
      <b-tab title="Dodaj pojedynczy utwór" active>
        <form @submit.prevent="validateAndSend(0)">
          <table class="table">
            <tbody>
              <tr>
                <th>Tytuł</th>
                <td>
                  <input type="text" v-model="title[0]" />
                </td>
              </tr>
              <tr>
                <th>Autor</th>
                <td>
                  <input type="text" v-model="author" />
                </td>
              </tr>
              <tr>
                <th>Album</th>
                <td>
                  <input type="text" v-model="album" />
                </td>
              </tr>

              <tr>
                <th>Rok</th>
                <td>
                  <input type="number" :max="currentYear" :min="1900" v-model="year" />
                </td>
              </tr>
              <tr>
                <th>Gatunek</th>
                <td>
                  <input type="text" v-model="genre" />
                </td>
              </tr>
              <tr>
                <th>Miniatura</th>
                <td>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/jpeg image/png"
                    @change="handleThumbnailFile"
                    ref="thumbnail"
                  />
                </td>
              </tr>
              <tr>
                <th>Plik</th>
                <td>
                  <input
                    type="file"
                    accept="audio/*"
                    @change="handleAudioFile(0)"
                    id="file"
                    ref="audio"
                  />
                </td>
              </tr>
              <tr>
                <th>Długość</th>
                <td>
                  <input type="text" disabled v-model="length" />
                </td>
              </tr>
              <tr>
                <th>Wiek (PEGI)</th>
                <td>
                  <select name="pegi" id="pg" v-model="pegi">
                    <option value="0">Familijny</option>
                    <option value="1">Wiek &#x3c;16</option>
                    <option value="2">Wiek 16+</option>
                  </select>
                </td>
              </tr>

              <tr>
                <th>Język</th>
                <td>
                  <input type="text" v-model="language" />
                </td>
              </tr>
              <tr>
                <th>
                  Słowa kluczowe
                  <sub>a,b</sub>
                </th>
                <td>
                  <input type="text" v-model="tags[0]" />
                </td>
              </tr>
              <tr>
                <th>Opis utworu</th>
                <td>
                  <v-icon name="beer"></v-icon>
                  <textarea name="description" id cols="30" rows="1" v-model="description"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <b-button variant="primary" type="submit">Dodaj utwór</b-button>
        </form>
      </b-tab>
      <b-tab title="Dodaj cały album">
        <p>I'm the second tab</p>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import getBlobDuration from "get-blob-duration";

export default {
  name: "AddMusic",
  data() {
    return {
      title: [],
      description: [],
      author: "",
      album: "",
      year: 0,
      language: "",
      currentYear: "",
      genre: "",
      thumbnail: [],
      audioFiles: [],
      length: [],
      pegi: "",
      tags: [],
      tmpURL: "",
      isError: false,
      isSuccess: false,
      error: "",
      success: ""
    };
  },
  methods: {
    ...mapActions("music", ["clearInfo", "setInfo", "showInfo"]),
    validateAndSend: function(i) {
      //validation TODO
      this.tags = this.tags[i].split(",").map(x => x.trim());
      let lengthInSeconds = this.length[i].split(" ");
      for (let index in lengthInSeconds) {
        lengthInSeconds[index] = lengthInSeconds[index].match(/\d+/)[0];
      }
      lengthInSeconds =
        Number(lengthInSeconds[0] * 60) + Number(lengthInSeconds[1]);
        this.clearInfo()
        let data = {
            title: this.title[i],
            author: this.author,
            album: this.album,
            year: this.year,
            genre: this.genre,
            tags: this.tags[i],
            length: lengthInSeconds,
            age_rate: this.age_rate,
            language: this.language,
            description: this.description[i],
        }
        this.$store
        .dispatch("music/uploadMetaData", data)
        .then(result => {
          console.log(result);
          this.setInfo("Dane pliku: " + result.msg)
          const slugThumbnail = result.thmb
          const slug = result.slg
         this.$store
            .dispatch("music/uploadThumbnail", {
              slug: slugThumbnail,
              thumbnail: this.thumbnail
            })
            .then(result2 => {
              console.log("2", result2);
              this.setInfo("Miniatura audio: " + result2.data.response);
              this.$store
                .dispatch("music/uploadMusic", { slug: slug, file: this.audioFiles[i] })
                .then(finalResult => {
                  this.setInfo("Plik audio: " + finalResult.data.response);
                  this.isSuccess = true;
                  this.success = "final";
                  console.log("3", finalResult);
                })
                .finally(res => {
                  this.isSuccess = false;
                  console.log("4", res);
                  this.showInfo();
                  this.$router.push("/admin/music");
                });
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAudioFile: function(i) {
      this.audioFiles = this.$refs.audio.files;
      let fileURL = URL.createObjectURL(this.audioFiles[i]);
      getBlobDuration(fileURL).then(duration => {
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration - minutes * 60);
        this.length[i] = minutes + "min " + seconds + "s";
      });
    },
    handleThumbnailFile: function() {
      this.thumbnail = this.$refs.thumbnail.files[0];
    }
  },
  created() {
    this.currentYear = new Date().getFullYear();
    this.year = this.currentYear;
  }
};
</script>

<style scoped>
</style>