<template>
  <div class=root>
    <h1>Welcome to Typescript-Demo-Spa</h1>
    <button @click="increment(1)">Clicked {{ count }} times.</button>
    <div>
      <MyComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MyComponent from '@typescript-demo-spa/components/MyComponent.vue'

export default defineComponent({
  components: {
    MyComponent
  },
  setup(props, context) {
    const count = ref(0)

    const increment = (amount: number) => {
      count.value += amount
    }

    return {
      count,
      increment
    }
  }
});
</script>

<style scoped>
.root {
  font-family: "Lucida Console", Courier, monospace;
  font-size: 2em;
  text-align: center;
}
</style>
