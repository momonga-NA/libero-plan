import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '@/views/Top.vue'
import Search from '@/views/Search'
import TripPlan from '@/views/TripPlan'
import Information from '@/views/Information'
import Disclaimer from '@/views/Disclaimer'
import PrivacyPolicy from '@/views/PrivacyPolicy'
import Planning from '@/views/Planning'
import Preview from '@/views/Preview'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/search',
    name: 'Search',
    component: Search

  },
  {
    path: '/trip_plan/:id',
    name: 'trip_plan',
    component: TripPlan
  },
  {
    path: '/information',
    name: 'information',
    component: Information
  },
  {
    path: '/information/disclaimer',
    name: 'disclaimer',
    component: Disclaimer
  },
  {
    path: '/information/privacy_policy',
    name: 'privacy-policy',
    component: PrivacyPolicy
  },
  {
    path: '/planning',
    name: 'planning',
    component: Planning
  },
  {
    path: '/planning/preview',
    name: 'preview',
    component: Preview
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
       return savedPosition
    } else {
       return { x: 0, y: 0 }
    }
  }
})

export default router
