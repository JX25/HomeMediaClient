<template>
  <div>
    <b-modal id="MusicDetail" title="Szczegóły pliku audio">
      <table class="table table-border table-responsive">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{{this.music._id}}</td>
          </tr>
          <tr>
            <th>Tytuł</th>
            <td>{{music.title}}</td>
          </tr>
          <tr>
            <th>Autor/Zespół</th>
            <td>{{music.author}}</td>
          </tr>
          <tr>
            <th>Album</th>
            <td>{{music.album}}</td>
          </tr>
          <tr>
            <th>Rok powstania</th>
            <td>{{music.year}}</td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>{{music.description}}</td>
          </tr>
          <tr>
            <td rowspan="2" colspan="2">
              <img class="thumbnail" :src="image(music.thumbnail)" alt="miniatura albumu" />
            </td>
          </tr>
          <tr>
            <th>Gatunek</th>
            <td>{{music.genre}}</td>
          </tr>
          <tr>
            <th>Język</th>
            <td>{{music.language}}</td>
          </tr>
          <tr>
            <th>Czas trwania (min)</th>
            <td>{{Math.round(music.length*100/60)/100}}</td>
          </tr>
          <tr>
            <th>Słowa kluczowe</th>
            <td>
              <p v-for="tag in this.music.tags" :key="tag">{{tag}}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </b-modal>
  </div>
</template>

<script>
import { address } from "../../store/api";
export default {
  name: "Music",
  props: ["music"],
  methods: {
    image: function(thumbnailPath) {
      console.log(thumbnailPath, "1");
      if (typeof thumbnailPath !== "undefined") {
        console.log(thumbnailPath, "2");
        let parts = thumbnailPath.split("/");
        let slug = parts[parts.length - 1];
        return address + "/api/v1/music/stream-thumbnail/" + slug
      } else return ""
    },
  }
}
</script>

<style scoped>
div >>> .modal-dialog {
  margin: auto !important;
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
  background-color: rgba(79, 180, 226, 0.774) !important;
}

div >>> footer .btn-secondary {
  background-color: rgba(79, 180, 226, 0.774) !important;
  visibility: hidden;
}

div >>> td {
  word-break: break-all;
  display: block;
}

div >>> .thumbnail {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 50%;
}

@media (max-width: 800px) {
  div >>> .thumbnail {
    width: 25%;
    height: 25%;
  }
}
</style>