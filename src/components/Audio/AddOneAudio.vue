<template>
  <form @submit.prevent="validateAndSend(0)">
    <table class="table col-12 col-sm-12 col-sx-12 col-md-10 col-lg-10 col-xl-10">
      <tbody>
        <tr>
          <th>Tytuł</th>
          <td>
            <b-form-input type="text" v-model="title"></b-form-input>
          </td>
        </tr>
        <tr>
          <th>Autor</th>
          <td>
            <b-form-input type="text" v-model="author"></b-form-input>
          </td>
        </tr>
        <tr>
          <th>Album</th>
          <td>
            <b-form-input type="text" v-model="album"></b-form-input>
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
          <th>Plik</th>
          <td>
            <b-form-file
              accept="audio/*"
              ref="audio"
              @change="handleAudioFile"
              placeholder="nowe audio..."
              drop-placeholder="Upuść plik tutaj..."
            ></b-form-file>
          </td>
        </tr>
        <tr>
          <th>Długość</th>
          <td>
            <b-form-input type="text" disabled v-model="length"></b-form-input>
          </td>
        </tr>
        <tr>
          <th>Ograniczenia wiekowe</th>
          <td>
            <b-form-select v-model="age_rate">
              <option value="0">Familijny</option>
              <option value="1">Wiek &#x3c;16</option>
              <option value="2">Wiek 16+</option>
            </b-form-select>
          </td>
        </tr>

        <tr>
          <th>Język</th>
          <td>
            <b-form-input type="text" v-model="language"></b-form-input>
          </td>
        </tr>
        <tr>
          <th>
            Słowa kluczowe
            <sub>a,b</sub>
          </th>
          <td>
            <b-form-input type="text" v-model="tags"></b-form-input>
          </td>
        </tr>
        <tr>
          <th>Opis utworu</th>
          <td>
            <v-icon name="beer"></v-icon>
            <b-form-textarea name="description" id cols="30" rows="1" v-model="description"></b-form-textarea>
          </td>
        </tr>
      </tbody>
    </table>
    <b-button variant="primary" type="submit">Dodaj utwór</b-button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import getBlobDuration from "get-blob-duration";

export default {
  name: "AddOneAudio",
  data() {
    return {
      title: "",
      description: "",
      author: "",
      album: "",
      year: 0,
      language: "",
      currentYear: "",
      genre: "",
      thumbnail: "",
      audioFile: "",
      length: "",
      age_rate: 0,
      tags: "",
      tmpURL: ""
    };
  },
  methods: {
    ...mapActions("audio", ["clearInfo", "setInfo", "showInfo"]),
    validateAndSend: function() {
      this.tags = this.tags.split(",").map(x => x.trim());
      let lengthInSeconds = this.length.split(" ");
      for (let index in lengthInSeconds) {
        lengthInSeconds[index] = lengthInSeconds[index].match(/\d+/)[0];
      }
      lengthInSeconds =
        Number(lengthInSeconds[0] * 60) + Number(lengthInSeconds[1]);
      console.log(lengthInSeconds);
      this.clearInfo();
      console.log("agerate", this.age_rate);
      let data = {
        title: this.title,
        author: this.author,
        album: this.album,
        year: this.year,
        genre: this.genre,
        tags: this.tags,
        length: lengthInSeconds,
        age_rate: this.age_rate,
        language: this.language,
        description: this.description
      };
      this.$store
        .dispatch("audio/uploadMetaData", data)
        .then(result => {
          console.log("1", result);
          this.setInfo("Dane pliku: " + result.msg);
          const slugThumbnail = result.thmb;
          const slug = result.slg;
          this.$store
            .dispatch("audio/uploadThumbnail", {
              slug: slugThumbnail,
              thumbnail: this.thumbnail
            })
            .then(result2 => {
              console.log("2", result2);
              this.setInfo("Okładka utworu: " + result2.data.response);
              this.$store
                .dispatch("audio/uploadAudio", {
                  slug: slug,
                  file: this.audioFile
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
                  this.$router.push("/admin/audio");
                });
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAudioFile: function() {
      this.audioFile = this.$refs.audio.$refs.input.files[0];
      let fileURL = URL.createObjectURL(this.audioFile);
      getBlobDuration(fileURL).then(duration => {
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration - minutes * 60);
        this.length = minutes + "min " + seconds + "s";
      });
    },
    handleThumbnailFile: function() {
      this.thumbnail = this.$refs.thumbnail.$refs.input.files[0];
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
  left: 1em;
  right: 1em;
  width: 95vw !important;
}

.btn {
  position: relative;
  width: 98vw !important;
  margin: auto;
  bottom: 1em;
}

@media (max-width: 768px) {
  form {
    width: 100% !important;
    position: absolute;
    left: 0px;
  }
  .table {
    width: 92vw !important;
  }
  th {
    position: relative;
    left: 0px;
    font-size: 1em;
    text-align: left;
    width: 15vw;
    font-size: 15pt;
  }
  td {
    width: 85vw;
  }
}
</style>