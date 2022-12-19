import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/confirm/email",
      name: "confirmEmail", 
      component: () => import("@/views/EmailConfirmationView.vue")
    },
    {
      path: "/account",
      name: "account",
      component: () => import("@/views/AccountView.vue"),
    },
    {
      path: "/test/:testId",
      name: "test",
      component: () => import("@/views/TestView.vue"),
    },
    {
      path: "/course/:courseId",
      name: "course",
      component: () => import("@/views/CourseView.vue"),
    },
    {
      path: "/course/section/:courseSectionId",
      name: "courseSection",
      component: () => import("@/views/CourseSectionView.vue"),
    },
  ],
});

export default router;
