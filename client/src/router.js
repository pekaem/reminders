import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/snoozed",
      name: "snoozed",
      component: () => import("./components/Snoozed.vue")
    },
    {
      path: "/inbox",
      name: "inbox",
      component: () => import("./components/Inbox.vue")
    },
    {
      path: "/done",
      name: "done",
      component: () => import("./components/Done.vue")
    }
  ]
});