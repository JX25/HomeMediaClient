<template>
  <div>
    <b-modal id="ImageDetail" title="Szczegóły pliku graficznego">
      <table class="table table-border table-responsive">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{{this.image._id}}</td>
          </tr>
          <tr>
            <th>Nazwa zdjęcia</th>
            <td>{{image.title}}</td>
          </tr>
          <tr>
            <th>Data</th>
            <td>{{(new Date(image.timestamp * 1000)).toString().slice(0,24)}}</td>
          </tr>
          <tr>
            <th>Album</th>
            <td>{{image.collections}}</td>
          </tr>
          <tr>
            <th>Słowa kluczowe</th>
            <td>
              <p v-for="tag in this.image.tags" :key="tag">{{tag}}</p>
            </td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>{{image.description}}</td>
          </tr>
          <tr></tr>
          <tr>
            <th>Wymiary (px)</th>
            <td>{{image.width}}x{{image.height}}</td>
          </tr>
          <tr>
            <th>Ograniczenie wiekowe [0-1-2]</th>
            <td>{{image.age_rate}}</td>
          </tr>
        </tbody>
      </table>
      <img class="thumbnail" :src="streamImage(image.slug)" alt="miniatura albumu" />
    </b-modal>
  </div>
</template>

<script>
import { address } from "../../store/api";
export default {
  name: "ImageDetail",
  props: ["image"],
  methods: {
    streamImage: function(slug) {
      //console.log(slug);
      if (typeof slug !== "undefined") {
        return address + "/api/v1/image/stream/" + slug;
      } else return "";
    }
  }
};
</script>

<style scoped>
div >>> .modal-dialog {
  width: 100% !important;
  margin: 0;
  max-height: 100%;
  transform: translateY(-25%);
  background-color: rgba(211, 32, 52, 0.6);
  display: block;
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

div>>>img{
  width: 100%!important;
  opacity:0.3;
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
  max-height: 100%;
}
</style>