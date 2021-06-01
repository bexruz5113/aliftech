import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    staff: []
  },
  getters:{
    staff(state){
      return state.staff
    }
  },
  mutations: {
    SET_STAFF(state,payload){
      state.staff = payload
    }
  },
  actions: {
    getStaff({commit},payload){
      commit("SET_STAFF",payload)
    }
  },
});
