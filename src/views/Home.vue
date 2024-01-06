<template>
  <div class="w-full min-h-screen pt-10 pb-14 pl-2 pr-2">
    <div v-if="!isLoadingApiCall && characters.length < 1" class="text-center">
      <p>No characters to display</p>
    </div>

    <div class="flex justify-between rounded p-3 bg-red-400 w-60">
      <div class="flex gap-x-4">
        <div>Icon</div>
        <div class="text-left">
          <p>Info</p>
          <p>Message Content</p>
        </div>
      </div>

      <div>
        <p>&times;</p>
      </div>
    </div>

    <div class="mb-4">
      <div
        class="w-full lg:w-3/4 ml-auto mr-auto mb-2 flex justify-center items-stretch"
      >
        <input
          v-model="nameFilter"
          class="border-gray-400 border-2 w-3/4 md:w-2/4 rounded-r-none border-r-0 text-sm rounded-lg"
          type="search"
          placeholder=" Search by name"
          v-on:change="handleInputChange"
          v-on:keydown.enter="handleNameFilterSubmit"
        />
        <button
          class="bg-gray-600 rounded-r-lg text-sm text-white pl-4 pr-4 pt-2 pb-2"
          type="button"
          v-on:click="getCharacters"
        >
          Search
        </button>
      </div>
      <p class="text-center text-xs text-gray-500">
        Clear the search field and click the search button to reset filter
      </p>
    </div>

    <div v-if="isLoadingApiCall">Loading data...</div>

    <div
      v-if="!isLoadingApiCall"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="(singleCharacter, index) in characters"
        v-bind:key="index"
        class="shadow-lg rounded-lg"
      >
        <div>
          <img
            v-bind:alt="singleCharacter.name"
            v-bind:src="singleCharacter.image"
            class="w-full h-auto"
          />

          <div class="text-left p-2 text-xs lg:text-sm">
            <div class="mb-2">
              <button
                type="button"
                class="text-2xl"
                v-on:click="toggleFavorite(index)"
              >
                <span v-if="favouriteCharacters[index]" class="text-red-600">
                  &hearts;
                </span>
                <span
                  v-if="!favouriteCharacters[index]"
                  class="hover:text-red-600"
                >
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { RickAndMortCharacterList } from '../types/favourites'

const characters = ref<RickAndMortCharacterList>([])
const favouriteCharacters = ref<Array<boolean>>([])
const isLoadingApiCall = ref(false)
const nameFilter = ref('')

const getCharacters = async () => {
  isLoadingApiCall.value = true
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?name=${nameFilter.value}`,
    )
    characters.value = response.data.results
  } catch (error: any) {
    console.log(error)

  }
  isLoadingApiCall.value = false
}

const toggleFavorite = (characterIndex: number) => {
  const favoritesClone = [...favouriteCharacters.value]
  if (favoritesClone[characterIndex]) {
    delete favoritesClone[characterIndex]
  } else {
    favoritesClone[characterIndex] = true
  }
  favouriteCharacters.value = favoritesClone
}
const handleInputChange = (event: Event) => {
  nameFilter.value = (event.target as HTMLInputElement).value
}
const handleNameFilterSubmit = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    getCharacters()
  }
}

onMounted(() => {
  getCharacters()
})
</script>
