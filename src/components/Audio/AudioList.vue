<template>
  <div>
    <h2>Lista utworów</h2>
    <div>
      <form class="form-inline">
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="title"
          placeholder="Nazwa filmu..."
          v-model="params.title"
        />
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="author"
          placeholder="Autor..."
          v-model="params.author"
        />
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="album"
          placeholder="Album..."
          v-model="params.album"
        />
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="keyword"
          placeholder="Słowa kluczowe..."
          v-model="params.tags"
        />
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="genre"
          placeholder="Gatunek..."
          v-model="params.genre"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2 col-xs-2"
          id="lengthMin"
          placeholder="Długość od min..."
          v-model="params.lengthMin"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="lengthMax"
          placeholder="Długość do min..."
          v-model="params.lengthMax"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="yearMin"
          placeholder="Od roku..."
          v-model="params.yearMin"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="yearMax"
          placeholder="Do roku..."
          v-model="params.yearMax"
        />
        <button class="btn btn-info form-control mb-2 mr-sm-2" @click="filterAudio()">Wyszukaj</button>
        <button class="btn btn-secondary form-control mb-2 mr-sm-2" @click="clear()">Resetuj</button>
      </form>
      <div class="table-responsive">
        <table class="table" v-if="listLoaded">
          <tr>
            <th scope="col col-sm-2">#</th>
            <th scope="col col-sm-2">Nazwa utworu</th>
            <th scope="col col-sm-2">Album</th>
            <th scope="col col-sm-2">Gatunek</th>
            <th scope="col col-sm-2">Autor</th>

            <th scope="col col-sm-2">Rok</th>
            <th scope="col col-sm-2">Długość (min:s)</th>
            <th scope="col" colspan="3"></th>
            <th scope="col" colspan="2"></th>
          </tr>

          <tbody>
            <tr v-for="audio in audioList" :key="audio.id">
              <td>
                <img :src="image(audio.thumbnail)" width="35" height="35" alt="brak" />
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
                <button type="button" class="btn btn-success" @click="runPlayer(audio.slug)">Odtwórz</button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="addPlaylist(audio)"
                >+ playlista</button>
              </td>
              <td>
                <b-button v-b-modal.AudioDetail @click="audioInfo(audio)">Podgląd</b-button>
              </td>
              <td>
                <button type="button" class="btn btn-primary" @click="editAudio(audio)">Edycja</button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteAudio(audio.slug, audio.title)"
                >Usuń</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <AudioDetail :audio="this.audio" />
      <AudioInfo v-if="infoVisibility" />
    </div>
    <router-link to="/admin/audio/add">
      <i id="addAudio" class="fas fa-plus-circle fa-3x"></i>
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
    //...mapActions("audioPlayer", ["showAudioPlayer", "hideVideoPlayer"]),
    filterAudio: function() {
      let filteredAudio = filterAudioList(this.audios, this.params);
      this.audioList = filteredAudio;
    },
    clear: function(){
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
      }
      this.filterAudio()
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
      if (confirm("Czy na pewno chcesz usunąć ten utwór " + audioTitle + "?")) {
        this.$store
          .dispatch("audio/deleteAudio", audioSlug)
          .then(result => {
            console.log(result);
            this.audioList = this.audioList.filter(x => x.slug != audioSlug);
          })
          .catch(error => {
            console.log(error);
          });
      }
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
    runPlayer: function(slug) {
      let src = this.srcStream(slug);
      if (this.getShow == true) {
        this.hideAudioPlayer();
      } else {
        this.showAudioPlayer(src);
      }
    }
  },
  computed: {
    ...mapGetters("audio", ["audios", "infoVisibility", "audio"])
    //...mapGetters("audioPlayer", ["getSrc", "getShow"])
  },
  created() {
    this.getAllAudio().then(result => {
      console.log(result);
      this.audioList = result.data.response;
      this.listLoaded = true;
    });
  }
};
</script>

<style scoped>
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

img:hover {
  transform: scale(2);
  transform-origin: center;
  transition: 0.3s ease-in;
  border-radius: 10px;
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
  }
}

tr {
  text-align: center;
  border: rgba(200, 200, 200, 1) 2px solid;
  page-break-inside: initial;
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
</style>