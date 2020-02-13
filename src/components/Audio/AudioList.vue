<template>
  <div id="audios">
    <center>
      <h2>Lista utworów</h2>
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
              >
                <i class="far fa-caret-square-down fa-2x"></i>
                <span>Wyszukiwarka</span>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-1" hide accordion="accordion-body collapse" role="tabpanel">
              <b-card-body>
                <b-form
                  class="form-inline col-md-12 col-lg-12 col-xl-12 table-responsive"
                  @submit.prevent="filterAudio()"
                >
                  <input
                    type="text"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="title"
                    placeholder="Nazwa filmu..."
                    v-model="params.title"
                  />
                  <input
                    type="text"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="author"
                    placeholder="Autor..."
                    v-model="params.author"
                  />
                  <input
                    type="text"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="album"
                    placeholder="Album..."
                    v-model="params.album"
                  />
                  <input
                    type="text"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="keyword"
                    placeholder="Słowa kluczowe..."
                    v-model="params.tags"
                  />
                  <input
                    type="text"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="genre"
                    placeholder="Gatunek..."
                    v-model="params.genre"
                  />
                  <input
                    type="number"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="lengthMin"
                    placeholder="Długość od min..."
                    v-model="params.lengthMin"
                  />
                  <input
                    type="number"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="lengthMax"
                    placeholder="Długość do min..."
                    v-model="params.lengthMax"
                  />
                  <input
                    type="number"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="yearMin"
                    placeholder="Od roku..."
                    v-model="params.yearMin"
                  />
                  <input
                    type="number"
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    id="yearMax"
                    placeholder="Do roku..."
                    v-model="params.yearMax"
                  />
                  <b-button
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    type="button"
                    @click="filterAudio()"
                  >Wyszukaj</b-button>
                  <b-button
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    type="button"
                    @click="clear()"
                  >Resetuj</b-button>
                  <b-button
                    class="form-control mb-3 mr-sm-3 col-12 col-sm-12 col-sx-12 col-md-2"
                    type="button"
                    @click="reload()"
                  >Przeładuj</b-button>
                </b-form>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </center>
      <table class="table table-hover table-striped col-md-12 content" v-if="listLoaded">
        <thead class="thead-light">
          <tr>
            <th scope="col-1 col-sm-2">#</th>
            <th scope="col-1 col-sm-2">Nazwa utworu</th>
            <th scope="col-1 col-sm-2">Album</th>
            <th scope="col-1 col-sm-2">Gatunek</th>
            <th scope="col-1 col-sm-2">Autor</th>
            <th scope="col-1 col-sm-2">Rok</th>

            <th scope="col-1 col-sm-2">Długość (min:s)</th>
            <th scope="col-12" colspan="3"></th>
            <th scope="col-12" colspan="2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(audio, index) in audioList.slice(0, audioLimit)" :key="index">
            <td>
              <img :src="image(audio.thumbnail)" width="32" height="32" alt="brak" />
            </td>
            <td title="Tytuł utworu">{{audio.title.toUpperCase()}}</td>
            <td title="Album utworu">{{audio.album}}</td>
            <td title="Gatunek muzyczny">{{audio.genre}}</td>
            <td title="Zespół/Autor">{{audio.author}}</td>
            <td title="Rok wydania">{{audio.year}}</td>

            <td
              title="Czas (min)"
            >{{Math.round(audio.length/60,0)}}:{{(audio.length%60)>=10 ? audio.length%60 : "0"+audio.length%60}}</td>
            <td>
              <button
                type="button"
                class="btn btn-success"
                @click="runPlayer(audio.slug, audio.thumbnail, index)"
              >Odtwórz</button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-warning"
                @click="toPlaylist(audio, index)"
              >+ playlista</button>
            </td>
            <td>
              <b-button v-b-modal.AudioDetail @click="audioInfo(audio)">Podgląd</b-button>
            </td>
            <td>
              <button
                v-if="type"
                type="button"
                class="btn btn-primary"
                @click="editAudio(audio)"
              >Edycja</button>
            </td>
            <td>
              <button
                v-if="type"
                type="button"
                class="btn btn-danger"
                @click="deleteAudio(audio.slug, audio.title)"
              >Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>

      <AudioDetail :audio="this.audio" />
      <AudioInfo v-if="infoVisibility" />
    </div>
    <b-button @click="loadMore" v-if="audioLimit < audioList.length">Więcej</b-button>

    <router-link to="/admin/audio/add">
      <i id="addAudio" class="fas fa-plus fa-3x"></i>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AudioDetail from "./Audio";
import AudioInfo from "./AudioInfo";
import { filterAudioList } from "../../plugins/filterList";
import { address } from "../../store/api";

export default {
  name: "AudioList",
  components: {
    AudioDetail,
    AudioInfo
  },
  data() {
    return {
      audioLimit: 25,
      audioList: [],
      listLoaded: false,
      targetAudio: {},
      params: {
        title: "",
        keyword: "",
        author: "",
        album: "",
        genre: "",
        lengthMin: "",
        lengthMax: "",
        yearMin: "",
        yearMax: ""
      }
    };
  },
  methods: {
    ...mapActions("audio", ["getAllAudio", "audioToEdit", "audioDetail"]),
    ...mapActions("audioPlayer", [
      "showAudioPlayer",
      "hideAudioPlayer",
      "changeSource",
      "changeIndex",
      "changeCoverSource",
      "startAudio",
      "addToPlaylist",
      "changePlaylistIndex"
    ]),
    filterAudio: function() {
      let filteredAudio = filterAudioList(this.audios, this.params);
      this.audioList = filteredAudio;
    },
    clear: function() {
      this.params = {
        title: "",
        keyword: "",
        author: "",
        album: "",
        genre: "",
        lengthMin: "",
        lengthMax: "",
        yearMin: "",
        yearMax: ""
      };
      this.filterAudio();
    },
    reload: function() {
      this.$router.go();
    },
    loadMore: function() {
      let length = this.audioList.length;
      if (this.audioLimit >= length) this.audioLimit = length;
      else this.audioLimit += 25;
    },

    image: function(thumbnailPath) {
      console.log(thumbnailPath, "1");
      if (typeof thumbnailPath !== "undefined") {
        console.log(thumbnailPath, "2");
        let parts = thumbnailPath.split("/");
        let slug = parts[parts.length - 1];
        return address + "/api/v1/audio/stream-thumbnail/" + slug;
      } else return "";
    },
    deleteAudio: function(audioSlug, audioTitle) {
      this.$dialog
        .confirm("Czy na pewno chcesz usunąć ten utwór " + audioTitle + "?")
        .then(() => {
          this.$store
            .dispatch("audio/deleteAudio", audioSlug)
            .then(result => {
              console.log(result);
              this.audioList = this.audioList.filter(x => x.slug != audioSlug);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    audioInfo: function(audio) {
      this.audioDetail(audio);
      this.$bvModal.show("AudioDetail");
    },
    srcStream: function(slug) {
      return address + "/api/v1/audio/stream/" + slug;
    },
    editAudio: function(audio) {
      this.audioToEdit(audio);
      this.$router.push("/admin/audio/edit/" + audio.slug);
    },
    runPlayer: function(slug, image, index) {
      let src = this.srcStream(slug);

      this.changeCoverSource(this.image(image));
      this.changeSource(src);
      this.changeIndex(index);
      this.showAudioPlayer();
      this.startAudio();
    },
    toPlaylist: function(audio, index) {
      let data = {
        src: this.srcStream(audio.slug),
        coverSrc: this.image(audio.thumbnail),
        id: audio._id
      };
      if (this.getPlaylist.length == 0) {
        this.runPlayer(audio.slug, audio.thumbnail, index);
        this.changePlaylistIndex(0);
      }
      this.addToPlaylist(data);
    }
  },
  computed: {
    ...mapGetters("audio", ["audios", "infoVisibility", "audio"]),
    ...mapGetters("audioPlayer", ["audioPlayer", "getPlaylist"]),
    ...mapGetters("user", ["age", "type"])
  },
  created() {
    this.getAllAudio(this.age).then(result => {
      console.log(result);
      this.audioList = result.data.response;
      this.listLoaded = true;
    });
  }
};
</script>

<style scoped>
#audios {
  width: 100vw !important;
}
.table tr {
  border: none;
  width: 100%;
  height: fit-content;
}

center {
  margin-top: 2em;
}
.table {
  width: 100% !important;
  margin-top: 25px;
}
form {
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;
}

#addAudio {
  position: fixed;
  bottom: 15px;
  right: 15px;
  color: rgba(24, 150, 41, 0.979);
}
#addAudio:hover {
  color: rgba(37, 228, 63, 0.979);
  transition: 0.5s ease-out;
}
.table td {
  vertical-align: middle;
}

img:hover {
  transform: scale(5);
  transform-origin: center;
  transition: 0.3s ease-in;
  border-radius: 10px;
}
@media (max-width: 768px) {
  form {
    width: 80%;
  }
  table {
    position: relative;
    width: 100% !important;
  }
}

@media (max-width: 360px) {
  table {
    left: -1em;
    width: 100% !important;
  }
  td {
    position: relative;
  }
}

@media (max-width: 1600px) {
  tr {
    display: grid;
    grid-template-columns: 4fr 4fr 5fr;
  }
}

@media (max-width: 1200px) {
  tr {
    display: grid;
    grid-template-columns: 3fr 3fr;
    padding: 0.1rem;
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

.filterButton span {
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