<script setup lang="ts">

import { inject, Ref, ref, watch } from "vue";

const [room,] = inject("Room") as [Ref<string>, void];
const [messages,] = inject("Messages") as [Ref<object[]>, void];
const roomCount = ref(0);
const participants: Ref<string[]> = ref([]);

const clipboardClasses = ref(['fa-regular', 'fa-clipboard', 'Clipboard'])
const copiedClasses = ref('hidden');

let href = window.location.href;
let queryIndex = href.indexOf('?') !== -1 ? href.indexOf('?') : href.length;
let inviteLink = href.substring(0, queryIndex) + `?room=${room.value}`;

function fetchRoomInfo() {
  fetch(window.location.origin + `/info/${room.value}`)
    .then(response => response.json())
    .then(data => {
      if (data['error'] === "true") {
        console.log(data['errorMessage']);
        return;
      }
      roomCount.value = data['roomCount'];
      participants.value = data['participants'];
    })
    .catch(error => console.log(error));
}

watch(messages, () => {
  if (messages.value.length === 1 && messages.value[messages.value.length - 1].data.type === "join") {
    fetchRoomInfo();
    return;
  }
  let lastMessage = messages.value[messages.value.length - 1];
  if (lastMessage !== undefined && lastMessage.type === "announcement") {
    if (lastMessage.data.type === "join") {
      roomCount.value++;
      participants.value.push(lastMessage.data.name);
    } else if (lastMessage.data.type === "leave") {
      roomCount.value--;
      const index = participants.value.indexOf(lastMessage.data.name);
      participants.value.splice(index, 1);
    }
  }
}, { deep: true });

function handleCopyToClipboard(): void {
  navigator.clipboard.writeText(window.location.origin + "/?room=" + room.value)
    .then(() => {
      clipboardClasses.value = ['fa-solid', 'fa-check', 'Clipboard'];
      copiedClasses.value = 'ps-2';
      setTimeout(() => {
        clipboardClasses.value = ['fa-regular', 'fa-clipboard', 'Clipboard'];
        copiedClasses.value = 'hidden';
      }, 1000);
    })
    .catch();
}


</script>


<template>

  <div class="col-span-1 SidePanel">
    <h3 class="text-center font-semibold text-3xl my-4">Room Information</h3>
    <hr class="mb-4 border-gray-400" />
    <p><b>Room Number: </b>{{ room }}</p>
    <p><b>Room Count: </b>{{ roomCount }}</p>
    <p><b>Room Participants: </b></p>
    <div class="Participants">
      <p v-for="participant in participants" class="Participant">
        {{ participant }}
      </p>
    </div>
    <p class="mt-3 mb-1"><b>Invite Link:</b></p>
    <p @click="handleCopyToClipboard" class="mb-0 Link">
      {{ inviteLink }}
      <i :class="clipboardClasses"></i>
    </p>
    <b :class="copiedClasses">Copied</b>
  </div>

</template>


<style scoped>

.SidePanel {
  background-color: #e0e0e0;
  border-radius: 0 30px 30px 0;
  border: 2px black solid;
  height: 550px;
  padding: 0 16px;
}

P {
  margin-bottom: 10px;
}

.Participants {
  background-color: #fff;
  border: 2px black solid;
  height: 150px;
  width: 100%;
  overflow-y: scroll;
}

.Participant {
  padding-left: 10px;
  margin: 0;
  border-bottom: 1px darkgray solid;
  width: 100%;
}

.Link {
  background-color: #b4b4b4;
  border: 2px black solid;
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  word-wrap: normal;
}

.Clipboard {
  display: inline-block;
  padding-left: 5px;
  cursor: pointer;
}

</style>