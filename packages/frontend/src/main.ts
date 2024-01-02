import { createApp } from 'vue'

import App from './App.vue'
import { initializeRouter } from './router'
import './styles/main.css'

const app = createApp(App)

initializeRouter(app)

app.mount('#app')
