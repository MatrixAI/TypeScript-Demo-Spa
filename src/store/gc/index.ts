import type {
  GCIndex,
  GCCount
} from '@typescript-demo-spa/resources/gc';

import * as resourceData from '@typescript-demo-spa/resources/data';
import { makeIdentifiers } from '@typescript-demo-spa/store/utils';
import hash from 'object-hash';

type GCStore = {[key: string]: GCCount};

const [actionsInt, actionsExt] = makeIdentifiers('gcModule', [
  'Increment',
  'Decrement'
]);

enum mutations {
  GCIncrement = 'GCIncrement',
  GCDecrement = 'GCDecrement',
}

type State = {
  gcStore: GCStore;
};

const state: State = {
  gcStore: {},
};

const gcModule = {
  namespaced: true,
  state: state,
  actions: {
    async [actionsInt.Increment] (
      { commit },
      payload: { gcIndex: GCIndex }
    ) {
      commit(mutations.GCIncrement, { gcIndex: payload.gcIndex });
    },
    async [actionsInt.Decrement] (
      { commit },
      payload: { gcIndex: GCIndex }
    ) {
      commit(mutations.GCDecrement, { gcIndex: payload.gcIndex });
    }
  },
  mutations: {
    // datas collection
    [mutations.GCIncrement] (
      state: State,
      payload: { gcIndex: GCIndex }
    ) {
      const index = hash(payload.gcIndex)
      if (!state.gcStore[index]) {
        state.gcStore[index] = {
          references: 1,
          delete: () => 5
        }
      } else {
        const previous = state.gcStore[index].references;
        const del = state.gcStore[index].delete;
        state.gcStore[index] = {
          references: previous+1,
          delete: del
        }
      };
    },
    [mutations.GCDecrement] (
      state: State,
      payload: { gcIndex: GCIndex }
    ) {
      const index = hash(payload.gcIndex)
      if (!state.gcStore[index]) {
        state.gcStore[index] = {
          references: 0,
          delete: () => 5
        }
      } else {
        const previous = state.gcStore[index].references;
        const del = state.gcStore[index].delete;
        state.gcStore[index] = {
          references: previous-1,
          delete: del
        }
      };
    },
  }
};

export type {
  GCStore,
};

export default gcModule;

export { actionsExt as actions };
