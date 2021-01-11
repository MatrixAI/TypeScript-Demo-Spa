import type {
  DataId,
  Data
} from '@typescript-demo-spa/resources/data';

import type {
  Async,
  ManagedResource,
  PageId
} from '@typescript-demo-spa/types';

import * as resourceData from '@typescript-demo-spa/resources/data';
import { makeIdentifiers, delay } from '@typescript-demo-spa/store/utils';
import { gcPages } from '@typescript-demo-spa/store/gc';
import hash from 'object-hash';

type Datas = {[key: number]: ManagedResource<Async<Readonly<Data>>>};
type DatasPages = {[key: string]: ManagedResource<Async<Array<DataId>>>};

const [actionsInt, actionsExt] = makeIdentifiers('data', [
  'FetchData',
  'FetchDatasPage'
]);

const [gettersInt, gettersExt] = makeIdentifiers('data', [
  'getDatas',
  'getDataPages'
])

enum mutations {
  DataFetch = 'DataFetch',
  DataFetchSuccess = 'DataFetchSuccess',
  DataFetchFail = 'DataFetchFail',
  DataPageFetch = 'DatasPageFetch',
  DataPageFetchSuccess = 'DataPageFetchSuccess',
  DataPageFetchFail = 'DataPageFetchFail'
}

type State = {
  datas: Datas;
  dataPages: DatasPages;
};

const state: State = {
  datas: {},
  dataPages: {},
};

const datasModule = {
  namespaced: true,
  state: state,
  getters: {
    [gettersInt.getDataPages]: (state: State) => ({pageId, cId}: {pageId: PageId, cId: string}) => {
      if (state.dataPages[pageId] == null) return;
      if (!gcPages[cId]) {
        gcPages[cId] = [() => { state.dataPages[pageId].refs -= 1 } ]
      } else {
        gcPages[cId].push(() => { state.dataPages[pageId].refs -= 1} )
      }
      state.dataPages[pageId].refs += 1;
      return state.dataPages[pageId].resource
    },
    [gettersInt.getDatas]: (state: State) => ({dataId, cId}: {dataId: DataId, cId: string}) => {
      console.log(dataId)
      if (!state.datas[dataId]) return;
      if (!gcPages[cId]) {
        gcPages[cId] = [() => {
          state.datas[dataId].refs -= 1
          console.log("dataId:", dataId)
        } ]
      } else {
        gcPages[cId].push(() => { state.datas[dataId].refs -= 1} )
      }
      state.datas[dataId].refs += 1
      return state.datas[dataId].resource
    }
  },
  actions: {
    async [actionsInt.FetchData] (
      { commit },
      payload: { id: DataId }
    ) {
      commit(mutations.DataFetch, { id: payload.id });
      let data;
      try {
        data = await resourceData.getData(payload.id);
      } catch (error) {
        commit(mutations.DataFetchFail, { id: payload.id, error: error });
        return;
      }
      commit(mutations.DataFetchSuccess, { id: payload.id, data: data });
    },
    async [actionsInt.FetchDatasPage] (
      { commit },
      payload: {
        pageId: PageId;
        limit: number;
      }
    ) {
      commit(mutations.DataPageFetch, { id: payload.pageId });
      const page: number[] = []
      for (let i = 1; i < payload.limit; i++) {
        page.push(i)
      }
      await delay(500);
      const datas: Array<Data> = await resourceData.getDatas(payload.limit)
      for (let data of datas) {
        commit(mutations.DataFetchSuccess, {
          id: data.thing,
          data: data
        })
      }
      commit(mutations.DataPageFetchSuccess, {
        pageId: payload.pageId,
        data: page,
      })
    }
  },
  mutations: {
    // datas collection
    [mutations.DataFetch] (
      state: State,
      payload: { id: DataId }
    ) {
      state.datas[payload.id] = {
        resource: { type: 'Progress' },
        refs: 0,
        cleanup: () => {
          state.datas[payload.id].resource = null;
        },
      };
    },
    [mutations.DataFetchSuccess] (
      state: State,
      payload: { id: DataId; data: Data }
    ) {
      // Register nullification here.
      state.datas[payload.id] = {
        resource: { type: 'Success', data: payload.data },
        refs: state.datas[payload.id]?.refs != null ? state.datas[payload.id].refs : 0,
        cleanup: state.datas[payload.id]?.cleanup != null ? state.datas[payload.id].cleanup : () => {
          state.datas[payload.id].resource = null;
        }
      }
    },
    [mutations.DataFetchFail] (
      state: State,
      payload: { id: DataId; error: Error }
    ) {
      state.datas[payload.id] = {
        resource: { type: 'Fail', error: payload.error },
        refs: state.datas[payload.id]?.refs != null ? state.datas[payload.id].refs : 0,
        cleanup: state.datas[payload.id]?.cleanup != null ? state.datas[payload.id].cleanup : () => {
          state.datas[payload.id].resource = null;
        }
      }
    },
    [mutations.DataPageFetch] (
      state: State,
      payload: {
        pageId: PageId;
      }
    ) {
      state.dataPages[payload.pageId] = {
        resource: { type: 'Progress' },
        refs: 0,
        cleanup: () => {
          state.dataPages[payload.pageId].resource = null;
        },
      };
    },
    [mutations.DataPageFetchFail] (
      state: State,
      payload: {
        pageId: PageId;
        error: Error;
      }
    ) {
      state.dataPages[payload.pageId] = {
        resource: { type: 'Fail', error: payload.error },
        refs: state.dataPages[payload.pageId]?.refs != null ? state.dataPages[payload.pageId].refs : 0,
        cleanup: state.dataPages[payload.pageId]?.cleanup != null ? state.dataPages[payload.pageId].cleanup : () => {
          state.datas[payload.pageId].resource = null;
        }
      }
    },
    [mutations.DataPageFetchSuccess] (
      state: State,
      payload: {
        pageId: PageId,
        data: Array<DataId>;
      }
    ) {
      state.dataPages[payload.pageId] = {
        resource: { type: 'Success', data: payload.data },
        refs: state.dataPages[payload.pageId]?.refs != null ? state.dataPages[payload.pageId].refs : 0,
        cleanup: state.dataPages[payload.pageId]?.cleanup != null ? state.dataPages[payload.pageId].cleanup : () => {
          state.datas[payload.pageId].resource = null;
        }
      }
    }
  }
};

export type {
  Datas,
};

export default datasModule;

export { actionsExt as actions, gettersExt as getters };
