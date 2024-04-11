import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        authRequired: false
      }
    },
    {
      path: '/meetup/:id',
      name: 'meetup-id',
      component: () => import('@/views/MeetupView.vue'),
      meta: {
        authRequired: true
      }
    },

    {
      path: '/new-meetup',
      name: 'new-meetup',
      component: () => import('@/views/NewMeetupView.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SigninView.vue'),
      meta: {
        authRequired: false
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
      meta: {
        authRequired: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        authRequired: false
      }
    }
  ]
})

export default router
