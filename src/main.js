import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './main.css'
import { createPinia } from 'pinia'
import naive from 'naive-ui'

axios.defaults.withCredentials = false

const pinia = createPinia()

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router).use(pinia).use(naive).mount('#app')
