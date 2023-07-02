<script setup lang="ts">

import { inject, onMounted, Ref, ref, watch } from "vue";


const [room,] = inject("Room");
const [messages,] = inject("Messages");
const roomCount: Ref<number> = ref(0);
const participants: Ref<string[]> = ref([]);

const clipboardClasses: Ref<string[]> = ref(['fa-regular', 'fa-clipboard', 'Clipboard'])
const copiedClasses: Ref<string> = ref('hidden');
const inviteLink: string = window.location.host + `/?room=${room.value}`;

onMounted(() => {
  setTimeout(() => {
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
  }, 0);

});

watch(messages, () => {
  if (messages.value.length === 0) {
    return;
  }
  let lastMessage: object = messages.value[messages.value.length - 1];
  if (lastMessage.type === "announcement") {
    if (lastMessage.data.type === "join") {
      roomCount.value++;
      participants.value.push(lastMessage.data.message);
    } else if (lastMessage.type === "leave") {
      roomCount.value--;
      participants.value = participants.value.filter((participant: string) => participant !== lastMessage.data.message);
    }
  }
});

function handleCopyToClipboard() {
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

  <div class="w-1/4 SidePanel">
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