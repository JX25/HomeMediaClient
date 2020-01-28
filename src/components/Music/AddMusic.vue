<template>
  <div>
    <h3>Dodawanie nowego utworu muzycznego</h3>
    <div id="errorbox" v-if="isError">{{this.error}}</div>
    <div id="successbox" v-if="isSuccess">{{this.success}}</div>
    <b-tabs content-class="col md-6 mt-12">
      <b-tab title="Dodaj pojedynczy utwór" active>
        <form @submit.prevent="validateAndSend(0)">
          <table class="table col-10">
            <tbody>
              <tr>
                <th>Tytuł</th>
                <td>
                  <input type="text" v-model="titleOne" />
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
                <th>Okładka</th>
                <td>
                  <input
                    type="file"
                    accept="image/jpeg image/png"
                    @change="handleThumbnailFile"
                    ref="thumbnail"
                  />
                </td>
              </tr>
              <tr>
                <th>Plik</th>
                <td>
                  <input type="file" accept="audio/*" @change="handleAudio(0)" ref="audio" />
                </td>
              </tr>
              <tr>
                <th>Długość</th>
                <td>
                  <input type="text" disabled v-model="lengthOne" />
                </td>
              </tr>
              <tr>
                <th>Wiek (PEGI)</th>
                <td>
                  <select name="pegi" id="pg" v-model="pegi">
                    <option value="0" >Familijny</option>
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
        <form @submit.prevent="validateAndSendAlbum()">
          <table class="table">
            <tbody>
              <tr>
                <th>Nazwa albumu</th>
                <td>
                  <input type="text" v-model="album" />
                </td>
              </tr>
              <tr>
                <th>Autor</th>
                <td>
                  <input type="text" v-model="author" />
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
                <th>Wiek (PEGI)</th>
                <td>
                  <select name="pegi" v-model="pegi">
                    <option value="0">Familijny</option>
                    <option value="1">Wiek &#x3c;16</option>
                    <option value="2">Wiek 16+</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>Okładka</th>
                <td>
                  <input
                    type="file"
                    accept="image/jpeg image/png"
                    @change="handleThumbnailFile"
                    ref="thumbnail"
                  />
                </td>
              </tr>
              <tr>
                <th>Pliki</th>
                <td>
                  <input
                    type="file"
                    accept="audio/*"
                    @change="handleAudio(1)"
                    ref="audios"
                    multiple
                  />
                </td>
              </tr>
              <template v-if="filesDetails">
                <div
                  v-for="(audio, index) in this.$refs.audios.files"
                  class="fileDetails"
                  :key="index"
                >
                  <tr class="fileDetailName">
                    <th>Plik #{{index + 1}}</th>
                    <td>{{audio.name}}</td>
                  </tr>
                  <tr>
                    <th>Tytuł</th>
                    <td>
                      <input type="text" v-model="title[index]" />
                    </td>
                  </tr>
                  <tr>
                    <th>Opis utworu</th>

                    <td>
                      <v-icon name="beer"></v-icon>
                      <textarea
                        name="description"
                        id
                        cols="30"
                        rows="1"
                        v-model="description[index]"
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <th>Długość</th>
                    <td>
                      <input type="text" disabled v-model="length[index]" />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Słowa kluczowe
                      <sub>a,b</sub>
                    </th>
                    <td>
                      <input type="text" v-model="tags[index]" />
                    </td>
                  </tr>
                </div>
              </template>
            </tbody>
          </table>
          <b-button variant="primary" type="submit">Dodaj album</b-button>
        </form>
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
      titleOne: "",
      lengthOne: "",
      description: [],
      author: "",
      album: "",
      year: 0,
      language: "",
      currentYear: "",
      genre: "",
      thumbnail: "",
      length: [],
      pegi: 0,
      tags: [],
      tmpURL: "",
      isError: false,
      isSuccess: false,
      error: "",
      success: "",
      filesDetails: false
    };
  },
  methods: {
    ...mapActions("music", ["clearInfo", "setInfo", "showInfo"]),
    validateAndSendAlbum: function() {
      let i = 0;
      for (i in this.$refs.audio.files.length) {
        this.validateAndSend(i);
      }
    },
    validateAndSend: function(i) {
      //validation TODO
      this.tags = this.tags[i].split(",").map(x => x.trim());
      let lengthInSeconds = this.length[i].split(" ");
      for (let index in lengthInSeconds) {
        lengthInSeconds[index] = lengthInSeconds[index].match(/\d+/)[0];
      }
      lengthInSeconds =
        Number(lengthInSeconds[0] * 60) + Number(lengthInSeconds[1]);
      this.clearInfo();
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
        description: this.description[i]
      };
      this.$store
        .dispatch("music/uploadMetaData", data)
        .then(result => {
          console.log(result);
          this.setInfo("Dane pliku: " + result.msg);
          const slugThumbnail = result.thmb;
          const slug = result.slg;
          this.$store
            .dispatch("music/uploadThumbnail", {
              slug: slugThumbnail,
              thumbnail: this.thumbnail
            })
            .then(result2 => {
              console.log("2", result2);
              this.setInfo("Okładka audio: " + result2.data.response);
              this.$store
                .dispatch("music/uploadMusic", {
                  slug: slug,
                  file: this.audioFiles[i]
                })
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
    handleAudioFile: function(file, i) {
      console.log("P", file, i);
      let fileURL = URL.createObjectURL(file);
      getBlobDuration(fileURL).then(duration => {
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration - minutes * 60);
        this.lengthOne = minutes + "min " + seconds + "s";
      });
    },
    handleAudioFiles: function(audioFiles) {
      for (let i = 0; i <= audioFiles.length - 1; ++i) {
        this.handleAudioFile(audioFiles[i], i);
      }
      this.filesDetails = true;
    },
    handleAudio: function(type) {
      if (type === 0) {
        let audioFile = this.$refs.audio.files[0];
        this.handleAudioFile(audioFile, 0);
      } else {
        let audioFiles = this.$refs.audios.files;
        this.handleAudioFiles(audioFiles);
      }
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
.fileDetails {
  transition: 0.3s ease-in;
  position: flex;
}
.fileDetailName {
  border-top: 2px solid #9999;
  background: rgba(55, 55, 130, 0.1);
}
.table {
  margin: auto;
  width: 80% !important;
}
</style>