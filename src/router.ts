import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Single = () => import("/pages/Single.vue");
const All = () => import("/pages/All.vue");
const NotFound = () => import("/pages/404.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: All
  },
  {
    path: "/ex/:exp",
    name: "Expansion",
    component: Single,
    props: true
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  }
];
// Route with params for expansions instead?
// / -> All expansions | ?exp=x -> single expansions

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
