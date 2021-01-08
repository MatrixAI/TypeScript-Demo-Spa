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
  'Decrement',
  'Wipe'
]);

enum mutations {
  GCIncrement = 'GCIncrement',
  GCDecrement = 'GCDecrement',
  GCClear = 'GCClear',
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
      { commit, state },
      payload: {
        gcIndex: GCIndex;
        delete: () => void;
      }
    ) {
      commit(mutations.GCIncrement, { gcIndex: payload.gcIndex, delete: payload.delete });
    },
    async [actionsInt.Decrement] (
      { commit, state },
      payload: {
        gcIndex: GCIndex,
        delete: () => void
      }
    ) {
      commit(mutations.GCDecrement, { gcIndex: payload.gcIndex, delete: payload.delete });
    },
    async [actionsInt.Wipe] (
      { commit, state }
    ) {
      Object.keys(state.gcStore).forEach(key => {
        if (state.gcStore[key].references <= 0) {
          commit(mutations.GCClear, key)
        }
      })
    }
  },
  mutations: {
    // datas collection
    [mutations.GCIncrement] (
      state: State,
      payload: { gcIndex: GCIndex, delete: () => void }
    ) {
      const index = hash(payload.gcIndex)
      if (!state.gcStore[index]) {
        state.gcStore[index] = {
          references: 1,
          delete: payload.delete
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
      payload: { gcIndex: GCIndex, delete: () => void }
    ) {
      const index = hash(payload.gcIndex)
      if (!state.gcStore[index] || state.gcStore[index].references < 0) {
        state.gcStore[index] = {
          references: 0,
          delete: payload.delete
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
    [mutations.GCClear] (
      state: State,
      gcHash: string
    ) {
      state.gcStore[gcHash].delete()
    }
  }
};

export type {
  GCStore,
};

export default gcModule;

export { actionsExt as actions };
