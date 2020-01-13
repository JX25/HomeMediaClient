<template>
  <div>
    <b-modal id="MovieDetail" title="Szczegóły filmu">
      <table class="table table-border table-responsive">
        <tbody>
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
            <td rowspan="2" colspan="2">
                <img class="thumbnail" :src="image(movie.slug)" alt="miniatura filmu"/>
            </td>
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
            <th>Reżyser/Reżyserzy</th>
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
import { address } from '../../store/api';
export default {
  name: "Movie",
  props: ["movie"],
  created() {
    console.log(this.movie);
  },
  methods: {
    image: function(slug) {
      return address + "/api/v1/movie/stream-thumbnail/" + slug;
    }
  }
};
</script>

<style scoped>
div >>> .modal-dialog {
  margin: auto!important;
  max-width: 90% !important;
  background-color: rgba(211, 32, 52, 0.6);
}
div >>> header {
  background-color: #6f42c1 !important;
}

div >>> footer {
  background-color: #6f42c1 !important;
}

div >>> footer .btn-primary {
  width: 50px;
  background-color:rgba(79, 180, 226, 0.774) !important;
}

div >>> footer .btn-secondary {
  background-color: rgba(79, 180, 226, 0.774) !important;
  visibility: hidden;
}

div >>> td{
  word-break: break-all;
  display: block;
}

div >>> .thumbnail{
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 50%;
}

@media (max-width: 800px) {
div >>> .thumbnail{
  width: 25%;
  height: 25%;
}
}
</style>