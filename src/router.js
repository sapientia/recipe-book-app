import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/recipes",
    name: "recipes",
    component: () => import("./components/DisplayRecipe")
  },
  {
    path: "/recipes/:id",
    name: "detailRecipe",
    component: () => import("./components/DetailRecipe"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddRecipe")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;