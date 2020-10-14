import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  data(state: State): string;
};

export const getters: GetterTree<State, State> & Getters = {
  data: (state) => {
    return state.data;
  },
};
