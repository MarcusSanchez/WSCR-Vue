<script setup lang="ts">
import WSCR from "./components/WSCR/WSCR.vue";
import Nav from "./components/Nav/Nav.vue";
import { ref } from 'vue';

const count: ref<number> = ref(0);
</script>

<template>
  <Nav />
  <WSCR />
</template>

<style scoped>
</style>
