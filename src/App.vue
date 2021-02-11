<template>
  <div>
    <Header />
    <p>In App Vue</p>
    <button @click="increment(1)">Clicked {{ count }} times.</button>
    <router-view class="content" />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    console.log('Setting up Demo App');
    const count = ref(0);
    const increment = (amount: number) => {
      count.value += amount;
    };
    return {
      count,
      increment,
    };
  },
});
</script>

<style scoped>
.content {
  margin: 10px;
}
</style>
