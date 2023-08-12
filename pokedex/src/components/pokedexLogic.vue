<template >
  <v-container>
    <v-card>
      <v-row style="background-color: red; padding: 1em;">
        <v-col cols="6">
          <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
        </v-col>
        <v-col cols="4">
          <v-autocomplete v-model="chosenPokemon" :items="pokemonListForAutocomplete" item-text="name" item-value="url" variant="solo" label="Search by name"></v-autocomplete>
        </v-col>
        <v-col>
          <v-btn icon="mdi-magnify" style="margin-top: 0.4em;" @click="navigateToDetailsByAutoComplete(chosenPokemon)"></v-btn>
        </v-col>
      </v-row>
      <v-container style="background-color: aquamarine;">
        <v-row>
          <v-col cols="4" v-for="pokemon in this.displayedPokemon" :key="pokemon.name">
            <v-card variant="outlined" style="background-color: aliceblue;" @click="navigateToDetails(pokemon)">
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
      pokemonListForAutocomplete: [],
      url: null,
      currentPage: 1,
      itemsPerPage: 60,
      chosenPokemon: null,
      
    };
  },

  methods: {
    numeroDoPokemon(url) {
      const splitUrl = url.split("/");
      const pokemonId = splitUrl[splitUrl.length - 2];
      return pokemonId;
    },

    navigateToDetails(pokemon) {
      if(pokemon.url) {
        const pokemonId = this.numeroDoPokemon(pokemon.url);
        this.$router.push({ name: 'pokemonDetails', params: { id: pokemonId } });
      }
    },

    navigateToDetailsByAutoComplete(pokemonName) {
          const selectedPokemon = this.pokemonList.find(pokemon => pokemon.name === pokemonName);
          if (selectedPokemon) {
          const pokemonId = this.numeroDoPokemon(selectedPokemon.url);
          this.$router.push({ name: 'pokemonDetails', params: { id: pokemonId } });
      }
    },

  },

  computed: {
    totalPages() {
      return Math.ceil(this.pokemonList.length / this.itemsPerPage);
    },
    displayedPokemon() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.pokemonList.slice(startIndex, endIndex);
    },
  },

  mounted() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1010").then((resp) => {
      this.pokemonList = resp.data.results
      this.pokemonListForAutocomplete = resp.data.results.map(pokemon => pokemon.name);

    });
  }
}


</script>

<style>

</style>