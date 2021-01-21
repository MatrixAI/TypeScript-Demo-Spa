import { createWebHistory, createRouter } from 'vue-router';
import config from '@/config';
import Home from '@/pages/Home.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(config.basePath),
  routes,
});

export default router;
