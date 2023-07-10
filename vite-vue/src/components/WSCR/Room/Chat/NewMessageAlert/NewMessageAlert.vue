<script setup lang="ts">

import { inject } from "vue";

const [, updateNewMessageAlert] = inject("NewMessageAlert") as [void, (newAlert: boolean) => void];

function scrollToBottom(): void {
  let log = document.getElementById("message-log") as HTMLDivElement;
  log.scrollTo(0, log.scrollHeight);
  updateNewMessageAlert(false);
}

</script>


<template>

    <div @scroll="scrollToBottom" @click="scrollToBottom" class="flex justify-center mt-[-40px]">
      <b @click="scrollToBottom" class="Alert hover:cursor-pointer">New Message...</b>
    </div>

</template>


<style scoped>

.Alert {
  padding: 0 5px;
  border-radius: 5px;
  background-color: #a1d29d;
  border: 1px black solid;
}

</style>