<template>
  <form @submit.prevent="validateAndSendAlbum">
    <table class="table col-12 col-sm-12 col-sx-12 col-md-10 col-lg-10 col-xl-10">
      <tbody>
        <tr>
          <th>Nazwa albumu</th>
          <td>
            <b-form-input type="text" v-model="album"></b-form-input>
          </td>
        </tr>
        <tr>
          <th>Autor</th>
          <td>
            <b-form-input type="text" v-model="author"></b-form-input>
          </td>
        </tr>
        <tr>
          <th>Rok</th>
          <td>
            <b-form-input type="number" :max="currentYear" :min="1900" v-model="year"></b-form-input>
          </td>
        </tr>
        <tr>
          <th>Gatunek</th>
          <td>
            <b-form-input type="text" v-model="genre"></b-form-input>
          </td>
        </tr>
        <tr>
          <th>Wiek (PEGI)</th>
          <td>
            <b-form-select name="pegi" v-model="age_rate">
              <option value="0">Familijny</option>
              <option value="1">Wiek &#x3c;16</option>
              <option value="2">Wiek 16+</option>
            </b-form-select>
          </td>
        </tr>
        <tr>
          <th>Okładka</th>
          <td>
            <b-form-file
              accept=".jpeg, .jpg"
              ref="thumbnail"
              @change="handleThumbnailFile"
              placeholder="nowa miniatura..."
              drop-placeholder="Upuść plik tutaj..."
            ></b-form-file>
          </td>
        </tr>
        <tr>
          <th>Pliki</th>
          <td>
            <b-form-file
              accept="audio/*"
              ref="audios"
              @change="handleAudioFiles"
              placeholder="nowe audio..."
              drop-placeholder="Upuść plik tutaj..."
              multiple
            ></b-form-file>
          </td>
        </tr>
        <template v-if="filesDetails">
          <template
            v-for="(audio, index) in this.$refs.audios.$refs.input.files"
            class="fileDetails"
          >
            <tr class="fileDetailName" :key="audio.name">
              <th>Plik #{{index + 1}}</th>
              <td>{{audio.name}}</td>
            </tr>
            <tr :key="audio.title">
              <th>Tytuł</th>
              <td>
                <b-form-input type="text" v-model="title[index]" ></b-form-input>
              </td>
            </tr>
            <tr :key="audio.description">
              <th>Opis utworu</th>

              <td>
                <v-icon name="beer"></v-icon>
                <b-form-textarea name="description" cols="30" rows="1" v-model="description[index]"></b-form-textarea>
              </td>
            </tr>
            <tr :key="audio.length">
              <th>Długość</th>
              <td>
                <b-form-input type="text" disabled v-model="length[index]"></b-form-input>
              </td>
            </tr>
            <tr :key="audio.tags">
              <th>
                Słowa kluczowe
                <sub>a,b</sub>
              </th>
              <td>
                <b-form-input type="text" v-model="tags[index]"></b-form-input>
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
import getBlobDuration from "get-blob-duration";

export default {
  name: "AddManyAudio",
  data() {
    return {
      album: "",
      author: "",
      currentYear: "",
      genre: "",
      age_rate: 0,
      tmpURL: "",
      filesDetails: false,
      length: [],
      tags: [],
      title: [],
      description: [],
      year: "",
      audioFiles: ""
    };
  },
  methods: {
    ...mapActions("audio", ["clearInfo", "setInfo", "showInfo"]),
    validateAndSendAlbum: function() {
      console.log("ACS", this.audioFiles);
      for (let i = 0; i < this.audioFiles.length; ++i) {
        this.validateAndSend(i);
      }
      this.showInfo();
      this.$router.push("/admin/audio");
    },
    handleAudioFiles: function() {
      this.audioFiles = this.$refs.audios.$refs.input.files;
      for (let i = 0; i <= this.audioFiles.length - 1; ++i) {
        this.handleAudioFile(this.audioFiles[i], i);
      }
      this.filesDetails = true;
    },
    handleAudioFile: function(file, i) {
      console.log("P", file, i);
      let fileURL = URL.createObjectURL(file);
      getBlobDuration(fileURL).then(duration => {
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration - minutes * 60);
        console.log(minutes + "min " + seconds + "s");
        this.length[i] = minutes + "min " + seconds + "s";
      });
    },
    handleThumbnailFile: function() {
      this.thumbnail = this.$refs.thumbnail.$refs.input.files[0];
    },
    validateAndSend: function(i) {
      //validation TODO
      let tags = [];
      tags = this.tags[i].split(",").map(x => x.trim());
      let lengthInSeconds = this.length[i].split(" ");
      for (let index in lengthInSeconds) {
        lengthInSeconds[index] = lengthInSeconds[index].match(/\d+/)[0];
      }
      lengthInSeconds =
        Number(lengthInSeconds[0] * 60) + Number(lengthInSeconds[1]);
      console.log(lengthInSeconds);
      this.clearInfo();
      let data = {
        title: this.title[i],
        author: this.author,
        album: this.album,
        year: this.year,
        genre: this.genre,
        tags: tags,
        length: lengthInSeconds,
        age_rate: this.age_rate,
        language: this.language,
        description: this.description[i]
      };
      this.$store
        .dispatch("audio/uploadMetaData", data)
        .then(result => {
          console.log("1", result);
          this.setInfo("Dane pliku audio#" + i + ": " + result.msg);
          const slugThumbnail = result.thmb;
          const slug = result.slg;
          this.$store
            .dispatch("audio/uploadThumbnail", {
              slug: slugThumbnail,
              thumbnail: this.thumbnail
            })
            .then(result2 => {
              console.log("2", result2);
              this.setInfo(
                "Okładka pliku audio#" + i + ": " + result2.data.response
              );
              this.$store
                .dispatch("audio/uploadAudio", {
                  slug: slug,
                  file: this.audioFiles[i]
                })
                .then(finalResult => {
                  this.setInfo(
                    "Plik audio#" + i + ": " + finalResult.data.response
                  );
                  this.isSuccess = true;
                  this.success = "final";
                  console.log("3", finalResult);
                })
                .finally(res => {
                  this.isSuccess = false;
                  console.log("4", res);
                });
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>