<template>
  <div>
    <div>
      <form class="form-inline col-md-12 table-responsive">
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="collection"
          placeholder="Kolekcja..."
          v-model="params.collection"
        />
        <date-picker v-model="params.dateFrom" :placeholder="`Data od...`"></date-picker>
        <date-picker v-model="params.dateTo" :placeholder="`Data do...`"></date-picker>
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="keyword"
          placeholder="Słowa kluczowe..."
          v-model="params.keyword"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="maxWidth"
          placeholder="Max szerokość w px..."
          v-model="params.maxWidth"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2"
          id="minWidth"
          placeholder="Min szerokość w px..."
          v-model="params.minWidth"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2 col-xs-2"
          id="maxHeight"
          placeholder="Max wysokość w px..."
          v-model="params.maxHeight"
        />
        <input
          type="number"
          class="form-control mb-2 mr-sm-2 col-xs-2"
          id="minHeight"
          placeholder="Min wysokość w px..."
          v-model="params.minHeight"
        />
        <button
          class="btn btn-info form-control mb-2 mr-sm-2"
          type="button"
          @click="filterImage()"
        >Wyszukaj</button>
        <button
          class="btn btn-secondary form-control mb-2 mr-sm-2"
          @click="clear()"
          type="button"
        >Resetuj</button>
        <button
          class="btn btn-secondary form-control mb-2 mr-sm-2"
          @click="reload()"
          type="button"
        >Przeładuj</button>
      </form>
    </div>
    <div class="image-list" 
    @keyup.left="swipe(-1)"
    @keyup.right="swipe(1)"
    tabindex="0"
    @touchstart="touchStart()"
    @touchmove="touchMove()"
    @touchend="touchEnd()"
    >
      <div class="fullscreen" v-if="showGallery">
          <img
          :key="currentSrc"
          :src="streamImage(currentSrc)"
          v-touch:swipe.left="swipe(-1)"
          v-touch:swipe.right="swipe(1)"
        />     

        <i
          class="close gallery-btn fas fa-window-close"
          @click="showGallery=false"
          @keyup.escape="showGallery=false"
        ></i>
        <i
          class="arrow-left gallery-btn fas fa-chevron-left fa-3x"
          @click="swipe(-1)"
          @keyup.escape="showGallery=false"
        ></i>
        <i
          class="arrow-right gallery-btn fas fa-chevron-right fa-3x"
          @click="swipe(1)"
          @keyup.escape="showGallery=false"
        ></i>
        <div class="rotate-image">
          <i class="fas fa-undo" @click="rotateLeft"></i>
          <i class="fas fa-redo" @click="rotateRight"></i>
        </div>
      </div>
      <div class="flex-container col-md-12 justify-content-center" v-if="listLoaded">
        <template>
          <div
            v-for="(image, index) in imageList.slice(0, imageLimit)"
            class="image-box"
            :key="index"
          >
            <img
              :src="streamImage(image.thumbnail_path, '/image-thumbnail')"
              @click="openGallery(index)"
              :key="image.thumbnail_path"
            />
            <div class="image-menu" v-if="showMenu[index]" :key="index">
              <b-button variant="blue darken-4" @click="editImage(index)">Edytuj dane</b-button>
              <br />
              <b-button variant="red darken-4" @click="deleteImage(index, image.slug)">Usuń</b-button>
              <br />
              <b-button variant="green darken-4" @click="previewImage(index)">Podgląd</b-button>
            </div>
            <i
              class="fas fa-cog fa-2x"
              id="imageConfig"
              @click="showImageOptions(index)"
              v-if="!showMenu[index]"
            ></i>
            <i
              class="fas fa-window-close fa-2x"
              id="imageConfigClose"
              @click="showImageOptions(index)"
              v-else
            ></i>
          </div>
        </template>

        <b-button @click="loadMore" v-if="imageLimit < imageList.length">Więcej</b-button>
      </div>
      <ImageDetail :image="this.image" />
      <ImageInfo v-if="infoVisibility" />
    </div>
    <router-link to="/admin/image/add">
      <i id="addImage" class="fas fa-plus-circle fa-3x"></i>
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { address } from "../../store/api";
import DatePicker from "vue2-datepicker";
import { filterImageList } from "../../plugins/filterList";
import "vue2-datepicker/index.css";
import ImageInfo from "./ImageInfo";
import ImageDetail from "./Image";
export default {
  name: "ImageList",
  components: {
    DatePicker,
    ImageInfo,
    ImageDetail
  },
  data() {
    return {
      touch: {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      },
      imageLimit: 25,
      showGallery: false,
      currentSrc: "",
      currentIndex: 0,
      imageList: [],
      listLoaded: false,
      targetImage: {},
      params: {
        dateFrom: "",
        dateTo: "",
        keyword: "",
        collection: "",
        width: "",
        height: ""
      },

      showMenu: []
    };
  },
  methods: {
    ...mapActions("image", [
      "imageToEdit",
      "allImages",
      "deleteImage",
      "imagePreview",
      "imageToEdit"
    ]),
    touchStart: function(){
      console.log("e",event)
      this.touch.startX = event.touches[0].clientX
      this.touch.startY = event.touches[0].clientY
      console.log(this.touch)
    },
    touchMove: function(){
      console.log("ee",event)
      this.touch.endX = event.touches[0].clientX
      this.touch.endY = event.touches[0].clientY
      console.log(this.touch)
    },
    touchEnd: function(){
      let swipeValue = this.touch.endX - this.touch.startX
      console.log(swipeValue)
      if(swipeValue > 0 && swipeValue > 100) this.swipe(1)
      if(swipeValue <0 && swipeValue < -100) this.swipe(-1)
    },
    reload: function() {
      this.$router.go();
    },
    openGallery: function(index) {
      this.currentIndex = index;
      this.currentSrc = this.streamImage(
        this.imageList[this.currentIndex].file_path
      );
      this.showGallery = true;
    },
    showImageOptions: function(i) {
      this.$forceUpdate();
      this.showMenu[i] = !this.showMenu[i];
    },
    swipe: function(value) {
      this.rotation = 0;
      this.currentIndex += value;
      if (this.currentIndex < 0) this.currentIndex = this.imageList.length - 1;
      if (this.currentIndex >= this.imageList.length) this.currentIndex = 0;
      this.currentSrc = this.streamImage(
        this.imageList[this.currentIndex].file_path
      );
    },
    loadMore: function() {
      let length = this.imageList.length;
      if (this.imageLimit >= length) this.imageLimit = length;
      else this.imageLimit += 25;
    },
    streamImage: function(path, thmb = "") {
      if (typeof path !== "undefined") {
        let parts = path.split("/");
        let slug = parts[parts.length - 1];
        return address + "/api/v1/image/stream" + thmb + "/" + slug;
      } else return "";
    },
    editImage: function(i) {
      this.imageToEdit(this.imageList[i]);
      this.$router.push("/admin/image/edit/" + this.imageList[i].slug);
    },
    previewImage: function(i) {
      this.imagePreview(this.imageList[i]);
      this.$bvModal.show("ImageDetail");
    },
    deleteImage: function(index, slug) {
      if (confirm("Czy na pewno chcesz usunąć ten plik?")) {
        this.$store
          .dispatch("image/deleteImage", this.imageList[index])
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          });
        this.imageList = this.imageList.filter(x => x.slug != slug);
        this.showMenu[index] = false;
      }
    },
    filterImage: function() {
      console.log("2", this.params);
      let filteredImage = filterImageList(this.images, this.params);
      this.imageLimit = 25;
      this.imageList = filteredImage;
    },
    clear: function() {
      this.params = {
        dateFrom: "",
        dateTo: "",
        keyword: "",
        collection: "",
        widthMin: "",
        widthMax: "",
        heightMin: "",
        heightMax: ""
      };
      this.filterImage();
    },
    rotateLeft: function() {
      console.log("asdas");
      this.rotation = -90;
    },
    rotateRight: function() {
      console.log("dd");
      this.rotation = 90;
    }
  },
  computed: {
    ...mapGetters("image", ["images", "infoVisibility", "image"])
  },
  created() {
    this.$forceUpdate();
    this.allImages().then(result => {
      this.imageList = result.data.response;
      for (let i = 0; i < this.imageList.length; ++i) {
        this.showMenu[i] = false;
      }
      this.listLoaded = true;
    });
  }
};
</script>

<style scoped>
#addImage {
  position: fixed;
  bottom: 15px;
  right: 15px;

  color: rgba(24, 150, 41, 0.979);
}

.image-list {
  position: realtive;
  outline: none !important;
  border: 0px;
}
::-webkit-scrollbar {
  display: none;
}
.image-box {
  width: 320px;
  height: 200px;
  overflow: hidden;
  transition: 0.1s ease;
}

.image-box:hover {
  outline: none;
  box-shadow: 0 0 25px rgba(30, 120, 255, 0.9);
}

.image-box img {
  width: 320px;
  height: 240px;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.flex-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}
.flex-container > div > img {
  margin: 0;
  transform-origin: 50% 50%;
  padding: 2px;
  transition: transform 0.5s ease;
}

.flex-container > div > img:hover {
  transform: scale(1.5);
  z-index: 100;
}

.fullscreen {
  height: 100%;
  width: 100%;
  background-color: rgba(10, 10, 10, 0.9);
  z-index: 1000000;
  position: fixed;
  top: 0px;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  color: rgba(240, 240, 240, 0.3);
}

.gallery-btn:hover {
  color: rgba(240, 240, 240, 0.9);
  cursor: pointer;
}

.arrow-left {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(0%, -50%);
  color: rgba(240, 240, 240, 0.5);
}

.arrow-right {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0%, -50%);
  color: rgba(240, 240, 240, 0.5);
}

.fullscreen > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 30%;
  max-width: 95% !important;
  max-height: 95% !important;
  transition: 0.3s ease-in;
}

#imageConfig {
  z-index: 100;
  position: relative;
  right: -140px;
  top: -235px;
  color: rgba(255, 255, 255, 0.3);
}

#imageConfig:hover {
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
}

#imageConfigClose {
  z-index: 100;
  position: relative;
  right: -140px;
  top: -475px;
  color: rgba(255, 255, 255, 0.3);
}

#imageConfigClose:hover {
  cursor: pointer;

  color: rgba(255, 255, 255, 0.8);
}

.image-menu {
  float: left;
  position: relative;
  width: 320px;
  height: 240px;
  top: -240px;
  background-color: rgba(0, 0, 0, 0.6);
}

.image-menu button {
  top: 25px;
  width: 200px;
  position: relative;
}

.rotate-image {
  left: 50%;
  transform: translate(-50%);
  bottom: 1em;
  position: absolute;
}

.rotate-image i {
  padding: 1em;
}

.rotate-image i:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>