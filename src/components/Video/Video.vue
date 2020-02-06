<template>
  <div>
    <b-modal id="VideoDetail" title="Szczegóły filmu">
      <table class="table table-border table-responsive">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{{this.video._id}}</td>
          </tr>
          <tr>
            <th>Tytuł</th>
            <td>{{video.title}}</td>
          </tr>
          <tr>
            <th>Rok powstania</th>
            <td>{{video.year}}</td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>{{video.description}}</td>
          </tr>
          <tr>
            <td rowspan="2" colspan="2">
                <img class="thumbnail" :src="image(video.slug)" alt="miniatura filmu"/>
            </td>
          </tr>
          <tr>
            <th>Gatunek</th>
            <td>{{video.genre}}</td>
          </tr>
          <tr>
            <th>Język</th>
            <td>{{video.language}}</td>
          </tr>
          <tr>
            <th>Czas trwania (min)</th>
            <td>{{Math.round(video.length*100/60)/100}}</td>
          </tr>
          <tr>
            <th>Reżyser/Reżyserzy</th>
            <td>
              <p v-for="director in this.video.director" :key="director">{{director}}</p>
            </td>
          </tr>
          <tr>
            <th>Aktorzy</th>
            <td>
              <p v-for="actor in this.video.actors" :key="actor">{{actor}}</p>
            </td>
          </tr>
          <tr>
            <th>Słowa kluczowe</th>
            <td>
              <p v-for="tag in this.video.tags" :key="tag">{{tag}}</p>
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
  name: "Video",
  props: ["video"],
  created() {
    console.log(this.video);
  },
  methods: {
    image: function(slug) {
      return address + "/api/v1/video/stream-thumbnail/" + slug;
    }
  }
};
</script>

<style scoped>
div{
  overflow: hidden;
}

div::-webkit-scrollbar{
  display: none;
}

div >>> .modal-dialog {
  margin: auto!important;
  max-width: 100% !important;
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
  height: auto;
  max-height: 90%;
}

@media (max-width: 800px) {
div >>> .thumbnail{
  width: 25%;
  height: 25%;
}

}
</style>