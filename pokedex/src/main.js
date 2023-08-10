import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createRouter, createWebHistory } from 'vue-router';

import pokedexLogic from './components/pokedexLogic.vue';
import pokemonDetails from './components/pokemonDetails.vue';

loadFonts();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: pokedexLogic },
    { path: '/pokemon/:id', name: 'pokemonDetails', component: pokemonDetails }
  ]
});

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app');


