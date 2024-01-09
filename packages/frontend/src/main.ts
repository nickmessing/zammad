import { DefaultApolloClient } from '@vue/apollo-composable'
import 'floating-vue/dist/style.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import { router } from '@/router'
import '@/styles/main.css'

import { apolloClient } from './apollo'

const pinia = createPinia()
const app = createApp(App)
app.provide(DefaultApolloClient, apolloClient)
app.use(pinia)
app.use(router)
app.mount('#app')
