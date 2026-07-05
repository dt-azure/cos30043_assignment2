import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css';

import { PulseLoader } from 'vue-spinner'
import 'vue-spinner/style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
app.component('PulseLoader', PulseLoader)