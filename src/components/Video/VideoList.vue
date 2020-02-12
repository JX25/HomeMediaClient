<template>
  <div id="videos">
    <center>
      <h2>Lista filmów</h2>
    </center>
    <div>
      <center>
        <div class="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                block
                href="#"
                v-b-toggle.accordion-1
                variant="dark info"
                class="filterButton"
              ><i class="far fa-caret-square-down fa-2x"></i><span>Wyszukiwarka</span></b-button>
            </b-card-header>
            <b-collapse
              id="accordion-1"
              hide
              accordion="accordion-body collapse"
              role="tabpanel"
            >
              <b-card-body>
                <b-form
                  class="form-inline col-md-12 col-lg-12 col-xl-12 table-responsive"
                  @submit.prevent="filterVideos()"
                >
                  <input
                    type="text"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    placeholder="Nazwa filmu"
                    v-model="params.title"
                  />
                  <input
                    type="text"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    placeholder="Słowa kluczowe"
                    v-model="params.keyword"
                  />
                  <input
                    type="text"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="genre"
                    placeholder="Gatunek"
                    v-model="params.genre"
                  />
                  <input
                    type="number"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="lengthMin"
                    placeholder="Długość od min"
                    v-model="params.lengthMin"
                  />
                  <input
                    type="number"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="lengthMax"
                    placeholder="Długość do min"
                    v-model="params.lengthMax"
                  />
                  <input
                    type="number"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="yearMin"
                    placeholder="Od roku"
                    v-model="params.yearMin"
                  />
                  <input
                    type="number"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="yearMax"
                    placeholder="Do roku"
                    v-model="params.yearMax"
                  />
                  <b-button
                    class="btn btn-info form-control mb-2 mr-sm-2 col-12 col-sm-12 col-sx-12 col-md-2"
                    type="submit"
                  >Wyszukaj</b-button>
                  <b-button
                    class="btn btn-info form-control mb-2 mr-sm-2 col-12 col-sm-12 col-sx-12 col-md-2"
                    @click="reset()"
                    type="reset"
                  >RESET</b-button>
                  <b-button
                    class="btn btn-secondary form-control mb-2 mr-sm-2 col-12 col-sm-12 col-sx-12 col-md-2"
                    @click="reload()"
                    type="button"
                  >Przeładuj</b-button>
                </b-form>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </center>
      <table class="table table-striped col-md-12 col-lg-12 col-xl-12 content" v-if="listLoaded">
        <thead class="thead-light">
          <tr>
            <th scope="col col-sm-2">#</th>
            <th scope="col col-sm-2">Nazwa filmu</th>
            <th scope="col col-sm-2">Rok</th>
            <th scope="col col-sm-2">Język</th>
            <th scope="col col-sm-2">Gatunek</th>
            <th scope="col col-sm-2">Długość (min)</th>
            <th scope="col" colspan="2"></th>
            <th scope="col" colspan="2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="video in videoList.slice(0, videoLimit)" :key="video.id">
            <td>
              <img :src="image(video.slug)" width="32" height="32" alt="brak" />
            </td>
            <td>{{video.title.toUpperCase()}}</td>
            <td>{{video.year}}</td>
            <td>{{video.language}}</td>
            <td>{{video.genre.toUpperCase()}}</td>
            <td>{{Math.round(video.length/60,0)}}:{{(video.length%60)>=10 ? video.length%60 : "0"+video.length%60}}</td>
            <td>
              <button type="button" class="btn btn-success" @click="runPlayer(video.slug)">Oglądaj</button>
            </td>
            <td>
              <b-button v-b-modal.VideoDetail @click="videoInfo(video)">Podgląd</b-button>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click="editVideo(video)">Edycja</button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteVideo(video.slug, video.title)"
              >Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!--<VideoPlayer class="video-player" />-->
      <VideoDetail :video="this.targetVideo" />
      <VideoInfo v-if="infoVisibility" />
    </div>
    <b-button @click="loadMore" v-if="videoLimit < videoList.length">Więcej</b-button>
    <router-link to="video/add">
      <i id="addVideo" class="fas fa-plus fa-3x"></i>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VideoDetail from "./Video";
import VideoInfo from "./VideoInfo";
import { filterVideoList } from "../../plugins/filterList";
import { address } from "../../store/api";

export default {
  name: "VideoList",
  components: {
    VideoDetail,
    VideoInfo
  },
  data() {
    return {
      videoLimit: 25,
      videoList: [],
      listLoaded: false,
      targetVideo: {},
      params: {
        title: "",
        keyword: "",
        genre: "",
        lengthMin: "",
        lengthMax: "",
        yearMin: "",
        yearMax: ""
      }
    };
  },
  methods: {
    ...mapActions("video", ["allVideos", "videoToEdit"]),
    ...mapActions("videoPlayer", ["showVideoPlayer", "hideVideoPlayer"]),
    deleteVideo: function(videoSlug, videoTitle) {
      if (confirm("Czy na pewno chcesz usunąć film " + videoTitle + "?")) {
        this.$store
          .dispatch("video/deleteVideo", videoSlug)
          .then(result => {
            this.videoList = this.videoList.filter(x => x.slug != videoSlug);
            console.log(videoSlug, this.videoList, result);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    reset: function() {
      this.params = {
        title: "",
        keyword: "",
        genre: "",
        lengthMin: "",
        lengthMax: "",
        yearMin: "",
        yearMax: ""
      };
      this.filterVideos();
    },
    reload: function() {
      this.$router.go();
    },
    filterVideos: function() {
      //WALIDACJA
      let filteredVideos = filterVideoList(this.videos, this.params);
      this.videoList = filteredVideos;
      this.videoLimit = 25;
    },
    videoInfo: function(video) {
      this.targetVideo = video;
      this.$bvModal.show("VideoDetail");
    },
    loadMore: function() {
      let length = this.videoList.length;
      if (this.videoLimit >= length) this.videoLimit = length;
      else this.videoLimit += 25;
    },
    image: function(slug) {
      console.log(address);
      return address + "/api/v1/video/stream-thumbnail/" + slug;
    },
    srcStream: function(slug) {
      console.log("XD", address);
      return address + "/api/v1/video/stream/" + slug;
    },
    editVideo: function(video) {
      this.videoToEdit(video);
      this.$router.push("/admin/video/edit/" + video.slug);
    },
    runPlayer: function(slug) {
      let src = this.srcStream(slug);
      if (this.getShow == true) {
        this.hideVideoPlayer();
      }
      this.showVideoPlayer(src);
    }
  },
  created() {
    this.allVideos().then(result => {
      console.log("load", result.data.response);
      this.videoList = result.data.response;
      this.listLoaded = true;
    });
  },
  computed: {
    ...mapGetters("video", ["videos", "infoVisibility"]),
    ...mapGetters("videoPlayer", ["getSrc", "getShow"])
  }
};
</script>

<style scoped>
#videos{
  width: 100%!important;
  position:realtive;
}

center {
  margin-top: 2em;
}
.table {
  margin-top: 25px;
  position: relative;
  width: 100%!important;
}
form {
  width: 100%;
  margin: auto;
  text-align:center;
  position: relative;
}

.table td {
  vertical-align: middle;
}

.table tr {
  border: none;
  width: 100%;
  height: fit-content;
}

#addVideo {
  position: fixed;
  bottom: 15px;
  right: 15px;

  color: rgba(24, 150, 41, 0.979);
}

#addVideo:hover {
  color: rgba(37, 228, 63, 0.979);
  transition: 0.5s ease-out;
}

img:hover {
  transform: scale(5);
  transform-origin: center;
  transition: 0.3s ease-in;
  border-radius: 10px;
}
@media (max-width: 768px){
  form{
    width: 80%;
  }
  table{
    position: relative;
    width: 100%!important;
  }
}

@media (max-width: 360px){
  table{
    left: -1.0em;
    width: 100%!important
  }
  td{
    position: relative;
  }
}


@media (max-width: 1350px) {
  tr {
    display: grid;
    grid-template-columns: 5fr 5fr;
  }
}
@media (max-width: 1091px) {
  tr {
    display: grid;
    grid-template-columns: 3fr 3fr;
  }
}

tr {
  text-align: center;
  border: rgba(200, 200, 200, 1) 2px solid;
}

button {
  width: 150px;
}

button:hover {
  filter: brightness(90%);
}

.actions {
  width: 250px;
}

.filterButton {
  width: fit-content;
}

.filterButton span{
  position: relative;
  left: 5px;
  top: -5px;
}


.mb-1 {
  border: none;
  box-shadow: none;
  -webkit-box-shadow: none;
}

.mb-1 header {
  background-color: rgba(255, 255, 255);
  border: 0px;
  text-shadow: none;
  text-align: left;
}
</style>