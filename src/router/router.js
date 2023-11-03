import { createRouter, createWebHistory } from 'vue-router';

import SearchPage from '../view/SearchPage.vue';
import LibraryPage from '../view/LibraryPage.vue';
import HomePage from '../view/HomePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/search', component: SearchPage },
  { path: '/library', component: LibraryPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
