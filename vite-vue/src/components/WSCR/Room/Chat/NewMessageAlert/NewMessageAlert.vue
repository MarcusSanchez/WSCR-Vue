<script setup lang="ts">

import { inject } from "vue";

const [, setNewMessageAlert] = inject("NewMessageAlert");

function scrollToBottom(): void {
  let log = document.getElementById("message-log")
  log.scrollTo(0, log.scrollHeight);
  setNewMessageAlert(false);
}

</script>


<template>

    <div @scroll="scrollToBottom" @click="scrollToBottom" class="NMA">
      <b class="Alert">New Message...</b>
    </div>

</template>


<style scoped>

.NMA {
  position: absolute;
  margin-top: -25px;
  left: 50%;
  transform: translateY(-50%);
}

.NMA:hover {
  cursor: pointer;
}

.Alert {
  padding: 0 5px;
  border-radius: 5px;
  background-color: #a1d29d;
  border: 1px black solid;
}

</style>