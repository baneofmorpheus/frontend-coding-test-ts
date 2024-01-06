<template>
  <div
    class="flex mb-10 border-l-8 items-center justify-between rounded p-3 w-80 h-20"
    v-bind:class="{
      [`border-l-${toastStyle[toast.severity]}-500`]: true,
      [`bg-${toastStyle[toast.severity]}-400`]: true,
    }"
  >
    <div class="flex gap-x-6 text-gray-900">
      <div
        class="border-2 h-10 w-10 flex rounded-full justify-center items-center"
      >
        <span class="text-xl h-full"> &iexcl; </span>
      </div>
      <div class="text-left">
        <p>{{ toast.summary }}</p>
        <p>{{ toast.detail }}</p>
      </div>
    </div>

    <div class="cursor-pointer">
      <button class="text-2xl" v-on:click="handleCloseToast">&times;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ToastMessageType } from '../../types/toast'

const { toast } = defineProps<{
  toast: ToastMessageType
}>()
const emit = defineEmits(['closeToast'] as const)
const toastStyle = ref({
  error: 'red',
  success: 'green',
})

const handleCloseToast = () => {
  emit('closeToast')
}
</script>
