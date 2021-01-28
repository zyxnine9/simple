import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    component: () => import("@/views/Dashboard/Index"),
    children: [
      {
        path: '',
        component: () => import("../views/Dashboard/components/Personal")
      },
      {
        path: 'personal',
        component: () => import("../views/Dashboard/components/Personal")
      },
      {
        path: 'visithistory',
        component: () => import("../views/Dashboard/components/VisitHistory")
      },
      {
        path: 'verify',
        component: () => import("../views/Dashboard/components/Verify")
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
