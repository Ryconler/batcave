import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { appStore as store } from './store'
import '@/assets/css/normalize.scss'

createApp(App).use(store).use(router).mount('#app')
