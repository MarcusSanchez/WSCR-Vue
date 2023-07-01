<script setup lang="ts">

import { ref } from 'vue';

const count = ref(0);

</script>

<template>
  <div class="flex justify-center items-center min-h-screen flex-col">
    <button @click="count++" class="border-2 border-black p-1 ">Increment</button>
    <h3>count is: {{ count }}</h3>
  </div>
</template>

<style scoped>
</style>
