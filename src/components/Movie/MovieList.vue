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
      <table class="table table-hover table-striped" v-if="listLoaded">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nazwa filmu</th>
            <th scope="col">Rok</th>
            <th scope="col">Język</th>
            <th scope="col">Gatunek</th>
            <th scope="col">Długość (min)</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
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
      <MoviePlayer />
      <MovieDetail :movie="this.targetMovie" />
      <MovieInfo v-if="infoVisibility" />
    </div>
    <router-link to="movie/add">
      <button type="button" class="btn btn-success btn-circle btn-md">
        <h1>+</h1>
      </button>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieDetail from "./Movie";
import MoviePlayer from "./MoviePlayer";
import MovieInfo from "./MovieInfo"
import filterMovieList from "../../plugins/filterList";

export default {
  name: "MovieList",
  components: {
    MovieDetail,
    MoviePlayer,
    MovieInfo
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
      player: {
        src: "",
        show: false
      }
    };
  },
  methods: {
    ...mapActions("movie", ["allMovies", "movieToEdit", "showVideoPlayer", "setVideoPlayer"]),
    //...mapActions("movie", ["movieToEdit"]),
    //...mapActions("movie", ["showVideoPlayer"]),
    //...mapActions("movie", ["setVideoPlayer"]),
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
      this.targetMovie = movie
      this.$bvModal.show('MovieDetail')
    },
    image: function(slug) {
      return "http://localhost:8000/api/v1/movie/stream-thumbnail/" + slug;
    },
    srcStream: function(slug) {
      return "http://localhost:8000/api/v1/movie/stream/" + slug;
    },
    editMovie: function(movie) {
      this.movieToEdit(movie);
      this.$router.push("/admin/movie/edit/" + movie.slug);
    },
    runPlayer: function(slug) {
      console.log("XD")
      let src = this.srcStream(slug)
      this.showVideoPlayer(src)
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
    ...mapGetters("movie", ["movies"]),
    ...mapGetters("movie", ["infoVisibility"])
  }
};
</script>

<style>
.btn-circle.btn-md {
  position: absolute;
  bottom: 120px;
  right: 50px;
  width: 70px;
  height: 70px;
  padding: 10px;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
}
img:hover{
  transform: scale(2.0);
  transform-origin: center;
  transition: 0.3s ease-in;
  border-radius: 10px;
}
</style>