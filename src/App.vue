<template>
  <div class=sansserif>
    <h1>Welcome to Typescript-Demo-Spa</h1>
    <button @click="increase(1)">Clicked {{ count }} times.</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {
      count: 0
    }
  },

  methods: {
    increase(increment: number) {
      this.count += increment;
    }
  }
});
</script>

<style scoped>
div {
  font-size: 2em;
  text-align: center;
}
.sansserif {
  font-family: "Lucida Console", Courier, monospace;
}
</style>
