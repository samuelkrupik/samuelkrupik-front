import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
const VueScrollTo = require("vue-scrollto");

createApp(App).use(VueScrollTo).use(store).use(router).mount("#app");
