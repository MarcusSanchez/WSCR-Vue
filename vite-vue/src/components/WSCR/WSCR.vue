<script setup lang="ts">

import { ref } from 'vue';
import Joiner from "./Joiner/Joiner.vue";
import Room from "./Room/Room.vue";

const name = ref('');
const room = ref('');
const isJoined = ref(false);

function handleJoinerResponse(response: object): void {
  name.value = response['name'];
  room.value = response['room'];
  isJoined.value = response['isJoined'];
}

</script>


<template>
  <Joiner v-if="!isJoined" @response="handleJoinerResponse" :isJoined="isJoined" :name="name" :room="room" />
  <Room v-else :name="name" :room="room" />
</template>


<style scoped>


</style>