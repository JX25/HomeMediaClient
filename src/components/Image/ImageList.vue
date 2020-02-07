<template>
<div>
  <h1>Galeria zdjęć / obrazów / plików graficznych</h1>
  <div>
    <form action=""></form>
  </div>
  <div class="image-list" @keyup.left="swipe(-1)" @keyup.right="swipe(1)" tabindex="0">
    <div class="fullscreen" v-if="showGallery">
      <img :src="streamImage(currentSrc)" />
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
      <i
        class="gallery-btn fas fa-window-close"
        @click="showGallery=false"
        @keyup.escape="showGallery=false"
      ></i>
    </div>
    <div class="flex-container col-md-12 justify-content-center" v-if="listLoaded">
      <div v-for="(image, index) in imageList" class="image-box" :key="index">
        <img :src="streamImage(image.file_path)" @click="openGallery(index)" />
        <div class="more"></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { address } from "../../store/api";
export default {
  name: "ImageList",
  data() {
    return {
      showGallery: false,
      currentSrc: '',
      currentIndex: 0,
      imageList: [],
      listLoaded: false,
      targetImage: {},
      params: {},
    }
  },
  methods: {
    ...mapActions("image", ["imageToEdit", "allImages", "deleteImage"]),
    openGallery: function(index){
      this.currentIndex = index
      this.currentSrc = this.streamImage(this.imageList[this.currentIndex].file_path)
      this.showGallery = true
    },
    swipe: function(value){
      this.currentIndex += value
      if(this.currentIndex < 0) this.currentIndex = this.imageList.length - 1
      if(this.currentIndex >= this.imageList.length) this.currentIndex = 0
      this.currentSrc = this.streamImage(this.imageList[this.currentIndex].file_path)
    },
    streamImage: function(path) {
      console.log(path, "1");
      if (typeof path !== "undefined") {
        console.log(path, "2");
        let parts = path.split("/");
        let slug = parts[parts.length - 1];
        return address + "/api/v1/image/stream/" + slug;
      } else return "";
    },
  },
  computed: {
    ...mapGetters("image", ["images", "infoVisibility", "getImage"])
  },
  created(){
    this.allImages().then(result => {
      this.imageList = result.data.response
      this.listLoaded = true
    })
  }
};
</script>

<style scoped>

.image-list{
	position:realtive;
	border: 0px;
}
::-webkit-scrollbar {
    display: none;
}
.image-box{
	overflow: hidden;
	transition: 0.1s ease;
}

.image-box:hover{
    outline: none;
    box-shadow: 0 0 25px rgba(30,120,255,0.9);
	z-index: 100;
}


.flex-container {
	position:relative;
	display: flex;
	flex-wrap: wrap;
	padding: 0;
}
.flex-container > div > img {
	margin: 0;
	width: 320px;

	padding: 2px;
	transition: transform .5s ease;
}

.flex-container > div > img:hover {

	padding: 0;
	transform: scale(1.5);
	z-index: 100;
}

.fullscreen{
	height: 100%;
	width: 100%;
	background-color: rgba(10,10,10,0.9);
	z-index: 1000;
	position: fixed;
  top: 0px;
}


.close{
	position: absolute;
	right: 10px;
	top: 10px;
	color: rgba(240,240,240,0.3);
}

.gallery-btn:hover{
	color: rgba(240,240,240,0.9);
	cursor: pointer;
}

.arrow-left{
	position: absolute;
	left: 20px;
	top: 50%;
	transform: translate(0%,-50%);	
	color: rgba(240,240,240,0.5);
}

.arrow-right{
	position: absolute;
	right: 20px;
	top: 50%;
	transform: translate(0%,-50%);	
	color: rgba(240,240,240,0.5);
}

.fullscreen > img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%); 
	min-width: 30%;
	max-width: 95%!important;
	max-height: 95%!important;
	transition: 0.3s ease-in;
}
</style>