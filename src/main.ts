import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router';
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill } from "oh-vue-icons/icons";

const app = createApp(App)

addIcons(FaFlag, RiZhihuFill);
app.use(createPinia())
app.use(router);
app.component("v-icon", OhVueIcon);
app.mount('#app')