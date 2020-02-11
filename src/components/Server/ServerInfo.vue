<template>
  <div class="server-stats">
    <div class="cpu">
      <div class="main-cpu-usage">
        CPU:
        <b>{{cpu.cpuInfo.brand}}</b>@
        <b>{{cpu.cpuInfo.speed}}GHz</b>
        <vue-easy-pie-chart :percent="cpu.current.load*100">
          <label for>CPU {{round(cpu.current.load*100)}}%</label>
        </vue-easy-pie-chart>
      </div>
      <div class="col-md6 cpu-core-usage">
        <vue-easy-pie-chart v-for="(cpu, index) in cpu.current.cpus" :percent="cpu" :key="index" class="core">
          <small>#{{index}} Core: {{round(cpu)}}%</small>
        </vue-easy-pie-chart>
      </div>
    </div>
    <div class="disk" v-if="disk.audio.total == disk.image.total">
      Zajęte {{round(disk.audio.total/1024**3-disk.audio.free/1024**3)}}GB z {{round(disk.audio.total/1024**3)}}GB
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
    <div class="mem">
      Zajęte {{round(memory.used/1024**2)}}MB z {{round(memory.total/1024**2)}}MB
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
  width: 100vh;
  height: 100vh;
  display: row;
  text-align: center;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
.main-cpu-usage {
  max-width: 100vh;
}
.cpu-core-usage{
    display: flex;
  flex-flow: row wrap;
}
.core{
 padding: 5px;
 
}
</style>