<template>
  <div>
    <b-modal id="AudioDetail" title="Szczegóły pliku audio">
      <table class="table table-border table-responsive">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{{this.audio._id}}</td>
          </tr>
          <tr>
            <th>Tytuł</th>
            <td>{{audio.title}}</td>
          </tr>
          <tr>
            <th>Autor/Zespół</th>
            <td>{{audio.author}}</td>
          </tr>
          <tr>
            <th>Album</th>
            <td>{{audio.album}}</td>
          </tr>
          <tr>
            <th>Rok powstania</th>
            <td>{{audio.year}}</td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>{{audio.description}}</td>
          </tr>

          <tr>
            <th>Gatunek</th>
            <td>{{audio.genre}}</td>
          </tr>
          <tr>
            <th>Język</th>
            <td>{{audio.language}}</td>
          </tr>
          <tr>
            <th>Czas trwania (min)</th>
            <td>{{Math.round(audio.length*100/60)/100}}</td>
          </tr>
          <tr>
            <th>Słowa kluczowe</th>
            <td>
              <p v-for="tag in this.audio.tags" :key="tag">{{tag}}</p>
            </td>
          </tr>
          <tr>
            <th>Ograniczenie wiekowe [0-1-2]</th>
            <td>{{audio.age_rate}}</td>
          </tr>
        </tbody>
      </table>
      <img class="thumbnail" :src="image(audio.thumbnail)" alt="miniatura albumu" />
    </b-modal>
  </div>
</template>

<script>
import { address } from "../../store/api";
export default {
  name: "Audio",
  props: ["audio"],
  methods: {
    image: function(thumbnailPath) {
      ////console.log(thumbnailPath, "1");
      if (typeof thumbnailPath !== "undefined") {
        ////console.log(thumbnailPath, "2");
        let parts = thumbnailPath.split("/");
        let slug = parts[parts.length - 1];
        return address + "/api/v1/audio/stream-thumbnail/" + slug;
      } else return "";
    }
  }
};
</script>

<style scoped>
img {
  height: 100%;
}

table {
  overflow-y: hidden !important;
}

div >>> .modal-dialog {
  margin: 0;
  max-width: 100% !important;
  background-color: rgba(211, 32, 52, 0.6);
}


div>>>img{
  width: 100%!important;
  opacity:0.2;
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