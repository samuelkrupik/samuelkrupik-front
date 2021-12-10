import { createStore } from "vuex";
import auth from "./auth";
import projects from "./projects";
import tags from "./tags";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    projects,
    tags,
  },
});
