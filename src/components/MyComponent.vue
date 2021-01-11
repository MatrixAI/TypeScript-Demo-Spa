<template>
  <div class=data-style>
    <div v-if="!dataPage || dataPage.type === 'Progress'">Loading...</div>
    <ul v-if="dataPage && dataPage.type === 'Success' && show">
      <li v-for="data in dataPage.data" :key=data>
        <DataThing :dataId=data />
      </li>
    </ul>
    <button @click="test">
      test
    </button>
    <button @click="toggle">
      toggle
    </button>
    <button @click="wipe">
      wipe
    </button>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex';
import { actions as actionsData, getters as gettersData } from '@typescript-demo-spa/store/data';
import { actions as gc, cleanup } from '@typescript-demo-spa/store/gc';
import DataThing from './DataThing.vue';

export default defineComponent({
  name: 'MyComponent',
  components: {
    DataThing,
  },
  setup(props, context) {
    const cId = "mmmm"
    const store = useStore()
    const state = store.state

    const limit = 10;
    const pageId = "MyComponent"

    onMounted(async () => {
      await store.dispatch(
        actionsData.FetchDatasPage,
        {
          pageId: pageId,
          limit: limit
        }
      )
    })

    onUnmounted(() => {
      cleanup(cId)
    })

    const dataPage = computed(() => {
      return store.getters[gettersData.getDataPages]({pageId, cId})
    })

    const test = () => {
      console.log(state.data.datas)
    }

    const show = ref(true)

    const toggle = async () => {
      if (!show.value) {
        await store.dispatch(
          actionsData.FetchDatasPage,
          {
            pageId: pageId,
            limit: limit
          }
        )
      }
      show.value = !show.value
    }

    return {
      dataPage,
      test,
      toggle,
      show,
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
