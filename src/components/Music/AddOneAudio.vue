<template>
  <form @submit.prevent="validateAndSend(0)">
    <table class="table col-10">
      <tbody>
        <tr>
          <th>Tytuł</th>
          <td>
            <input type="text" v-model="title" />
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
            <input type="file" accept="audio/*" @change="handleAudioFile" ref="audio" />
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
            <select name="pegi" v-model="pegi">
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
            <input type="text" v-model="tags" />
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
</template>

<script>
import { mapActions } from "vuex";
import getBlobDuration from "get-blob-duration";

export default {
  name: "AddOneMusic",
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
      pegi: 0,
      tags: "",
      tmpURL: ""
    };
  },
  methods: {
    ...mapActions("music", ["clearInfo", "setInfo", "showInfo"]),
    validateAndSend: function() {
      //validation TODO
      this.tags = this.tags.split(",").map(x => x.trim());
      let lengthInSeconds = this.length.split(" ");
      for (let index in lengthInSeconds) {
        lengthInSeconds[index] = lengthInSeconds[index].match(/\d+/)[0];
      }
      lengthInSeconds =
        Number(lengthInSeconds[0] * 60) + Number(lengthInSeconds[1]);
      console.log(lengthInSeconds);
      this.clearInfo();
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
        .dispatch("music/uploadMetaData", data)
        .then(result => {
          console.log("1", result);
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
              this.setInfo("Okładka utworu: " + result2.data.response);
              this.$store
                .dispatch("music/uploadMusic", {
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
                  this.$router.push("/admin/music");
                });
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAudioFile: function() {
      this.audioFile = this.$refs.audio.files[0];
      let fileURL = URL.createObjectURL(this.audioFile);
      getBlobDuration(fileURL).then(duration => {
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration - minutes * 60);
        this.length = minutes + "min " + seconds + "s";
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

<style>
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