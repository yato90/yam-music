import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    library: [], // Массив для хранения треков в библиотеке
  },
  mutations: {
    addToLibrary(state, track) {
        state.library.push(track);
    },
    removeFromLibrary(state, index) {
        state.library.splice(index, 1);
    },
  },
  actions: {
    addTrackToLibrary({ commit }, track) {
        commit('addToLibrary', track);
    },
    removeTrackFromLibrary({ commit }, index) {
        commit('removeFromLibrary', index);
    },
  },
  plugins: [createPersistedState({
    paths: ['library'],
  })],
});

export default store;
