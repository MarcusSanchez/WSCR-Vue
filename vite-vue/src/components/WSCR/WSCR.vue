<script setup lang="ts">

import { provide, Ref, ref } from 'vue';
import Joiner from "./Joiner/Joiner.vue";
import Room from "./Room/Room.vue";

const name: Ref<string> = ref('');
const room: Ref<string> = ref('');
const isJoined: Ref<boolean> = ref(false);

function handleJoinerResponse(response: object): void {
  name.value = response['name'];
  room.value = response['room'];
  isJoined.value = response['isJoined'];
}

provide("Name", [name, (newName: string) => name.value = newName]);
provide("Room", [room, (newRoom: string) => room.value = newRoom]);

</script>


<template>
  <Joiner v-if="!isJoined" @response="handleJoinerResponse" :isJoined="isJoined" :name="name" :room="room" />
  <Room v-else :name="name" :room="room" />
</template>


<style scoped>
</style>