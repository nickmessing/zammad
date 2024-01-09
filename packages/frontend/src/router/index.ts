import { defineComponent, h } from 'vue'
import { RouterView, createRouter, createWebHistory, useRoute } from 'vue-router'

import LayoutMain from '@/components/layout/LayoutMain.vue'
import Authenticate from '@/views/Authenticate.vue'
import Error from '@/views/Error.vue'
import Home from '@/views/Home.vue'
import Tickets from '@/views/tickets/Index.vue'
import Ticket from '@/views/tickets/Ticket.vue'
import User from '@/views/User.vue'

const JustRouter = defineComponent({
  name: 'JustRouter',
  setup() {
    const route = useRoute()
    console.log('setup running', route)
  },
  render: () => h(RouterView),
})

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
          path: 'users/:id',
          name: 'User',
          component: User,
        },
        {
          path: 'tickets',
          name: 'TicketsGroup',
          component: RouterView,
          children: [
            {
              path: '',
              name: 'Tickets',
              component: Tickets,
            },
            {
              path: ':id',
              name: 'Ticket',
              component: Ticket,
            },
          ],
        },
      ],
    },
  ],
})
