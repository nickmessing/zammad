import { createRouter, createWebHistory } from 'vue-router'

import LayoutMain from '../components/layout/LayoutMain.vue'
import Authenticate from '../views/Authenticate.vue'
import Error from '../views/Error.vue'
import Home from '../views/Home.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/error',
      alias: '/:pathMatch(.*)*',
      name: 'Error',
      component: Error,
    },
    {
      path: '/',
      component: LayoutMain,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
        },
        {
          path: 'authenticate',
          name: 'Authenticate',
          component: Authenticate,
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Authenticate,
        },
      ],
    },
  ],
})
