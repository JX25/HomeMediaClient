<template>
  <div class="fullscreen" ref="box">
    <vue-p5 
    @setup="setup"
    @draw="draw"
    v-if="state == 'logout'"
    class="logout"
    >
      <h1>Home Media Center</h1>
      <h2>Konto zostało wylogowane</h2>
    </vue-p5>
    <vue-p5
    @setup="setup"
    @draw="draw"   
    @resize="setup" 
     class="login" v-else-if="state == 'login'">
      <h1>Home Media Center</h1>
      <h2>Zalogowano na konto: </h2>
      <h2>Korzystaj z następujących treści</h2>
      <div>
        <div><p>Materiały wideo</p></div>
        <div><p>Materiały audio</p></div>
        <div><p>Materiały graficzne</p></div>
      </div>
    </vue-p5>
    <vue-p5 
    @setup="setup"
    @draw="draw"
    class="home-page" v-else>
        <h1>Home Media Center</h1>
        <h2>Zaloguj się, aby korzystać z dostępnych materiałów</h2>
    </vue-p5>
    </div>
</template>

<script>
import VueP5 from "vue-p5"
import { mapGetters } from 'vuex'
export default {
    name: 'Home',
    components:{
      'vue-p5': VueP5,
    },
    data() {
      return {
        state: this.$route.query.state,
        particles: [],
        particlesLength: 0,
      }
    },
    mounted(){

    },
    beforeDestroy: function(){

    },
    methods: {
      setup: function(){
        
      },
      draw: function(){

      },
    },
    computed: {
      ...mapGetters("user",["user"])
    },
   created() {
   },
/*
import p5 from 'vue-p5'

class Particles {

    constructor(width, height){
        this.width = width
        this.height = height
        this.pos = p5.createVector(Math.random(width), Math.random(height))
        this.vel = p5.createVector(Math.random(-2,2), Math.random(-2,2))
        this.size = 5
    }

    update(){
        this.pos.add(this.vel)
        this.edges()
    }
    draw(){
        p5.noStroke()
        p5.fill('rgba(255,255,255,0.6');
        p5.circle(this.pos.x, this.pos.y, this.size*5)
    }
    edges(){
        if(this.pos.x<0 || this.pos.x > this.width){
            this.vel.x *= -1
        }
        if(this.pos.y<0 || this.pos.y > this.height){
            this.vel.y *= -1
        }
    }

    checkParticles(particles){
        particles.forEach(particle => {
            const d = p5.dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            if(d <= 100){
                const alpha = p5.map(d, 0, 100, 0, 0.25)
                p5.stroke(`rgba(255,255,255, ${alpha})`)
                p5.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            }
        })
    }
}

export default Particles
*/
}
</script>

<style scoped>
h1, h2, p{
  color: white;
  z-index: 2;
}

.fullscreen{
  max-width: 100vh;
  min-height: 90vh;
  max-height: 100vh;
}

.logout{
   width: 100vh;
  height: 100vh; 
}
.login{
  width: 100vh;
  height: 100vh;
}
.home-page{
  width: 100vh;
  height: 100vh;
}
</style>