import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' //ここを追加する
import './main.css'
import { createPinia } from 'pinia'

axios.defaults.withCredentials = false

// Use Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Use Vue3EasyDataTable
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        iconfont: 'mdi',
    },
})

const pinia = createPinia()

let app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router)
    .use(pinia)
    .use(vuetify)
    .component('EasyDataTable', Vue3EasyDataTable)
    .mount('#app')
