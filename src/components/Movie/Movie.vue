<template>
  <div width="1000px">
    <b-modal id="MovieDetail" title="Szczegóły filmu">
      <table class="table table-border table-responsive">
        <tbody>
          <tr class="noborder">
            <td rowspan=1 class="noborder">
              <img :src="image(movie.slug)" alt="miniatura filmu" width="150" height="150" />
            </td>
          </tr>
          <tr>
            <th>Id</th>
            <td>{{this.movie._id}}</td>
          </tr>
          <tr>
            <th>Tytuł</th>
            <td>{{movie.title}}</td>
          </tr>
          <tr>
            <th>Rok powstania</th>
            <td>{{movie.year}}</td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>{{movie.description}}</td>
          </tr>
          <tr>
            <th>Gatunek</th>
            <td>{{movie.genre}}</td>
          </tr>
          <tr>
            <th>Język</th>
            <td>{{movie.language}}</td>
          </tr>
          <tr>
            <th>Czas trwania (min)</th>
            <td>{{Math.round(movie.length*100/60)/100}}</td>
          </tr>
          <tr>
            <th>Reżyser</th>
            <td>
              <p v-for="director in this.movie.director" :key="director">{{director}}</p>
            </td>
          </tr>
          <tr>
            <th>Aktorzy</th>
            <td>
              <p v-for="actor in this.movie.actors" :key="actor">{{actor}}</p>
            </td>
          </tr>
          <tr>
            <th>Słowa kluczowe</th>
            <td>
              <p v-for="tag in this.movie.tags" :key="tag">{{tag}}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: ["movie"],
  created() {
    console.log(this.movie);
  },
  methods: {
    image: function(slug) {
      return "http://localhost:8000/api/v1/movie/stream-thumbnail/" + slug;
    }
  }
};
</script>

<style>
.modal-dialog {
  max-width: 50% !important;
  background-color: rgba(211, 32, 52, 0.6);
}
</style>