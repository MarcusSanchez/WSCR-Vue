<script setup lang="ts">

import { ref } from 'vue';

const props = defineProps({ color: String, letter: String });
const color: ref<"Red" | "Blue" | "Green"> = ref(props.color);

</script>


<template>

  <div class="flex justify-center content-center Box" :class="color">
    <h1 class="">{{ letter }}</h1>
  </div>

</template>


<style scoped>

h1 {
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.2;
}

.Box {
  border: 2px black solid;
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
}

.Red {
  background-color: #f6afaf;
}

.Blue {
  background-color: #b3e6ff;
}

.Green {
  background-color: #a1d29d;
}
</style>