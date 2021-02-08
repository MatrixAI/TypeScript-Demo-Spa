<template>
  <div>
    <Header />
    <p>In App Vue</p>
    <button @click="increment(1)">Clicked {{ count }} times.</button>
    <canvas id="pixi"></canvas>
    <router-view class="content" />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

import * as PIXI from 'pixi.js';

export default defineComponent({
  components: {
    Header,
    Footer
  },
  setup(props, context) {
    console.log('Setting up Demo App');
    const count = ref(0);
    const increment = (amount: number) => {
      count.value += amount
    };

    let type = "WebGL"
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas"
    }

    PIXI.utils.sayHello(type)

    let app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      // transparent: true,
    });
    app.renderer.backgroundColor = 0x061639;

    app.loader.add("./images/cat.png").load(setup);

    function setup() {
      let cat = new PIXI.Sprite(app.loader.resources["./images/cat.png"].texture)
      app.stage.addChild(cat)
    }

    document.body.appendChild(app.view);

    const displayPixi = () => {
      var canvas = document.getElementById('pixi') as HTMLCanvasElement;

      const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        // transparent: true,
        view: canvas,
      });

      let graphics = new PIXI.Graphics()
      graphics.lineStyle(8, 0xff0ff0);

      //start
      graphics.moveTo(300, 250)
      graphics.lineTo(500, 250)

      app.stage.addChild(graphics)
    }

    return {
      count,
      increment,
      displayPixi,
    }
  }
});
</script>

<style scoped>
.content {
  margin: 10px;
}
</style>
