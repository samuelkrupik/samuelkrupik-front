import axios from "axios";
export default {
  namespaced: true,
  state: {
    tags: [],
  },
  getters: {
    rawTags(state) {
      return state.tags;
    },
    tags(state) {
      const tags = [
        {
          id: 0,
          name: "Všetky",
        },
      ];
      tags.push(...state.tags);
      return tags;
    },
  },
  mutations: {
    SET_DATA(state, payload) {
      state.tags = payload.data;
    },
  },
  actions: {
    async getTags({ commit }) {
      try {
        const response = await axios.get("/api/tags");
        commit("SET_DATA", response.data);
      } catch (e) {
        commit("SET_DATA", []);
      }
    },
  },
};
