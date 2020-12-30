import { createStore } from 'vuex';

import data from './data';
import gcModule from './gc';

const store = createStore({
  modules: {
    data,
    gcModule
  },
});

type Store = typeof store;

export type { Store };

export default store;
