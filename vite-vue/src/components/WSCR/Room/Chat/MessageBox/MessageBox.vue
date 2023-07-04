<script setup lang="ts">

import { inject, ref, Ref } from "vue";

let messageCount: number = 0;
const [messages, setMessages] = inject("Messages") as [Ref<object[]>, (newMessages: object[]) => void];
const [conn,] = inject("Connection") as [Ref<WebSocket | null>];
const [name,] = inject("Name") as [Ref<string>];
let textArea: Ref<string> = ref("");

function sendMessage(): boolean {
  if ((!conn.value || textArea.value.replace(/^]s+/, '').length === 0) || messageCount >= 3) {
    if (messageCount >= 3) {
      let announcement = {
        type: "announcement",
        data: {
          name: "server",
          type: "cooldown",
          message: "You are on cooldown try again in 5 seconds."
        }
      }
      setMessages([...messages.value, announcement]);
      setTimeout(() => {
        document.getElementById("message-log").scrollTo(0, document.getElementById("message-log").scrollHeight);
      }, 0);
    }
    return false;
  }

  messageCount++;
  setTimeout(() => {
    messageCount--;
  }, 5000);
  conn.value.send(textArea.value);
  const time: string = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  let message = {
    type: "message",
    data: {
      name: name,
      time: time,
      message: textArea.value,
      fromClient: true
    }
  };
  setMessages([...messages.value, message]);
  textArea.value = "";
  setTimeout(() => {
    document.getElementById("message-log").scrollTo(0, document.getElementById("message-log").scrollHeight);
  }, 0);
  return true;
}

function handleEnter(e): void {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

</script>


<template>

  <div class="ChatContainer">
    <div class="MessageBox">
      <textarea v-model="textArea" @keydown="handleEnter" class="TextArea" rows="1" placeholder="Type your message..." autofocus />
      <button @click="sendMessage" class="Button">Send</button>
    </div>
  </div>

</template>


<style scoped>

.ChatContainer {
  background-color: #e0e0e0;
  border-radius: 0 0 0 30px;
  border: 2px black solid;
  height: 125px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.MessageBox {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 953px;
  margin-left: 10px;
}

.TextArea {
  flex-grow: 1;
  resize: none;
  padding: 10px;
  font-size: 15px;
  line-height: 1.5;
  transition: height 0.2s;
  overflow-y: auto;
  width: auto;
  border-radius: 10px;
  border: 1px solid #000;
  height: 100px;
}

.Button {
  margin-left: 20px;
  margin-right: 16px;
  padding: 10px 15px;
  height: 100px;
  width: 100px;
  border-radius: 10px;
  background-color: #f6afaf;
  border: 1px solid #000;
  color: #000;
  cursor: pointer;
}

</style>