import '@/style.css'
import { createApp } from 'vue'
import { pinia } from '@/store'
import App from '@/App.vue'
import vant from 'vant'
import router from '@/router/index';

const app = createApp(App)
app.use(pinia)
app.use(vant)
app.use(router)
app.mount('#app')
