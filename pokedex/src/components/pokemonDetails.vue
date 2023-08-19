<template>
  <div class="background-container">
    
    <v-btn @click="backToTheHomepage()" width="100px" height="50px" style="margin-left: 10em; margin-top: 5em;">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-container>
      <div style=" margin: 0; position: absolute; top: 43%; -ms-transform: translateY(-50%); transform: translateY(-50%);">
        <v-img :src="pokemonImageUrl" id="imagem" style="width: 400px; text-align: center;" />
      </div>

      <div style=" margin: 0; position: absolute; top: 11.5%; font-size: 28px; margin-left: 25em;">
        <h2>#{{ pokemonId }}</h2>
      </div>

      <div style=" margin: 0; position: absolute; top: 22%; font-size: 32px; margin-left: 20em;">
        <h2>{{ pokemonName }}</h2>
      </div>

      <div style=" margin: 0; position: absolute; top: 47%; font-size: 26px; margin-left: 30em;">
        <h2>{{ pokemonMove1 }}</h2>
      </div>

      <div style=" margin: 0; position: absolute; top: 55.5%; font-size: 26px; margin-left: 30em;">
        <h2>{{ pokemonMove2 }}</h2>
      </div>

      <div style="margin: 0; position: absolute; top: 76%; font-size: 24px; margin-left: 6em;">
        <h3>Type: {{ pokemonType }} </h3>
      </div>

      <div style="margin: 0; position: absolute; top: 84%; font-size: 20px; margin-left: 8em;">
        <h3> WT: {{ pokemonWeight/10 }}Kg HT: {{ pokemonHeight/10 }}m </h3>
      </div>

      <div style="margin: 0; position: absolute; top: 76.5%; font-size: 20px; margin-left: 34em;">
        <h4> Hp: {{ pokemonHp }}</h4> 
        <h4>Speed: {{ pokemonSpeed }}</h4> 
        <h4>Sp. Att: {{ pokemonSpecialAttack }}</h4>
      </div>

      <div style="margin: 0; position: absolute; top: 76.5%; font-size: 20px; margin-left: 43em;">
        <h4> Def: {{ pokemonDefense }}</h4> 
        <h4>Attack: {{ pokemonAttack }}</h4> 
        <h4>Sp. Def: {{ pokemonHpSpecialDefense }}</h4>
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
      pokemonHeight: null,
      pokemonWeight: null,
      pokemonType: null,
    };
  },

  methods: {
    extractPokemonIdFromUrl(url) {
      const parts = url.split("/");
      const pokemonId = parts[parts.length - 1];
      return pokemonId;
    },

    backToTheHomepage() {
      this.$router.push({ name: 'pokemonLogic', params: {id: this.pokemonId}})
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
        this.pokemonWeight = resp.data.weight
        this.pokemonHeight = resp.data.height

        this.pokemonType = resp.data.types[0].type.name.toUpperCase();

        this.pokemonHp = resp.data.stats[0].base_stat
        this.pokemonAttack = resp.data.stats[1].base_stat
        this.pokemonDefense = resp.data.stats[2].base_stat
        this.pokemonSpecialAttack = resp.data.stats[3].base_stat
        this.pokemonHpSpecialDefense = resp.data.stats[4].base_stat
        this.pokemonSpeed = resp.data.stats[5].base_stat
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

@font-face {
  font-family: PokemonFont;
  src: url("~@/assets/PKMN RBYGSC.ttf")
}

* {
  font-family: PokemonFont;
}
</style>