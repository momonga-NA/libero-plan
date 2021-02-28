import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  // SessionStorageに保存
  plugins: [createPersistedState(
    {
      key: 'persistedstates',
      paths: ['planning','thumbnails'],
      storage: window.sessionStorage
    },
  )],
  state: {
    thumbnails: [],
    planning  : null
  },
  getters:{
    getThumbnails(state){
      return state.thumbnails;
    },
    isThumbnailsEmpty(state){
      return (state.thumbnails == null || state.thumbnails.length == 0);
    },
    getPlanning(state){
      return state.planning
    }
  },
  mutations: {
    setThumbnails(state, thumbnails){
      state.thumbnails = thumbnails;
    },
    addThumbnail(state, thumbnail){
      state.thumbnails.push(thumbnail)
    },
    setPlanning(state, planning){
      state.planning = planning
    },
    clearPlanning(state){
      state.planning = null
    }
  },
  actions: {
    setThumbnails({ commit }, thumbnails){
      commit('setThumbnails', thumbnails);
    },
    addThumbnail({ commit }, thumbnail){
      commit('addThumbnail', thumbnail)
    },
    setPlanning({ commit }, planning){
      commit('setPlanning', planning)
    },
    clearPlanning({ commit }){
      commit('clearPlanning')
    }
  }
});