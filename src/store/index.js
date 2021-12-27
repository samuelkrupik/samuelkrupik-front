import axios from "axios";
import { createStore } from "vuex";
import auth from "./auth";
import projects from "./projects";
import tags from "./tags";

export default createStore({
  state: {
    errors: null,
  },
  mutations: {
    SET_ERRORS(state, errors) {
      state.errors = errors;
    },
  },
  getters: {
    errors: (state) => (field) => {
      return state.errors ? state.errors[field] : null;
    },
  },
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
