import axios from "axios";
import { createStore } from "vuex";
import auth from "./auth";
import projects from "./projects";
import tags from "./tags";

export default createStore({
  state: {},
  mutations: {},
  actions: {
    async csrfCookie() {
      return await axios.get("/sanctum/csrf-cookie");
    },
  },
  modules: {
    auth,
    projects,
    tags,
  },
});
