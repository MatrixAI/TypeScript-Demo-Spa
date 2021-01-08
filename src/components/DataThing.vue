<template>
  <h3 v-if="data && data.type === 'Success'">{{ data.data.stuff }}</h3>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { actions as actionsData } from '@typescript-demo-spa/store/data';
import { actions as gc } from '@typescript-demo-spa/store/gc';

export default defineComponent({
  name: "DataThing",
  props: {
    dataId: {
      type: Number,
      required: true
    }
  },
  setup(props, context) {
    const dataId = props.dataId;
    const store = useStore()
    const state = store.state

    const data = computed(() => {
      return state.data.datas[dataId]
    })

    onMounted(() => {
      store.dispatch(
        gc.Increment, {
          gcIndex: { module: "data", state: "datas", identifiers: [dataId] },
          delete: () => { state.data.datas[dataId] = null }
        }
      )
    })

    onUnmounted(() => {
      store.dispatch(
        gc.Decrement, {
          gcIndex: { module: "data", state: "datas", identifiers: [dataId]}
        }
      )
    })

    return {
      dataId,
      data
    };
  }
})
</script>
