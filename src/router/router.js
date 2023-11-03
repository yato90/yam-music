import { createRouter, createWebHistory } from 'vue-router';

import SearchPage from '../components/SearchPage.vue';
import LibraryPage from '../components/LibraryPage.vue';

const routes = [
  { path: '/search', component: SearchPage },
  { path: '/library', component: LibraryPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
