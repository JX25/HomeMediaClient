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
            <th scope="col">Podgląd</th>
            <th scope="col">Edycja</th>
            <th scope="col">Usuń</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td>THUMBNAIL</td>
            <td>{{movie.title.toUpperCase()}}</td>
            <td>{{movie.year}}</td>
            <td>{{movie.language}}</td>
            <td>{{movie.genre.toUpperCase()}}</td>
            <td>{{movie.length}}</td>
            <td>
              <button type="button" class="btn btn-warning">Podgląd</button>
            </td>
            <td>
              <button type="button" class="btn btn-primary">Edycja</button>
            </td>
            <td>
              <button type="button" class="btn btn-danger" @click="deleteMovie(movie.slug)">Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MovieList",
  data() {
    return {
      movies2: [],
      moviesTmp: []
    };
  },
  methods: {
    ...mapActions("movie", ["allMovies"]),
    deleteMovie: function(movieSlug) {
      return movieSlug;
    },
    filterMovies: function(filters) {
      filters * 2;
    }
  },
  created() {
    this.allMovies().then(result => {
      this.movies2 = this.movies;
      this.moveisTmp = result; //this.movies
    });
  },
  computed: {
    ...mapGetters("movie", ["movies"])
  }
};
</script>

<style>
</style>