<template>
  <div>
    <form @submit.prevent="editVideo">
      <table class="table">
        <tbody>
          <tr>
            <th>Tytuł filmu</th>
            <td>
              <input type="text" v-model="video.title" />
            </td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>
              <input type="text" v-model="video.description" />
            </td>
          </tr>
          <tr>
            <th>Rok</th>
            <td>
              <input type="text" v-model="video.year" />
            </td>
          </tr>
          <tr>
            <th>Gatunek</th>
            <td>
              <input type="text" v-model="video.genre" />
            </td>
          </tr>
          <tr>
            <th>Wiek</th>
            <td>
              <select type="text" v-model="video.age_rate" :selected="video.age_rate">
                <option value="0">Familijny</option>
                <option value="1">do 16lat</option>
                <option value="2">powyżej 16lat</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Język</th>
            <td>
              <input type="text" v-model="video.language" />
            </td>
          </tr>
          <tr>
            <th>Reżyser/Reżyserzy</th>
            <td>
              <input type="text" v-model="this.directors" />
            </td>
          </tr>
          <tr>
            <th>Aktorzy</th>
            <td>
              <input type="text" v-model="this.actors" />
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
            <th>Plik wideo</th>
            <td>
              <input
                type="file"
                accept=".mp4, .x-m4v, video/*"
                @change="fileHandle()"
                id="video"
                ref="video"
              />
            </td>
          </tr>

          <tr>
            <th>Długość filmu [s]</th>
            <td>
              <input type="text" v-model="video.length" disabled />
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
import { mapGetters, mapActions } from "vuex";
import getBlobDuration from "get-blob-duration";

export default {
  name: "EditVideo",
  components: {},
  data() {
    return {
      video: {},
      directors: "",
      actors: "",
      tags: "",
      slug: this.$route.params.slug,
      result: []
    };
  },
  methods: {
    ...mapActions("video", ["showInfo", "clearInfo", "setInfo"]),
    validateAndUpdate: function() {
      //console.log(this.$refs.video.files[0] === undefined)
      //validate();
      //if(!validate) {}
      let metadata = {};
      metadata.actors = this.actors.split(",").map(obj => obj.trim());
      metadata.director = this.directors.split(",").map(obj => obj.trim());
      metadata.tags = this.tags.split(",").map(obj => obj.trim());
      //console.log(this.actors, this.director, this.tags)
      //console.log(metadata.actors, metadata.director, metadata.tags)
      metadata.title = this.video.title;
      metadata.description = this.video.description;
      metadata.year = this.video.year;
      metadata.genre = this.video.genre;
      metadata.language = this.video.language;
      metadata.age_rate = this.video.age_rate;
      metadata.length = this.video.length;
      // files
      let files = {};
      files.file = this.$refs.video.files[0];
      files.thumbnail = this.$refs.thumbnail.files[0];
      files.slug = this.video.title + "_" + this.video.year;
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
      console.log(meta.length);
      this.$store.dispatch("video/updateMetaData", meta).then(result => {
        //console.log("01", result)
        this.result.push(result[0]);
        this.setInfo("Dane pliku wideo: " + result[0]);
      });
      if (files.thumbnail != undefined) {
        this.$store.dispatch("video/uploadThumbnail", files).then(result => {
          //console.log("02", result)
          this.setInfo("Miniatura: " + result.data.response);
        });
      }
      if (files.file != undefined) {
        this.$store.dispatch("video/uploadVideo", files).then(result => {
          //console.log("02", result)
          this.setInfo("Plik wideo: " + result.data.response);
        });
      }
      this.showInfo();
      this.$router.push("/admin/video");
    },
    fileHandle: function() {
      let fileURL = URL.createObjectURL(this.$refs.video.files[0])
      getBlobDuration(fileURL).then(duration => {
        this.video.length = parseInt(duration)
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
  },
  computed: {
    ...mapGetters("video", ["editVideo"]),
    ...mapGetters("video", ["getVideo"]),
    ...mapGetters("video", ["videos"]),
    ...mapGetters("video", ["getVideoBySlug"])
  }
};
</script>

<style>
</style>