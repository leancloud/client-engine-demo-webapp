import Vue from "vue";
import App from "./App.vue";
import { play } from "@leancloud/play";
import { APP_ID, APP_KEY, REGION } from "./configs";

// For debug purpose only
Object.assign(window, { play });

play.init({
  appId: APP_ID,
  appKey: APP_KEY,
  region: REGION
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
