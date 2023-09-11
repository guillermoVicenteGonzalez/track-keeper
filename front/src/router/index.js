// Composables
import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from "@/views/LandingPage.vue"
import Landing from "@/components/Landing.vue"
import SignUpV from "@/components/SignUp.vue"
import SignIn from "@/components/SignIn.vue"
import Home from "@/views/Home.vue"
import Verify from "@/components/Verify.vue"
import Catalogue from "@/views/Catalogue.vue"

const routes = [
  {
    path:'/',
    component:LandingPage,
    children:[
      {
        path:'/',
        component:Landing
      },
      {
        path:'signup',
        component:SignUpV
      },{
        path:'login',
        component:SignIn
      },{
        path:'verify',
        component:Verify
      }
    ]
  },{
    path:'/home/:id/',
    component:Home,
    children:[
      {
      path:'catalogue',
      name:'catalogue',
      component:Catalogue
      }

    ]
  }
]

/*
const routes = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path:'/signup',
    component: SignUpV
  }
]*/

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
