import { createStore } from "vuex";
import auth from "./auth";
import projects from "./projects";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    projects,
  },
});
