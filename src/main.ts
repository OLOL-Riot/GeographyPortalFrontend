import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar, Notify, Dialog } from "quasar";
import quasarLang from "quasar/lang/ru";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import "./assets/main.scss";

const app = createApp(App);

app.use(Quasar, {
  plugins: { Notify, Dialog }, // import Quasar plugins and add here
  lang: quasarLang,
});

app.use(router);

app.mount("#app");
