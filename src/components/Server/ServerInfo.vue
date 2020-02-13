<template>
  <div class="server-stats">
    <center>
      <h3>Statystyki serwera</h3>
    </center>
    <div class="cpu">
      <div class="main-cpu-usage">
        CPU:
        <b>{{cpu.cpuInfo.brand}}</b>@
        <b>{{cpu.cpuInfo.speed}}GHz</b>
        <vue-easy-pie-chart :percent="cpu.current.load*100">
          <label for>CPU {{round(cpu.current.load*100)}}%</label>
        </vue-easy-pie-chart>
      </div>
      <center>
        <h3>Obciążenie poszczególnych rdzeni</h3>
      </center>
      <center>
      <div class="col-md6 cpu-core-usage">
        <vue-easy-pie-chart
          v-for="(cpu, index) in cpu.current.cpus"
          :percent="cpu"
          :key="index"
          class="core"
        >
        
          <small>#{{index}} Core: {{round(cpu)}}%</small>
        </vue-easy-pie-chart>
      </div>
      </center>
    </div>
    <center>
      <h3>Zajętość dysku twardego</h3>
    </center>
    <div class="disk" v-if="disk.audio.total == disk.image.total">
      {{round(disk.audio.total/1024**3-disk.audio.free/1024**3)}}GB / {{round(disk.audio.total/1024**3)}}GB
      <vue-easy-pie-chart :percent="(disk.audio.total-disk.audio.free)/disk.audio.total*100">
        <small>Dysk {{round((disk.audio.total-disk.audio.free)/disk.audio.total*100)}}%</small>
      </vue-easy-pie-chart>
    </div>

    <div class="disk" v-else>
      <vue-easy-pie-chart
        v-for="(disk, index) in disk"
        :key="index"
        :percent="disk.used/disk.total*100"
      ></vue-easy-pie-chart>
    </div>
    <center>
      <h3>Zajętość pamięci RAM serwera</h3>
    </center>
    <div class="mem">
      {{round(memory.used/1024**2)}}MB / {{round(memory.total/1024**2)}}MB
      <vue-easy-pie-chart :percent="memory.used/memory.total*100">
        <small>RAM {{round(memory.used/memory.total*100)}}%</small>
      </vue-easy-pie-chart>
    </div>
    <div class="net"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueEasyPieChart from "vue-easy-pie-chart";
import "vue-easy-pie-chart/dist/vue-easy-pie-chart.css";
export default {
  name: "ServerInfo",
  data() {
    return {
      update: ""
    };
  },
  components: {
    VueEasyPieChart
  },
  methods: {
    ...mapActions("server", ["loadData"]),
    round: function(value) {
      return Math.floor(value);
    },
    updateData: function() {
      this.update = setInterval(() => {
        this.loadData();
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.update);
  },
  computed: {
    ...mapGetters("server", ["memory", "disk", "cpu", "network"])
  },
  created() {
    this.updateData();
    /*setInterval(function(){
            this.loadData().then(result =>{
                console.log(result)
            })
        }, 5000)*/
  }
};
</script>

<style scoped>
.server-stats {
  top: 5em;
  width: 100vw;
  height:fit-content;
  min-height: 50vw;
  display: row;
  text-align: left;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  background-color: rgba(240, 240, 240);
}
center {
  padding: 20px;
  top: 2em;
}
.main-cpu-usage {
    text-align: center!important;
}
.cpu-core-usage {
  position: relative;
   display: flex;
  flex-flow: row wrap;
  height: fit-content;
  width: fit-content;
}
.core {
  padding: 5px;
}
.disk {
  text-align: center !important;
  position: realtive;
  text-align: left;
}
.mem {
  text-align: center !important;
  position: realtive;
  left: 0;
  text-align: left;
}

@media (max-width: 768px){
 .cpu-core-usage{
   left:0;
   transform: none;
 }
}
</style>