import { createApp } from "vue";
import { Collapse } from "../node_modules/bootstrap/js/dist/collapse"; // eslint-disable-line no-unused-vars
import { Dropdown } from "../node_modules/bootstrap/js/dist/dropdown"; // eslint-disable-line no-unused-vars
import store from "./stores";
import router from "./router";
import VueGtag from "vue-gtag-next";
import {} from "./icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";

const debug = process.env.NODE_ENV !== "production";

createApp(App)
  .use(store)
  .use(router)
  .use(VueGtag, {
    property: {
      id: "G-M6XM24GCTX",
    },
    useDebugger: debug,
  })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
