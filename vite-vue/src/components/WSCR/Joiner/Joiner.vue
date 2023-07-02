<script setup lang="ts">

import { onMounted, Ref, ref } from 'vue';
import { setJoinButtonHelper, validateName, validateRoom } from './helpers.ts';

let queryParams: URLSearchParams = new URLSearchParams(window.location.search);
let queriedRoom: string = queryParams.get('room');

const emit = defineEmits(['response']);

const roomNumber: Ref<string> = ref('');
const uName: Ref<string> = ref('');
const joinButton: Ref<string> = ref('Join Room');

onMounted(() => {
  if (queriedRoom !== null && validateRoom(queriedRoom)) {
    roomNumber.value = queriedRoom;
    setJoinButtonHelper(joinButton, roomNumber.value, uName.value);
    let button: HTMLButtonElement = document.getElementById("generateRoom") as HTMLButtonElement;
    button.disabled = true;
  }
})

function generateRoom() {
  fetch("http://localhost:3000/generateRoom")
    .then(response => response.text())
    .then(text => {
      roomNumber.value = text;
      setJoinButtonHelper(joinButton, text, uName.value);
      let button: HTMLButtonElement = document.getElementById("generateRoom") as HTMLButtonElement;
      button.disabled = true;
    })
}

function handleFormChange(e: Event) {
  let newName: string = uName.value;
  let newRoom: string = roomNumber.value;

  let eventTarget = e.target as HTMLInputElement;

  if (eventTarget.id === 'name') {
    newName = eventTarget.value.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
    uName.value = newName;
  } else if (eventTarget.id === 'room') {
    newRoom = eventTarget.value.replace(/\D/g, '').substring(0, 4);
    roomNumber.value = newRoom;
  }
  setJoinButtonHelper(joinButton, newRoom, newName);
}

function handleSubmit(): boolean {
  let currName: string = uName.value;
  let currRoom: string = roomNumber.value;
  if (!currName && !currRoom) {
    alert('Please enter a name and room number.');
    return false;
  } else if (!currName) {
    alert('Please enter a name.');
    return false;
  } else if (!currRoom) {
    alert('Please enter a room number.');
    return false;
  }

  if (!validateName(currName)) {
    alert('Name must be 3-16 characters long and may only consist of letters and numbers.');
    return false;
  }
  if (!validateRoom(currRoom)) {
    alert('Room must be a 4 digit number 0000-9999');
    return false;
  }

  emit('response', { name: currName, room: currRoom, isJoined: true });
  return true;
}

</script>


<template>

  <div id="joiner">
    <form id="roomForm" @submit.prevent="handleSubmit" class="form-signin">
      <h1 id="header" class="mb-3">Join or Create a Room</h1>
      <input v-model="uName" @input="handleFormChange" class="form-control bottom" type="text" id="name" size="64" autofocus autocomplete="off" placeholder="Name" />
      <div id="wrapper">
        <input v-model="roomNumber" @input="handleFormChange" class="form-control bottom" type="text" id="room" size="64" autocomplete="off" placeholder="Room" />
        <button @click="generateRoom" type="button" class="btn btn-lg btn-outline top-btn" id="generateRoom">Generate New Room</button>
      </div>
      <input :value="joinButton" class="btn btn-lg btn-outline btm-btn form-control" type="submit" id="joinRoom" />
    </form>
  </div>

</template>


<style scoped>

#joiner {
  margin-top: 100px;
}

.form-signin {
  width: 450px;
  padding: 25px;
  margin: auto;
  text-align: center;
  border: solid black 2px;
  border-radius: 20px;
  background-color: #e0e0e0;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 24px;
  border: 2px solid black;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin .btn {
  position: relative;
  margin: 0 auto;
}

#wrapper {
  display: flex;
  align-items: center;
}

#wrapper .btn-lg {
  font-size: 25px;
  border: 2px solid black;
}

#name {
  width: 396px;
  margin-top: 4px;
  border-radius: .375rem;
  transition: all ease-in-out 0.2s;
}

#name::placeholder, #room::placeholder {
  color: #5e5e5e;
}

#name:focus, #room:focus {
  outline: none;
  box-shadow: 0 0 0 4px #93c4e0;
  transition: all ease-in-out 0.2s;
}


#room {
  flex: 1;
  margin-right: 10px;
  max-width: 120px;
  border-radius: .375rem;
  transition: all ease-in-out 0.2s;
}

#generateRoom {
  margin: 16px 0;
  font-size: 18px;
  color: black;
  padding: 8px;
  min-width: 266px;
  min-height: 60px;
  border-radius: .375rem;
}

#header {
  position: relative;
  border: 2px solid black;
  border-radius: 20px;
  background-color: #b3e6ff;
  padding: 20px;
  font-size: 2.5rem;
  line-height: 1.2;
}

.top-btn {
  background-color: #f6afaf;
  transition: all ease-in-out 0.2s;
}

.top-btn:hover, .top-btn:focus {
  background-color: #9a9a9a;
  transition: all ease-in-out 0.2s;
  outline: none;
}

.btm-btn {
  background-color: #b3e6ff;
  transition: all ease-in-out 0.2s;
}

.btm-btn:hover, .btm-btn:focus {
  background-color: #9a9a9a;
  transition: all ease-in-out 0.2s;
  outline: none;
}

.btm-btn:hover {
  cursor: pointer;
}

#generateRoom[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #9a9a9a;
}

#joinRoom {
  width: 395px;
  border-radius: .375rem;
}

</style>