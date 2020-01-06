<template>
  <div>
    <h2>Lista filmów</h2>
    <div>
      <form class="form-inline">
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="inlineFormInputName2"
          placeholder="Nazwa filmu"
        />
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="inlineFormInputName2"
          placeholder="Słowa kluczowe"
        />
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="inlineFormInputName2"
          placeholder="Gatunek"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2 col-xs-2"
          id="inlineFormInputName2"
          placeholder="Długość od min"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="inlineFormInputName2"
          placeholder="Długość do min"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="inlineFormInputName2"
          placeholder="Od roku"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="inlineFormInputName2"
          placeholder="Do roku"
        />
        <button class="btn btn-info form-control mb-2 mr-sm-2" @click="filterMovies">Wyszukaj</button>
      </form>
      <table class="table table-hover table-striped">
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
          <tr v-for="movie in movies" :key="movie.id">
            <td>
              <img :src="image(movie.slug)" width="100" height="100" alt="brak" />
            </td>
            <td>{{movie.title.toUpperCase()}}</td>
            <td>{{movie.year}}</td>
            <td>{{movie.language}}</td>
            <td>{{movie.genre.toUpperCase()}}</td>
            <td>{{movie.length}}</td>
            <td>
              <button type="button" class="btn btn-success" @click="runPlayer(movie.slug)">Oglądaj</button>
            </td>
            <td>
              <b-button v-b-modal.MovieDetail @click="setTargetMovie(movie)">Podgląd</b-button>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click="editMovie(movie)">Edycja</button>
            </td>
            <td>
              <button type="button" class="btn btn-danger" @click="deleteMovie(movie.slug)">Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
      <MoviePlayer :show="this.player.show" :src="this.player.src" />
      <MovieDetail :movie="this.targetMovie" />
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

export default {
  name: "MovieList",
  components: {
    MovieDetail,
    MoviePlayer
  },
  data() {
    return {
      movies2: [],
      moviesTmp: [],
      targetMovie: {},
      player: {
        src: "",
        show: false
      }
    };
  },
  methods: {
    ...mapActions("movie", ["allMovies"]),
    ...mapActions("movie", ["movieToEdit"]),
    deleteMovie: function(movieSlug) {
      if (confirm("Czy na pewno chcesz usunąć ten film?")) {
        this.$store
          .dispatch("movie/deleteMovie", movieSlug)
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    filterMovies: function(filters) {
      filters * 2;
    },
    setTargetMovie: function(movie) {
      //console.log(movie)
      this.targetMovie = movie;
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
      this.player.src = this.srcStream(slug);
      this.player.show = true;
    }
  },
  created() {
    this.allMovies().then(result => {
      this.moviesTmp = result; //this.movies
    });
  },
  computed: {
    ...mapGetters("movie", ["movies"])
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
</style>