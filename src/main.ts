import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar, Notify } from "quasar";
import quasarLang from "quasar/lang/ru";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import "./assets/main.css";

const app = createApp(App);

app.use(Quasar, {
  plugins: { Notify }, // import Quasar plugins and add here
  lang: quasarLang,
});

app.use(router);

app.mount("#app");
