import { RouterView, createRouter, createWebHistory } from 'vue-router'

import ErrorPage from '@/components/pages/ErrorPage.vue'
import AuthenticationPage from '@/components/pages/main/AuthenticationPage.vue'
import HomePage from '@/components/pages/main/HomePage.vue'
import TicketPage from '@/components/pages/main/tickets/TicketPage.vue'
import TicketsPage from '@/components/pages/main/tickets/TicketsPage.vue'
import UserPage from '@/components/pages/main/UserPage.vue'
import MainPage from '@/components/pages/MainPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/error',
      alias: '/:pathMatch(.*)*',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/',
      component: MainPage,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomePage,
        },
        {
          path: 'authenticate',
          name: 'Authenticate',
          component: AuthenticationPage,
        },
        {
          path: 'users/:id',
          name: 'User',
          component: UserPage,
        },
        {
          path: 'tickets',
          component: RouterView,
          children: [
            {
              path: '',
              name: 'Tickets',
              component: TicketsPage,
            },
            {
              path: ':id',
              name: 'Ticket',
              component: TicketPage,
            },
          ],
        },
      ],
    },
  ],
})
