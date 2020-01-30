<template>
  <div>
    <h3>Dodanie nowego filmu do bazy</h3>
    <div id="errorbox" v-if="isError">{{this.error}}</div>
    <div id="successbox" v-if="isSuccess">{{this.success}}</div>
    <form @submit.prevent="validateAndSend">
      <table class="table">
        <tbody>
          <tr>
            <th>Tytuł</th>
            <td>
              <input type="text" v-model="title" />
            </td>
          </tr>
          <tr>
            <th>Opis filmu</th>
            <td>
              <v-icon name="beer"></v-icon>
              <textarea name="description" id cols="30" rows="1" v-model="description"></textarea>
            </td>
          </tr>
          <tr>
            <th>Rok produkcji</th>
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
                accept=".mp4, .x-m4v, video/*"
                @change="handleVideoFile"
                id="file"
                ref="file"
              />
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
            <th>Długość</th>
            <td>
              <input type="text" disabled v-model="length" />
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
              Reżyser/Reżyserzy
              <sub>a,b</sub>
            </th>
            <td>
              <input type="text" v-model="directors" />
            </td>
          </tr>
          <tr>
            <th>
              Aktorzy
              <sub>a,b</sub>
            </th>
            <td>
              <input type="text" v-model="actors" />
            </td>
          </tr>
          <tr>
            <th>
              Słowa kluczowe
              <sub>a,b</sub>
            </th>
            <td>
              <input type="text" v-model="tags" />
            </td>
          </tr>
        </tbody>
      </table>
      <b-button variant="primary" type="submit">Dodaj film</b-button>
    </form>
  </div>
</template>

<script>
import getBlobDuration from "get-blob-duration";
import { mapActions } from "vuex";

export default {
  name: "AddVideo",
  data() {
    return {
      currentYear: "",
      title: "",
      description: "",
      year: 0,
      genre: "",
      thumbnail: "",
      file: "",
      pegi: "",
      length: "",
      language: "",
      directors: "",
      actors: "",
      tags: "",
      tmpURL: "",
      isError: false,
      isSuccess: false,
      error: "",
      success: ""
    };
  },
  methods: {
    ...mapActions("video", ["clearInfo", "setInfo", "showInfo"]),
    validateAndSend: function() {
      //validation
      this.actors = this.actors.split(",").map(x => x.trim());
      this.directors = this.directors.split(",").map(x => x.trim());
      this.tags = this.tags.split(",").map(x => x.trim());
      let lengthInSeconds = this.length.split(" ");
      for (let index in lengthInSeconds) {
        lengthInSeconds[index] = lengthInSeconds[index].match(/\d+/)[0];
      }
      lengthInSeconds =
        Number(lengthInSeconds[0] * 60) + Number(lengthInSeconds[1]);
      this.clearInfo();
      let data = {
        title: this.title,
        description: this.description,
        year: this.year,
        genre: this.genre,
        tags: this.tags,
        language: this.language,
        length: lengthInSeconds,
        age_rate: this.pegi,
        director: this.directors,
        actors: this.actors
      };
      this.$store
        .dispatch("video/uploadMetaData", data)
        .then(result => {
          console.log(result);
          this.setInfo("Dane pliku: " + result.msg);
          const slug = result.slg;
          this.$store
            .dispatch("video/uploadThumbnail", {
              slug: slug,
              thumbnail: this.thumbnail
            })
            .then(result2 => {
              console.log("2", result2);
              this.setInfo("Miniatura wideo: " + result2.data.response);
              this.$store
                .dispatch("video/uploadVideo", { slug: slug, file: this.file })
                .then(finalResult => {
                  this.setInfo("Plik wideo: " + finalResult.data.response);
                  this.isSuccess = true;
                  this.success = "final";
                  console.log("3", finalResult);
                })
                .finally(res => {
                  this.isSuccess = false;
                  console.log("4", res);
                  this.showInfo();
                  this.$router.push("/admin/video");
                });
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleVideoFile: function() {
      this.file = this.$refs.file.files[0];
      let fileURL = URL.createObjectURL(this.file);
      getBlobDuration(fileURL).then(duration => {
        console.log(duration);
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration - minutes * 60);
        this.length = minutes + "min " + seconds + "s";
      });
    },
    handleThumbnailFile: function() {
      this.thumbnail = this.$refs.thumbnail.files[0];
    },
    loaded: function() {
      console.log("XD");
      console.log(this.tmpURL);
    }
  },
  created() {
    this.currentYear = new Date().getFullYear();
    this.year = this.currentYear;
  }
};
</script>

<style>
</style>