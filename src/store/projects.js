import axios from "axios";
export default {
  namespaced: true,
  state: {
    projects: [],
    links: [],
    meta: {},
  },
  getters: {
    projects(state) {
      return state.projects.data;
    },
  },
  mutations: {
    SET_DATA(state, payload) {
      state.projects = payload.data;
      state.links = payload.links;
      state.meta = payload.meta;
    },
    APPEND_DATA(state, payload) {
      state.projects.push(...payload.data);
      state.links = payload.links;
      state.meta = payload.meta;
    },
  },
  actions: {
    async getProjects({ commit }, params) {
      try {
        const response = await axios.get("/api/projects", { params });
        commit("SET_DATA", response.data);
      } catch (e) {
        commit("SET_DATA", []);
      }
    },
    async loadMore({ state, commit }, params) {
      if (state.meta.current_page === state.meta.last_page) {
        return;
      }
      try {
        const response = await axios.get(
          `/api/projects?page=${state.meta.current_page + 1}`,
          { params }
        );
        commit("APPEND_DATA", response.data);
      } catch (e) {
        console.error(e);
        //commit("APPEND_DATA", []);
      }
    },
  },
};
