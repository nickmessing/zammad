import { createRouter, createWebHistory } from 'vue-router'

import LayoutMain from '../components/layout/LayoutMain.vue'
import Error from '../views/Error.vue'
import Home from '../views/Home.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/error',
      alias: '/:pathMatch(.*)*',
      name: 'Error',
      props: true,
      component: Error,
    },
    {
      path: '/',
      props: true,
      component: LayoutMain,
      children: [
        {
          path: '/',
          name: 'Home',
          props: true,
          component: Home,
        },
      ],
    },
  ],
})
