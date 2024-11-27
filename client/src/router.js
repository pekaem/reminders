import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/snoozed",
      name: "snoozed",
      component: () => import("./components/reminders/Snoozed.vue")
    },
    {
      path: "/inbox",
      name: "inbox",
      component: () => import("./components/reminders/Inbox.vue")
    },
    {
      path: "/done",
      name: "done",
      component: () => import("./components/reminders/Done.vue")
    },
    {
      path: "/shopping",
      name: "shopping",
      component: () => import("./components/shopping/Shopping.vue")
    }
  ]
});