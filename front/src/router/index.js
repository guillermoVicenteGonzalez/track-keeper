// Composables
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "@/views/LandingPage.vue"
import SignUpV from "@/views/SignUpV"

const routes = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path:'/signup',
    component: SignUpV
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
