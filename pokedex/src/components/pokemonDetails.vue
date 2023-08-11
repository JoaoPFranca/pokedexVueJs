<template>
  <div class="background-container">
    <v-container>
      <div style=" margin: 0; position: absolute; top: 43%; -ms-transform: translateY(-50%); transform: translateY(-50%);">
        <v-img :src="pokemonImageUrl" id="imagem" style="width: 400px; text-align: center;" />
      </div>

      <div style=" margin: 0; position: absolute; top: 22%; font-size: 32px; margin-left: 24em;">
        <h2>{{ pokemonId }} - {{ pokemonName }}</h2>
      </div>

      <div style=" margin: 0; position: absolute; top: 47%; font-size: 28px; margin-left: 31em;">
        <h2>{{ pokemonMove1 }}</h2>
      </div>

      <div style=" margin: 0; position: absolute; top: 55.5%; font-size: 28px; margin-left: 31em;">
        <h2>{{ pokemonMove2 }}</h2>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pokemonId: null,
      pokemonImageUrl: null,
      pokemonName: null,
      pokemonMove1: null,
      pokemonMove2: null,
    };
  },

  methods: {
    extractPokemonIdFromUrl(url) {
      const parts = url.split("/");
      const pokemonId = parts[parts.length - 1];
      return pokemonId;
    },

    getPokemon () {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`).then((resp) => {
        this.pokemonName = resp.data.name.toUpperCase();
        if (resp.data.moves.length >= 1) {
          this.pokemonMove1 = resp.data.moves[0].move.name.toUpperCase();
        }
        if (resp.data.moves.length >= 2) {
          this.pokemonMove2 = resp.data.moves[1].move.name.toUpperCase();
        }
    });
    },
  },

  mounted() {
    const currentUrl = window.location.href;
    this.pokemonId = this.extractPokemonIdFromUrl(currentUrl);
    this.pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`;
    this.getPokemon();
  },
};
</script>

<style>
.background-container {
  background-image: url("D:\\pokedexSite\\pokedexVueJs\\pokedex\\src\\assets\\6rfofno9nb811.png");
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
}
</style>