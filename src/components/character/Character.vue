<template>
  <div class="shadow-lg rounded-lg">
    <div>
      <img
        v-bind:alt="singleCharacter.name"
        v-bind:src="singleCharacter.image"
        class="w-full h-auto"
      />

      <div class="text-left p-2 text-xs lg:text-sm">
        <div class="mb-2">
          <button type="button" class="text-2xl" v-on:click="toggleFavorite">
            <span v-if="favouriteCharacters[index]" class="text-red-600">
              &hearts;
            </span>
            <span v-if="!favouriteCharacters[index]" class="hover:text-red-600">
              &#x2661;
            </span>
          </button>
        </div>
        <h4 class="mb-2">Character Name - {{ singleCharacter.name }}</h4>
        <p class="mb-2">Status - {{ singleCharacter.status }}</p>
        <p class="mb-2">Species - {{ singleCharacter.species }}</p>
        <p class="mb-2">Gender -{{ singleCharacter.gender }}</p>
        <p class="mb-2">Origin - {{ singleCharacter.origin.name }}</p>
        <p class="mb-2">Location - {{ singleCharacter.location.name }}</p>
        <p class="mb-2">
          No of Episodes Featured - {{ singleCharacter.episode.length }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { RickAndMortyCharacter } from '../../types/favourites'

const { index } = defineProps<{
  index: number
  singleCharacter: RickAndMortyCharacter
}>()
const emit = defineEmits(['toggleFavourite'] as const)

const favouriteCharacters: Array<boolean> = inject('favouriteCharacters') || []

const toggleFavorite = () => {
  emit('toggleFavourite', index)
}
</script>
