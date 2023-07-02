<script setup lang="ts">

const props = defineProps({
  message: String,
});

</script>


<template>

  <div class="flex justify-center">
    <b class="Announcement">{{ message }}</b>
  </div>

</template>


<style scoped>

.Announcement {
  margin: 10px 0;
  padding: 0 5px;
  border-radius: 5px;
  background-color: #9a9a9a;
  border: 1px black solid;
}

</style>