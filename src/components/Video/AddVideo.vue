<template>
  <div class="addVideo">
    <h3>Dodanie nowego filmu do bazy</h3>
    <div id="status-box" v-if="isStatus">{{this.status}}
<div class="lds-ring"><div></div><div></div><div></div><div></div></div>      
    </div>
    <div class="add-form">
    <form @submit.prevent="validateAndSend">
      <table class="table">
        <tbody>
          <tr>
            <th>Tytuł</th>
            <td>
              <b-form-input type="text" v-model="title" ></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Opis filmu</th>
            <td>
              <b-form-textarea name="description" id cols="30" rows="1" v-model="description"></b-form-textarea>
            </td>
          </tr>
          <tr>
            <th>Rok produkcji</th>
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
            <th>Miniatura</th>
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
                accept=".mp4, .x-m4v, video/*"
                @change="handleVideoFile()"
                ref="video"
                placeholder="nowy plik wideo..."
                drop-pl
                aceholder="Upuść plik tutaj..."
              ></b-form-file>
            </td>
          </tr>
          <tr>
            <th>Ogranicznenie wiekowe</th>
            <td>
              <b-form-select name="pegi" v-model="age_rate">
                <option value="0">Familijny</option>
                <option value="1">Do 16 lat</option>
                <option value="2">Powyżej 16 lat</option>
              </b-form-select>
            </td>
          </tr>
          <tr>
            <th>Długość</th>
            <td>
              <b-form-input type="text" disabled v-model="length" ></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Język</th>
            <td>
              <b-form-input type="text" v-model="language" ></b-form-input>
            </td>
          </tr>
          <tr>
            <th>
              Reżyser/Reżyserzy
              <sub>a,b</sub>
            </th>
            <td>
              <b-form-input type="text" v-model="directors" ></b-form-input>
            </td>
          </tr>
          <tr>
            <th>
              Aktorzy
              <sub>a,b</sub>
            </th>
            <td>
              <b-form-input type="text" v-model="actors"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>
              Słowa kluczowe
              <sub>a,b</sub>
            </th>
            <td>
              <b-form-input type="text" v-model="tags" ></b-form-input>
            </td>
          </tr>
        </tbody>
      </table>
      <b-button variant="primary" type="submit">Dodaj film</b-button>
    </form>
    </div>
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
      age_rate: 0,
      length: "",
      language: "",
      directors: "",
      actors: "",
      tags: "",
      tmpURL: "",
      isStatus: false,
      status: "",

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
        age_rate: this.age_rate,
        director: this.directors,
        actors: this.actors
      };
      this.$store
        .dispatch("video/uploadMetaData", data)
        .then(result => {
          //console.log(result);
          this.setInfo("Dane pliku: " + result.msg);
          const slug = result.slg;
          this.$store
            .dispatch("video/uploadThumbnail", {
              slug: slug,
              thumbnail: this.thumbnail
            })
            .then(result2 => {
              //console.log("2", result2);
              this.setInfo("Miniatura wideo: " + result2.data.response);
              this.$store
                .dispatch("video/uploadVideo", { slug: slug, file: this.file })
                .then(finalResult => {
                  this.setInfo("Plik wideo: " + finalResult.data.response);
                  this.isStatus = true;
                  this.success = "Przesyłanie pliku wideo i danych proszę czekać...";
                  //console.log("3", finalResult);
                })
                .finally(() => {
                  this.showInfo();
                  this.$router.push("/admin/video");
                });
            });
        })
        .catch(() => {
          //console.log(error);
        });
    },
    handleVideoFile: function() {
      this.file = this.$refs.video.$refs.input.files[0];
      let fileURL = URL.createObjectURL(this.file);
      getBlobDuration(fileURL).then(duration => {
        //console.log(duration);
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration - minutes * 60);
        this.length = minutes + "min " + seconds + "s";
      });
    },
    handleThumbnailFile: function() {
      this.thumbnail = this.$refs.thumbnail.$refs.input.files[0];
    },
    loaded: function() {
      //console.log("XD");
      //console.log(this.tmpURL);
    }
  },
  created() {
    this.currentYear = new Date().getFullYear();
    this.year = this.currentYear;
  }
};
</script>

<style scoped>
#addVideo{
  position: relative;
  top: 1em;
  width: 100%!important;
  padding-bottom: 100px;
}
h3{
  text-align: center;
  padding: 0.5em;
}

table{
  width: 100%!important;
}

th{
  width: 15%;
}

td{
  width: 85%;
}

.btn{
  position:relative;
  width:100vw!important;
  margin: auto;
  bottom: 1em;
}

@media (max-width:768px){
  h3{
    padding-top: 0;
  }
  .btn{
    bottom: 0em;
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>