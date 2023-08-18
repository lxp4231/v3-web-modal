import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
import router from '@/router/index';
import App from './App.vue';
import 'element-plus/dist/index.css';
import 'virtual:windi.css';
// import 'virtual:windi-devtools';
import '@/assets/styles/index.scss';
import plugins from '@/plugins';

const store = createPinia().use(piniaPluginPersist);

const i18n = createI18n({
  locale: 'en',
  messages,
});

const app = createApp(App);

app.use(router).use(store).use(i18n).use(plugins);

app.mount('#app');
