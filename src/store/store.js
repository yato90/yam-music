import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    library: [], // Массив для хранения треков в библиотеке
    currentTrack: null,
  },
  mutations: {
    addToLibrary(state, track) {
      state.library.push(track);
    },
    removeFromLibrary(state, index) {
      state.library.splice(index, 1);
    },
    setCurrentTrack(state, track) {
      state.currentTrack = track; 
    },
  },
  actions: {
    addTrackToLibrary({ commit }, track) {
      commit('addToLibrary', track);
    },
    removeTrackFromLibrary({ commit }, index) {
      commit('removeFromLibrary', index);
    },
    setCurrentTrack({ commit }, track) {
      commit('setCurrentTrack', track);
    },
  },
  plugins: [createPersistedState({
    paths: ['library'],
  })],
});

export default store;
