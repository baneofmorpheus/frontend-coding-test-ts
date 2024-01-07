<template>
  <div class="w-full relative min-h-screen pt-10 pb-14 pl-2 pr-2">
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
    <div v-if="!isLoadingApiCall && characters.length < 1" class="text-center">
      <p>No characters to display</p>
    </div>

    <div v-if="isLoadingApiCall">Loading data...</div>

    <div
      v-if="!isLoadingApiCall"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <Character
        v-for="(singleCharacter, index) in characters"
        v-bind:key="index"
        v-bind:index="index"
        v-bind:single-character="singleCharacter"
        v-on:toggle-favourite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import axios from 'axios'
import { RickAndMortCharacterList } from '../types/favourites'
import errorHandler from '../helpers/errorHandler'
import Character from '../components/character/Character.vue'

const characters = ref<RickAndMortCharacterList>([])
const favouriteCharacters = ref<Array<boolean>>([])
const isLoadingApiCall = ref(false)
const nameFilter = ref('')
const emit = defineEmits(['addNotification'] as const)
provide('favouriteCharacters', favouriteCharacters)

const getCharacters = async () => {
  isLoadingApiCall.value = true
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?name=${nameFilter.value}`,
    )
    characters.value = response.data.results
    emit('addNotification', {
      severity: 'success',
      summary: 'Data retrieved',
      detail: 'Characters list has loaded successfully',
    })
  } catch (error: unknown) {
    const toastData = errorHandler(error)
    emit('addNotification', toastData)
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
