import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

axios.defaults.baseURL = "https://field-engineer-backend.herokuapp.com/api";
// axios.defaults.baseURL = "http://localhost:5000/api";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  try {
   if (to.matched.some((record) => record.meta.requireAuth)) {
      if (!store.getters.isLoggedIn) {
        next({ name: "landing" });
      } else next();
    } else if (to.matched.some((record) => record.meta.requireVisitors)) {
      if (store.getters.isLoggedIn) {
        next({ name: "profile" });
      } else next();
    }else if (to.matched.some((record) => record.meta.requireAdmin)) {
     if (!store.getters.isLoggedIn) {
       next({ name: "landing" });
     } else if (store.getters.getUserData.role !== "Admin") {
        next({ name: "home" });
      } else next();
    }else if (to.matched.some((record) => record.meta.requireCustomer)) {
     if (!store.getters.isLoggedIn) {
       next({ name: "landing" });
     } else if (store.getters.getUserData.role === "Customer") {
        next({ name: "profile" });
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
