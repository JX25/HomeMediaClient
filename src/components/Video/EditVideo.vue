<template>
  <div class="editVideo col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12">
    <div class="header">
      <h3 class>Edytuj dane filmu {{videoOld}}</h3>
    </div>
    <b-form @submit.prevent="editVideo">
      <table class="table table-hover">
        <tbody>
          <tr>
            <th>Tytuł filmu</th>
            <td>
              <b-form-input v-model="video.title"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>
              <b-form-textarea v-model="video.description" rows="3"></b-form-textarea>
            </td>
          </tr>
          <tr>
            <th>Rok</th>
            <td>
              <b-form-input v-model="video.year"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Gatunek</th>
            <td>
              <b-form-input v-model="video.genre"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Ograniczenie wiekowe</th>
            <td>
              <b-form-select v-model="video.age_rate" :selected="video.age_rate" :options="options"></b-form-select>
            </td>
          </tr>
          <tr>
            <th>Język</th>
            <td>
              <b-form-input v-model="video.language"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Reżyser / Reżyserzy</th>
            <td>
              <b-form-input v-model="directors"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Aktorzy</th>
            <td>
              <b-form-input v-model="actors"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Słowa kluczowe</th>
            <td>
              <b-form-input v-model="tags"></b-form-input>
            </td>
          </tr>
          <tr>
            <th>Miniatura</th>
            <td>
              <b-form-file
                accept=".jpeg, .jpg"
                ref="thumbnail"
                placeholder="nowa miniatura..."
                drop-placeholder="Upuść plik tutaj..."
              ></b-form-file>
            </td>
          </tr>
          <tr>
            <th>Plik wideo</th>
            <td>
              <b-form-file
                accept=".mp4, .x-m4v, video/*"
                @change="fileHandle()"
                ref="video"
                placeholder="nowy plik wideo..."
                drop-pl
                aceholder="Upuść plik tutaj..."
              ></b-form-file>
            </td>
          </tr>

          <tr>
            <th>Długość filmu [s]</th>
            <td>
              <b-form-input v-model="video.length" disabled></b-form-input>
            </td>
          </tr>
        </tbody>
      </table>
      <b-form-input @click="validateAndUpdate" class="btn btn-primary submit" value="Zakutalizuj" />
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import getBlobDuration from "get-blob-duration";

export default {
  name: "EditVideo",
  components: {},
  data() {
    return {
      videoOld: "",
      video: {
        title: ""
      },
      directors: "",
      actors: "",
      tags: "",
      slug: this.$route.params.slug,
      result: [],
      options: [
        { value: 0, text: "Familijny" },
        { value: 1, text: "Do lat 16" },
        { value: 2, text: "Powyżej lat 16" }
      ]
    };
  },
  methods: {
    ...mapActions("video", ["showInfo", "clearInfo", "setInfo"]),
    validateAndUpdate: function() {
      ////console.log(this.$refs.video.files[0] === undefined)
      //validate();
      //if(!validate) {}
      let metadata = {};
      //console.log("PRZED", this.actors, this.directors, this.tags);
      metadata.actors = this.actors.split(",").map(obj => obj.trim());
      metadata.director = this.directors.split(",").map(obj => obj.trim());
      metadata.tags = this.tags.split(",").map(obj => obj.trim());
      //console.log("PO", this.actors, this.directors, this.tags);
      ////console.log(metadata.actors, metadata.director, metadata.tags)
      metadata.title = this.video.title;
      metadata.description = this.video.description;
      metadata.year = this.video.year;
      metadata.genre = this.video.genre;
      metadata.language = this.video.language;
      metadata.age_rate = this.video.age_rate;
      metadata.length = this.video.length;
      //console.log("YYY", metadata);
      // files
      let files = {};
      try {
        files.file = this.$refs.video.$refs.input.files[0];
      } catch (error) {
        //console.log("The video has not been uploaded");
      }
      try {
        files.thumbnail = this.$refs.thumbnail.$refs.input.files[0];
      } catch (error) {
        //console.log("The thumbnail has not been uploaded");
      }

      files.slug = this.video.title + "_" + this.video.year;
      //console.log(files);
      this.updateVideo(metadata, files);
    },
    setVideo: async function() {
      this.video = this.editVideo;
    },
    loadArrays: function() {
      this.directors = this.video.director.join(", ");
      this.actors = this.video.actors.join(", ");
      this.tags = this.video.tags.join(", ");
    },
    updateVideo: function(meta, files) {
      meta.slug = meta.title + "_" + meta.year;
      meta.OLDslug = this.slug;
      this.clearInfo();
      //console.log(meta.length);
      this.$store.dispatch("video/updateMetaData", meta).then(result => {
        ////console.log("01", result)
        this.result.push(result[0]);
        this.setInfo("Dane pliku wideo: " + result[0]);
      });
      if (files.thumbnail != undefined) {
        this.$store.dispatch("video/uploadThumbnail", files).then(result => {
          ////console.log("02", result)
          this.setInfo("Miniatura: " + result.data.response);
        });
      }
      if (files.file != undefined) {
        this.$store.dispatch("video/uploadVideo", files).then(result => {
          ////console.log("02", result)
          this.setInfo("Plik wideo: " + result.data.response);
        });
      }
      this.showInfo();
      this.$router.push("/admin/video");
    },
    fileHandle: function() {
      //console.log(this.$refs.video.$refs.input.files[0]);
      let fileURL = URL.createObjectURL(this.$refs.video.$refs.input.files[0]);
      getBlobDuration(fileURL).then(duration => {
        this.video.length = parseInt(duration);
      });
    }
  },
  created() {
    this.setVideo().then(() => {
      let objLength = Object.entries(JSON.parse(JSON.stringify(this.video)))
        .length;
      if (objLength === 0) {
        if (this.videos.length === 0) {
          this.$store.dispatch("video/videoBySlug", this.slug).then(() => {
            this.video = this.getVideo;
            this.loadArrays();
          });
        } else {
          this.video = this.getVideoBySlug(this.slug);
        }
      }
      this.loadArrays();
    });
    this.videoOld = this.$route.params.slug;
  },
  computed: {
    ...mapGetters("video", ["editVideo"]),
    ...mapGetters("video", ["getVideo"]),
    ...mapGetters("video", ["videos"]),
    ...mapGetters("video", ["getVideoBySlug"])
  }
};
</script>

<style scoped>
.editVideo {
  padding: 0;
  margin: 0px;
  top: 1em;
  padding-bottom: 2em;
  width: 9% !important;
}

.header {
  position: realtive;
  width: 100vw!important;
  text-align: center;
}

.table {
  width: 100vw !important;
  position: relative;
  top: 1em;
}
th {
  left: 0px;
  width: 10px;
  font-size: 1em;
  text-align: left;
  width: 15vw;
  font-size: 15pt;
}
td {
  width: 85vw;
}


.submit {
  position: relative;
  left: 0.2em;
  top: 0.5em;
  width: 96vw !important;
}
</style>