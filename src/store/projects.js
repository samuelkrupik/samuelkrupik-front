import axios from "axios";
export default {
  namespaced: true,
  state: {
    project: {},
    latest: [],
    projects: [],
    links: [],
    meta: {},
    errors: null,
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
    createProject({ dispatch, commit }, params) {
      return new Promise((resolve, reject) => {
        axios
          .post("api/projects", params)
          .then((response) => {
            commit("SET_ERRORS", null, { root: true });
            dispatch("getProjects");
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            commit("SET_ERRORS", error.response.data.errors, { root: true });
          });
      });
    },
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
