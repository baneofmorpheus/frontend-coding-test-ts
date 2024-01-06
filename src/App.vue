<template>
  <div
    class="min-w-full min-h-screen font-sans text-sm antialiased bg-gray-100 text-center"
  >
    <router-view v-on:add-notification="handleAddNotification"> </router-view>
    <div class="right-2.5 top-28 fixed">
      <Toast
        v-for="(toast, index) in toasts"
        v-bind:key="index"
        v-bind:toast="toast"
        v-on:close-toast="closeToast(index)"
      ></Toast>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import { ToastMessageType } from './types/toast'
import Toast from './components/notification/Toast.vue'

const toasts = ref<Array<ToastMessageType>>([])
const closeToast = (index: number) => {

  toasts.value.splice(index, 1)
}
const handleAddNotification = (toast: ToastMessageType) => {

  toasts.value.push(toast)
}
provide('toasts', toasts)
onMounted(() => {
  // toasts.value.push({
  //   severity: 'success',
  //   summary: 'Error2',
  //   detail: 'Api error detected',
  // })
  // toasts.value.push({
  //   severity: 'error',
  //   summary: 'Error1',
  //   detail: 'Api error detected',
  // })
  // toasts.value.push({
  //   severity: 'error',
  //   summary: 'Error3',
  //   detail: 'Api error detected',
  // })
  // toasts.value.push({
  //   severity: 'error',
  //   summary: 'Error4',
  //   detail: 'Api error detected',
  // })
  // toasts.value.push({
  //   severity: 'error',
  //   summary: 'Error5',
  //   detail: 'Api error detected',
  // })
})
</script>
