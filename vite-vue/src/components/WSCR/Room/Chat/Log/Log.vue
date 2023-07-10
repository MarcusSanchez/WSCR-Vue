<script setup lang="ts">

import { inject, Ref, ref } from "vue";
import Message from "./Message/Message.vue";
import Announcement from "./Announcement/Announcement.vue";

const [messages,] = inject("Messages") as [object[], void];
const [newMessageAlert, updateNewMessageAlert] = inject("NewMessageAlert") as [boolean, (newAlert: boolean) => void];
const log: Ref<HTMLDivElement> = ref(null);

function handleScroll(): void {
  let isAtBottom = log.value.scrollTop >= log.value.scrollHeight - log.value.clientHeight - 10;
  if (newMessageAlert && isAtBottom) {
    updateNewMessageAlert(false);
  }
}

</script>


<template>

  <div @scroll="handleScroll" class="p-3 Log" ref="log" id="message-log">
    <template v-for="(message, index) in messages" :key="index">
      <Message v-if="message.type === 'message'"
               :key="index + 'h2snz8'"
               :name="message.data.name"
               :message="message.data.message"
               :fromClient="message.data.fromClient as boolean"
               :time="message.data.time"
      />
      <Announcement v-else :key="index + 'b7yr3w'" :message="message.data.message" />
    </template>
  </div>

</template>


<style scoped>

.Log {
  background-color: #e0e0e0;
  border-radius: 30px 0 0 0;
  border: 2px black solid;
  height: 400px;
  overflow-y: scroll;
}

</style>