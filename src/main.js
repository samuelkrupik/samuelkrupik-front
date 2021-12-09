import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import api from "./services/api";
import clickOutside from "./services/click-outside";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://samuelkrupik.test:8080";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";

const VueScrollTo = require("vue-scrollto");

const app = createApp(App);

store.dispatch("auth/user");

app.config.globalProperties.$api = api;
app
  .directive("click-outside", clickOutside)
  .use(VueScrollTo)
  .use(store)
  .use(router)
  .mount("#app");
