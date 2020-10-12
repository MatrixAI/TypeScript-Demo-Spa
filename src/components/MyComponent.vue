<template>
  <div class=data-style>
    {{ myData }}
    <div>
      <input v-model="inputData" />
      <button @click="setData">Set Data</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@typescript-demo-spa/store'
import { MutationTypes } from '@typescript-demo-spa/store/mutation-types'
import { ActionTypes } from '@typescript-demo-spa/store/action-types'

export default defineComponent({
  name: 'MyComponent',
  props: {
    myProp: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const store = useStore()

    const myData = computed(() => store.getters.data)
    const inputData = ref("")

    const setData = async () => {
      await store.dispatch(ActionTypes.SET_DATA, {data: inputData.value})
      inputData.value = ""
    }

    return {
      myData,
      setData,
      inputData
    }
  }

})
</script>

<style scoped>
.data-style {
  padding-top: 20px;
  font-family: "Lucida Console", Courier, monospace;
}
</style>
