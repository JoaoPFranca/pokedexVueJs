<template>
  <v-container>
    <v-card>
      <v-container style="background-color: aquamarine;">
        <v-row>
            <v-col cols="4" v-for="pokemon in pokemonList" :key="pokemon.name">
              <v-card variant="outlined" style="background-color: aliceblue;">
                <v-container class="text-center">
                  <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + numeroDoPokemon(pokemon.url) + '.png'" id="imagem" style="width: 200px; text-align: center;" />
                  <h2 class="text-center">{{ pokemon.name }}</h2>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>

import axios from "axios";

export default {

  name: 'pokedexLogic',

  data() {
    return {
      pokemonList: [],
      url: null,
    };
  },

  methods: {
    numeroDoPokemon(url) {
      const splitUrl = url.split("/");
      const pokemonId = splitUrl[splitUrl.length - 2];
      return pokemonId;
    }

  },

  mounted() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=150").then((resp) => {
      this.pokemonList = resp.data.results

    });
  }
}


</script>

<style>

body {
  background-color: darkgrey;
}


</style>