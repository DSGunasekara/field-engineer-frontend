import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

axios.defaults.baseURL = "https://field-engineer-backend.herokuapp.com/api";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  try {
    if (to.matched.some((record) => record.meta.requireAuth)) {
      if (!store.getters.isLoggedIn) {
        next({ name: "landing" });
      } else next();
    } else if (to.matched.some((record) => record.meta.requireVisitors)) {
      if (store.getters.isLoggedIn) {
        next({ name: "home" });
      } else next();
    }else if (to.matched.some((record) => record.meta.requireAdmin)) {
      if (store.getters.getProfile.role !== "Admin") {
        next({ name: "home" });
      } else next();
    }
    next();
  }catch (error){
    console.log(error)
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
