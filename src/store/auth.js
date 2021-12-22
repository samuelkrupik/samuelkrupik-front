import axios from "axios";
export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: null,
    errors: null,
  },
  getters: {
    authenticated(state) {
      return state.authenticated;
    },

    user(state) {
      return state.user;
    },
    errors: (state) => (field) => {
      return state.errors ? state.errors[field] : null;
    },
    getFirstName(state) {
      return state.user.name.split(" ")[0];
    },
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },
    SET_USER(state, payload) {
      if (!payload) {
        state.user = null;
      } else {
        state.user = payload.data;
      }
    },
    SET_ERRORS(state, errors) {
      state.errors = errors;
    },
  },
  actions: {
    signIn({ dispatch, commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("login", credentials)
          .then(() => {
            resolve(dispatch("user"));
          })
          .catch((error) => {
            if ([422, 401].includes(error.response.status)) {
              commit("SET_ERRORS", error.response.data.errors);
              reject(error);
            }
          });
      });
    },
    signUp({ dispatch, commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("register", credentials)
          .then(() => {
            resolve(dispatch("user"));
          })
          .catch((error) => {
            if ([422, 401].includes(error.response.status)) {
              commit("SET_ERRORS", error.response.data.errors);
              reject(error);
            }
          });
      });
    },
    async signOut({ dispatch }) {
      await axios.post("/logout");

      return dispatch("user");
    },

    user({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api/user")
          .then((response) => {
            localStorage.setItem("authenticated", true);
            commit("SET_AUTHENTICATED", true);
            commit("SET_USER", response.data);
            commit("SET_ERRORS", null);
            resolve(response);
          })
          .catch((error) => {
            localStorage.setItem("authenticated", false);
            commit("SET_AUTHENTICATED", false);
            commit("SET_USER", null);
            commit("SET_ERRORS", error.response);
            reject(error);
          });
      });
    },
  },
};
