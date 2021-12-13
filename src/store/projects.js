import axios from "axios";
export default {
  namespaced: true,
  state: {
    project: {},
    latest: [],
    projects: [],
    links: [],
    meta: {},
  },
  getters: {
    canLoadMore(state) {
      return state.meta.current_page !== state.meta.last_page;
    },
    projects(state) {
      return state.projects.filter((project) => project.image != null);
    },
    latestProjects(state) {
      return state.latest.filter((project) => project.image != null);
    },
  },
  mutations: {
    SET_PROJECT(state, payload) {
      state.project = payload.data;
    },
    SET_LATEST(state, payload) {
      state.latest = payload.data;
    },
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
    async getLatestProjects({ commit }) {
      try {
        const response = await axios.get(
          "/api/projects/latest?conversions=preview"
        );
        commit("SET_LATEST", response.data);
      } catch (e) {
        commit("SET_LATEST", []);
      }
    },
    async getProjects({ commit }, params) {
      try {
        const response = await axios.get("/api/projects?conversions=preview", {
          params,
        });
        commit("SET_DATA", response.data);
      } catch (e) {
        commit("SET_DATA", []);
      }
    },
    async getProject({ commit }, { id, slug }) {
      try {
        const response = await axios.get(`/api/projects/${id}/${slug}`);
        commit("SET_PROJECT", response.data);
      } catch (e) {
        commit("SET_PROJECT", {});
      }
    },
    async getMoreProjects({ state, commit }, params) {
      if (state.meta.current_page === state.meta.last_page) {
        return;
      }
      try {
        const response = await axios.get(
          `/api/projects?conversions=preview&page=${
            state.meta.current_page + 1
          }`,
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
