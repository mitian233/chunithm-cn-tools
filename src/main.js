import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' //ここを追加する

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

createApp(App)
    .use(router)
    .use(vuetify)
    .component('EasyDataTable', Vue3EasyDataTable)
    .mount('#app')
