import type {
  DataId,
  Data
} from '@typescript-demo-spa/resources/data';

import type {
  Async,
  PageId
} from '@typescript-demo-spa/types';

import * as resourceData from '@typescript-demo-spa/resources/data';
import { makeIdentifiers } from '@typescript-demo-spa/store/utils';
import hash from 'object-hash';

type Datas = {[key: number]: Async<Readonly<Data>>};
type DatasPages = {[key: string]: Async<Array<DataId>>};

const [actionsInt, actionsExt] = makeIdentifiers('data', [
  'FetchData',
  'FetchDatasPage'
]);

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
      state.datas[payload.id] = { type: 'Progress' };
    },
    [mutations.DataFetchSuccess] (
      state: State,
      payload: { id: DataId; data: Data }
    ) {
      state.datas[payload.id] = { type: 'Success', data: payload.data };
    },
    [mutations.DataFetchFail] (
      state: State,
      payload: { id: DataId; error: Error }
    ) {
      state.datas[payload.id] = { type: 'Fail', error: payload.error };
    },
    [mutations.DataPageFetch] (
      state: State,
      payload: {
        pageId: PageId;
      }
    ) {
      state.dataPages[payload.pageId] = { type: 'Progress' };
    },
    [mutations.DataPageFetchFail] (
      state: State,
      payload: {
        pageId: PageId;
        error: Error;
      }
    ) {
      state.dataPages[payload.pageId] = { type: 'Fail', error: payload.error }
    },
    [mutations.DataPageFetchSuccess] (
      state: State,
      payload: {
        pageId: PageId,
        data: Array<DataId>;
      }
    ) {
      console.log(payload.pageId)
      state.dataPages[payload.pageId] = { type: 'Success', data: payload.data }
    }
  }
};

export type {
  Datas,
};

export default datasModule;

export { actionsExt as actions };
