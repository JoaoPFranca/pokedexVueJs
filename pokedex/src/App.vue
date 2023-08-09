<template>
  <v-app>
    <v-main>
      <PokedexLogic/>
    </v-main>
  </v-app>
</template>

<script>

import PokedexLogic from './components/pokedexLogic.vue';

export default {
  name: 'App',

  components: {
    PokedexLogic,
},

  data: () => ({
    //
  }),
}
</script>
