import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    searchText: '',
    page: 1,
    pages: 0,
  },
  mutations: {
    setSearchText(state, payload: string) {
      state.searchText = payload;
    },
    changePage(state, payload: number) {
      state.page = payload;
    },
    setPages(state, payload: number) {
      state.pages = payload;
    },
    setImages(state, payload) {
      state.images = payload;
    },
  },
  actions: {

  },
});
