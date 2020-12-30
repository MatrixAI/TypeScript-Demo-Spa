import { createApp } from 'vue';
import App from '@typescript-demo-spa/App.vue';
import store from './store';

const app = createApp(App);
app.use(store)
app.mount('#app');
