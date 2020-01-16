<template>
  <div>
    <h2>Lista filmów</h2>
    <div>
      <form class="form-inline">
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="title"
          placeholder="Nazwa filmu"
          v-model="params.title"
        />
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="keyword"
          placeholder="Słowa kluczowe"
          v-model="params.keyword"
        />
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="genre"
          placeholder="Gatunek"
          v-model="params.genre"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2 col-xs-2"
          id="lengthMin"
          placeholder="Długość od min"
          v-model="params.lengthMin"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="lengthMax"
          placeholder="Długość do min"
          v-model="params.lengthMax"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="yearMin"
          placeholder="Od roku"
          v-model="params.yearMin"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="yearMax"
          placeholder="Do roku"
          v-model="params.yearMax"
        />
        <button class="btn btn-info form-control mb-2 mr-sm-2" @click="filterMovies()">Wyszukaj</button>
      </form>
      <table class="table table-hover table-striped col-md-12" v-if="listLoaded">
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
          <tr v-for="movie in movieList" :key="movie.id">
            <td>
              <img :src="image(movie.slug)" width="100" height="100" alt="brak" />
            </td>
            <td>{{movie.title.toUpperCase()}}</td>
            <td>{{movie.year}}</td>
            <td>{{movie.language}}</td>
            <td>{{movie.genre.toUpperCase()}}</td>
            <td>{{Math.round(movie.length*100/60)/100}}</td>
            <td>
              <button type="button" class="btn btn-success" @click="runPlayer(movie.slug)">Oglądaj</button>
            </td>
            <td>
              <b-button v-b-modal.MovieDetail @click="movieInfo(movie)">Podgląd</b-button>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click="editMovie(movie)">Edycja</button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteMovie(movie.slug, movie.title)"
              >Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!--<MoviePlayer class="movie-player" />-->
      <MovieDetail :movie="this.targetMovie" />
      <MovieInfo v-if="infoVisibility" />
    </div>
    <router-link to="movie/add">
      <i id="addMovie" class="fas fa-plus-circle fa-3x"></i>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieDetail from "./Movie";
import MovieInfo from "./MovieInfo";
import filterMovieList from "../../plugins/filterList";
import { address } from "../../store/api";

export default {
  name: "MovieList",
  components: {
    MovieDetail,
    MovieInfo,
  },
  data() {
    return {
      movieList: [],
      listLoaded: false,
      targetMovie: {},
      params: {
        title: "",
        keyword: "",
        genre: "",
        lengthMin: "",
        lengthMax: "",
        yearMin: "",
        yearMax: ""
      },
    };
  },
  methods: {
    ...mapActions("movie", ["allMovies", "movieToEdit"]),
    ...mapActions("moviePlayer", ["showVideoPlayer", "hideVideoPlayer"]),
    deleteMovie: function(movieSlug, movieTitle) {
      if (confirm("Czy na pewno chcesz usunąć film " + movieTitle + "?")) {
        this.$store
          .dispatch("movie/deleteMovie", movieSlug)
          .then(result => {
            this.movieList = this.movieList.filter(x => x.slug != movieSlug);
            console.log(movieSlug, this.movieList, result);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    filterMovies: function() {
      //WALIDACJA
      let filteredMovies = filterMovieList(this.movies, this.params);
      this.movieList = filteredMovies;
    },
    movieInfo: function(movie) {
      this.targetMovie = movie;
      this.$bvModal.show("MovieDetail");
    },
    image: function(slug) {
      console.log(address);
      return address + "/api/v1/movie/stream-thumbnail/" + slug;
    },
    srcStream: function(slug) {
      console.log("XD", address);
      return address + "/api/v1/movie/stream/" + slug;
    },
    editMovie: function(movie) {
      this.movieToEdit(movie);
      this.$router.push("/admin/movie/edit/" + movie.slug);
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
    this.allMovies().then(result => {
      console.log("load", result.data.response);
      this.movieList = result.data.response;
      this.listLoaded = true;
    });
  },
  computed: {
    ...mapGetters("movie", ["movies", "infoVisibility"]),
    ...mapGetters("moviePlayer", ["getSrc", "getShow"])
  }
};
</script>

<style scoped>
#addMovie {
  position: fixed;
  bottom: 15px;
  right: 15px;

  color: rgba(24, 150, 41, 0.979);
}

#addMovie:hover {
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