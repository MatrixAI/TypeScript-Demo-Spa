<template>
  <div class="home">
    <img alt="Vue logo" style="width:150px;height150px;" src="../assets/matrix-logo.png" />
    <HelloWorld msg="Welcome to the TypeScript Demo Spa" />
    <User />
    <MyButton />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import User from "@/components/User.vue";
import MyButton from "@/components/MyButton.vue";

@Component({
  components: {
    HelloWorld,
    User,
    MyButton
  }
})
export default class Home extends Vue {}
</script>
