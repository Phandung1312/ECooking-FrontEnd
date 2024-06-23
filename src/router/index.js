import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layouts/Layout.vue";
import Home from "../views/Home.vue";
import UploadFile from "../views/File/UploadFile.vue";
import ListFiles from "../views/File/ListFiles.vue";
import NotFound from "../views/NotFound.vue";
import UserLogin from "../views/login/UserLogin.vue";
import UserList from "../views/user/UserList.vue";
import ChangePassword from "../views/user/ChangePassword.vue"
import ListEvents from "../views/event/ListEvents.vue";
import ListCustomers from "../views/customer/ListCustomers.vue";
import UserProfile from "../views/user/UserProfile.vue"
import RecipeList from "../views/product/RecipeList.vue";
import ReportList from "../views/report/ReportList.vue";

const authUser = (to, from, next) => {
  const user = localStorage.getItem("user");
  if (user) next();
  else {
    next({ name: "UserLogin" });
    emitEvent("eventError", "You need to login !");
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/users",
      component: Layout,
      beforeEnter: authUser,
      children: [
        { path: "/users", component: UserList, name: "UserList" },
        { path: "/recipes", component: RecipeList, name: "RecipeList" },
        { path: "/reports", component: ReportList, name: "ReportList" },

      ],
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
      name: "NotFound",
    },
    {
      path: "/auth/login",
      component: UserLogin,
      name: "UserLogin",
    },
    {
      path: "/users/change-password",
      component: ChangePassword,
      name: "ChangePassword",
    },
  ],
});

export default router;