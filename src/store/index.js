import Vue from 'vue'
import Vuex from 'vuex'
import users from "./modules/users";
import jobs from "./modules/jobs";
import inventory from "./modules/inventory"
import request from "@/store/modules/request";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    jobs,
    inventory,
    request
  },
})
