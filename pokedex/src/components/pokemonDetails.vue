<template>
  <div class="background-container">
    <v-container>
      <div style="margin-top: 4em;">
        <img :src="pokemonImageUrl" id="imagem" style="width: 400px; text-align: center;" />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemonId: null,
      pokemonImageUrl: null,
    };
  },

  methods: {
    extractPokemonIdFromUrl(url) {
      const parts = url.split("/");
      const pokemonId = parts[parts.length - 1];
      return pokemonId;
    },
  },

  mounted() {
    const currentUrl = window.location.href;
    this.pokemonId = this.extractPokemonIdFromUrl(currentUrl);
    this.pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`;
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