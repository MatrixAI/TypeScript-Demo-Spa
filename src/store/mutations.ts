import { MutationTypes } from './mutation-types';
import { MutationTree } from 'vuex';
import { State } from './state';

export type Mutations<S = State> = {
  [MutationTypes.SET_DATA](state: S, payload: { data: string }): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_DATA](state, payload) {
    state.data = payload.data;
  },
};
