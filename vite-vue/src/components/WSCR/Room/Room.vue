<script setup lang="ts">

import { onMounted, provide, ref, Ref } from "vue";
import Chat from "./Chat/Chat.vue";
import SidePanel from "./SidePanel/SidePanel.vue";

const props = defineProps({
  name: String,
  room: String
})

const messages: Ref<object[]> = ref([]);
const newMessageAlert = ref(false);
const conn: Ref<WebSocket | null> = ref(null);

function start(name: string, room: string): void {
  if (window["WebSocket"]) {
    conn.value = new WebSocket(`wss://${window.location.host}/ws/${name}/${room}`);
    conn.value.onmessage = function (e) {
      let newMessage = JSON.parse(e.data);
      if (newMessage.type === "message") {
        newMessage.data.time = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        newMessage.data.fromClient = false;
      }
      let log = document.getElementById("message-log") as HTMLDivElement;
      let isAtBottom = log.scrollHeight === log.scrollTop + log.clientHeight;
      messages.value.push(newMessage);
      setTimeout(() => {
        if (isAtBottom) {
          log.scrollTo(0, log.scrollHeight);
        } else {
          newMessageAlert.value = true;
        }
      }, 0);
    };
    conn.value.onclose = function () {
      let announcement = { type: "announcement", data: { type: "close", message: "Connection closed" } };
      messages.value.push(announcement);
      conn.value = null;
    };
  } else {
    let announcement = { type: "announcement", data: { type: "close", message: "Your browser does not support WebSockets." } };
    messages.value.push(announcement);
  }
}

onMounted(() => {
  start(props.name, props.room)
});

provide("Messages", [messages, (newMessages: object[]) => messages.value = newMessages]);
provide("Connection", [conn, (newConn: WebSocket | null) => conn.value = newConn]);
provide("NewMessageAlert", [newMessageAlert, (newAlert: boolean) => newMessageAlert.value = newAlert]);

</script>


<template>

  <div class="grid grid-cols-4 gap-5 Container">
    <Chat />
    <SidePanel />
  </div>

</template>


<style scoped>

.Container {
  padding: 4% 7% 2%;
  margin-bottom: 50px;
}

</style>