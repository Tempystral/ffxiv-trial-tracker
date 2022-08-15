import { range } from "lodash";
import * as constants from "./ts/constants";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getExpansionData } from "./ts/data";

const Single = () => import("/pages/Single.vue");
const All = () => import("/pages/All.vue");
const NotFound = () => import("/pages/404.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: All,
    props: () => ({
      gamedata: {
        expansions: constants.expansions.map((x) => getExpansionData(x))
        // Load all expansions into an array for the main page
      }
    })
  },
  {
    path: "/ex/:exp",
    name: "Expansion",
    component: Single,
    props: (route) => ({
      exp: parseInt(route.params.exp as string),
      gamedata: getExpansionData(parseInt(route.params.exp as string))
    })
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
