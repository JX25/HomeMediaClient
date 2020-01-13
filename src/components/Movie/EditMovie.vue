<template>
  <div>
    <form @submit.prevent="editMovie">
      <table class="table">
        <tbody>
          <tr>
            <th>Tytuł filmu</th>
            <td>
              <input type="text" v-model="movie.title" />
            </td>
          </tr>
          <tr>
            <th>Opis</th>
            <td>
              <input type="text" v-model="movie.description" />
            </td>
          </tr>
          <tr>
            <th>Rok</th>
            <td>
              <input type="text" v-model="movie.year" />
            </td>
          </tr>
          <tr>
            <th>Gatunek</th>
            <td>
              <input type="text" v-model="movie.genre" />
            </td>
          </tr>
          <tr>
            <th>Wiek</th>
            <td>
              <select type="text" v-model="movie.age_rate" :selected="movie.age_rate">
                <option value="0">Familijny</option>
                <option value="1">do 16lat</option>
                <option value="2">powyżej 16lat</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Język</th>
            <td>
              <input type="text" v-model="movie.language" />
            </td>
          </tr>
          <tr>
            <th>Reżyser/Reżyserzy</th>
            <td>
              <input type="text" v-model="this.directors" />
            </td>
          </tr>
          <tr>
            <th>Aktorzy</th>
            <td>
              <input type="text" v-model="this.actors" />
            </td>
          </tr>
          <tr>
            <th>Słowa kluczowe</th>
            <td>
              <input type="text" v-model="this.tags" />
            </td>
          </tr>
          <tr>
            <th>Miniatura</th>
            <td>
              <input type="file" accept=".jpeg, .jpg, .png" id="thumbnail" ref="thumbnail" />
            </td>
          </tr>
          <tr>
            <th>Plik wideo</th>
            <td>
              <input type="file" accept=".mp4, .x-m4v, video/*" id="video" ref="video" />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="button"
                @click="validateAndUpdate"
                class="btn btn-primary"
                value="Zakutalizuj"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import getBlobDuration from 'get-blob-duration';

export default {
  name: "EditMovie",
  components: {},
  data() {
    return {
      movie: {},
      directors: "",
      actors: "",
      tags: "",
      slug: this.$route.params.slug,
      result: []
    };
  },
  methods: {
    ...mapActions("movie", ["setInfo"]),
    ...mapActions("movie", ["showInfo", "clearInfo"]),
    validateAndUpdate: function() {
      //console.log(this.$refs.video.files[0] === undefined)
      //validate();
      //if(!validate) {}
      let metadata = {}
      console.log("XDDD", this.movie)
      console.log(this.$route.params.slug)
      metadata.actors = this.actors.split(",").map(obj => obj.trim())
      metadata.director = this.directors.split(",").map(obj => obj.trim())
      metadata.tags = this.tags.split(",").map(obj => obj.trim())
      //console.log(this.actors, this.director, this.tags)      
      //console.log(metadata.actors, metadata.director, metadata.tags)
      metadata.title = this.movie.title;
      metadata.description = this.movie.description;
      metadata.year = this.movie.year;
      metadata.genre = this.movie.genre;
      metadata.language = this.movie.language;
      metadata.age_rate = this.movie.age_rate;
      // files
      let files = {}
      files.file = this.$refs.video.files[0];
      files.thumbnail = this.$refs.thumbnail.files[0];
      files.slug = this.movie.title + "_" + this.movie.year  
      this.updateMovie(metadata, files)    
    },
    setMovie: async function() {
      this.movie = this.editMovie;
    },
    loadArrays: function() {
      this.directors = this.movie.director.join(", ");
      this.actors = this.movie.actors.join(", ");
      this.tags = this.movie.tags.join(", ");
    },
    updateMovie: function(meta, files){
      meta.slug = meta.title + '_' + meta.year
      meta.OLDslug = this.slug
      this.clearInfo()
      if(files.file != undefined){
        let fileURL = URL.createObjectURL(this.file);
      getBlobDuration(fileURL).then(duration => {
        console.log(duration);
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration - minutes * 60);
        meta.length = minutes + "min " + seconds + "s";
      });
      }

      this.$store.dispatch("movie/updateMetaData", meta)
      .then(result =>{
        //console.log("01", result)
        this.result.push(result[0])
        this.setInfo("Dane pliku wideo: " + result[0])
      })
      if(files.thumbnail != undefined){
        this.$store.dispatch("movie/uploadThumbnail", files)
              .then(result =>{
        //console.log("02", result)
         this.setInfo("Miniatura: " + result.data.response)
      })
      }
      if(files.file != undefined){
        this.$store.dispatch("movie/uploadMovie", files)
              .then(result =>{
        //console.log("02", result)
         this.setInfo("Plik wideo: " + result.data.response)
      })
      }
      this.showInfo()
      this.$router.push('/admin/movie')
    },
  },
  created() {
    this.setMovie().then(() => {
      let objLength = Object.entries(JSON.parse(JSON.stringify(this.movie)))
        .length;
      if (objLength === 0) {
        if (this.movies.length === 0) {
          this.$store.dispatch("movie/movieBySlug", this.slug).then(() => {
            this.movie = this.getMovie;
            this.loadArrays();
          });
        } else {
          this.movie = this.getMovieBySlug(this.slug);
        }
      }
      this.loadArrays();
    });
  },
  computed: {
    ...mapGetters("movie", ["editMovie"]),
    ...mapGetters("movie", ["getMovie"]),
    ...mapGetters("movie", ["movies"]),
    ...mapGetters("movie", ["getMovieBySlug"])
  }
};
</script>

<style>
</style>