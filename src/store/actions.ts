import { ActionTypes } from './action-types';
import { State } from './state';
import { ActionTree, ActionContext } from 'vuex';
import { Mutations } from './mutations';
import { MutationTypes } from './mutation-types';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.SET_DATA]({ commit }: AugmentedActionContext, payload: { data: string }): Promise<string>;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.SET_DATA]({ commit }, payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit(MutationTypes.SET_DATA, payload);
        resolve(payload.data);
      }, 500);
    });
  },
};
