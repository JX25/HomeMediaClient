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
        <button class="btn btn-info form-control mb-2 mr-sm-2" @click="filterMusic()">Wyszukaj</button>
      </form>
      <table class="table table-hover table-striped col-md-12" v-if="listLoaded">
        <tr>
          <th scope="col col-sm-2">#</th>
          <th scope="col col-sm-2">Nazwa utworu</th>
          <th scope="col col-sm-2">Album</th>
          <th scope="col col-sm-2">Gatunek</th>
          <th scope="col col-sm-2">Autor</th>
          <th scope="col col-sm-2">Język</th>
          <th scope="col col-sm-2">Rok</th>
          <th scope="col col-sm-2">Długość (min:s)</th>
          <th scope="col" colspan="3"></th>
          <th scope="col" colspan="2"></th>
        </tr>

        <tbody>
          <tr v-for="music in musicList" :key="music.id">
            <td>
              <img :src="image(music.thumbnail)" width="35" height="35" alt="brak" />
            </td>
            <td title="Tytuł utworu">{{music.title.toUpperCase()}}</td>
            <td title="Album utworu">{{music.album}}</td>
            <td title="Gatunek muzyczny">{{music.genre}}</td>
            <td title="Zespół/Autor">{{music.author}}</td>
            <td title="Język">{{music.language}}</td>
            <td title="Rok wydania">{{music.year}}</td>
            <td title="Długość (min)">{{Math.round(music.length/60,0)}}:{{(music.length%60)>=10 ? music.length%60 : "0"+music.length%60}}</td>
            <td>
              <button type="button" class="btn btn-success" @click="runPlayer(music.slug)">Odtwórz</button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-warning"
                @click="addPlaylist(music)"
              >+ playlista</button>
            </td>
            <td>
              <b-button v-b-modal.MusicDetail @click="musicInfo(music)">Podgląd</b-button>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click="editMusic(music)">Edycja</button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteMusic(music.slug, music.title)"
              >Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
      <MusicDetail :music="this.music" />
      <MusicInfo v-if="infoVisibility" />
    </div>
    <router-link to="/admin/music/add">
      <i id="addMusic" class="fas fa-plus-circle fa-3x"></i>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MusicDetail from "./Music";
import MusicInfo from "./MusicInfo";
import {filterMusicList} from "../../plugins/filterList";
import { address } from "../../store/api";

export default {
  name: "MusicList",
  components: {
    MusicDetail,
    MusicInfo
  },
  data() {
    return {
      musicList: [],
      listLoaded: false,
      targetMusic: {},
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
    ...mapActions("music", ["getAllMusic", "musicToEdit", "musicDetail"]),
    //...mapActions("musicPlayer", ["showMusicPlayer", "hideVideoPlayer"]),
    filterMusic: function() {
      let filteredMusic = filterMusicList(this.musics, this.params);
      this.musicList = filteredMusic;
    },
    image: function(thumbnailPath) {
      console.log(thumbnailPath, "1");
      if (typeof thumbnailPath !== "undefined") {
        console.log(thumbnailPath, "2");
        let parts = thumbnailPath.split("/");
        let slug = parts[parts.length - 1];
        return address + "/api/v1/music/stream-thumbnail/" + slug;
      } else return "";
    },
    deleteMusic: function(musicSlug, musicTitle) {
      if (confirm("Czy na pewno chcesz usunąć ten utwór " + musicTitle + "?")) {
        this.$store
          .dispatch("music/deleteMusic", musicSlug)
          .then(result => {
            console.log(result);
            this.musicList = this.musicList.filter(x => x.slug != musicSlug);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    musicInfo: function(music) {
      this.musicDetail(music);
      this.$bvModal.show("MusicDetail");
    },
    srcStream: function(slug) {
      return address + "/api/v1/music/stream/" + slug;
    },
    editMusic: function(music) {
      this.musicToEdit(music);
      this.$router.push("/admin/music/edit/" + music.slug);
    },
    runPlayer: function(slug) {
      let src = this.srcStream(slug);
      if (this.getShow == true) {
        this.hideMusicPlayer();
      } else {
        this.showMusicPlayer(src);
      }
    }
  },
  computed: {
    ...mapGetters("music", ["musics", "infoVisibility", "music"])
    //...mapGetters("musicPlayer", ["getSrc", "getShow"])
  },
  created() {
    this.getAllMusic().then(result => {
      console.log(result);
      this.musicList = result.data.response;
      this.listLoaded = true;
    });
  }
};
</script>

<style scoped>
#addMusic {
  position: fixed;
  bottom: 15px;
  right: 15px;

  color: rgba(24, 150, 41, 0.979);
}

#addMusic:hover {
  color: rgba(37, 228, 63, 0.979);
  transition: 0.5s ease-out;
}

img:hover {
  transform: scale(2);
  transform-origin: center;
  transition: 0.3s ease-in;
  border-radius: 10px;
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
</style>