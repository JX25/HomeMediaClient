<template>
  <div>
    <h3>Dodawanie nowego utworu muzycznego</h3>
    <div id="errorbox" v-if="isError">{{this.error}}</div>
    <div id="successbox" v-if="isSuccess">{{this.success}}</div>
    <b-tabs content-class="col md-6 mt-12">
      <b-tab title="Dodaj pojedynczy utwór" active>
        <AddOneAudio />
      </b-tab>
      <b-tab title="Dodaj cały album">
        <AddManyAudio />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import getBlobDuration from "get-blob-duration"
import AddOneAudio from "./AddOneAudio"
import AddManyAudio from "./AddManyAudio"

export default {
  name: "AddMusic",
  components: {
    AddOneAudio,
    AddManyAudio
  },
  data() {
    return {
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
        this.length = minutes + "min " + seconds + "s";
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