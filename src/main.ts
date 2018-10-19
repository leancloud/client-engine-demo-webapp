import Vue from "vue";
import App from "./App.vue";
import { play } from "@leancloud/play";

// For debug purpose only
Object.assign(window, { play });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
