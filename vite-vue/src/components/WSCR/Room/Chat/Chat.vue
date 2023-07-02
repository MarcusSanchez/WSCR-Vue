<script setup lang="ts">

import { inject } from "vue";
import Log from "./Log/Log.vue";
import MessageBox from "./MessageBox/MessageBox.vue";
import NewMessageAlert from "./NewMessageAlert/NewMessageAlert.vue";

const {newMessageAlert, } = inject("NewMessageAlert");

</script>


<template>

  <div class="w-3/4 relative">
    <Log />
    <NewMessageAlert v-if="newMessageAlert"/>
    <MessageBox />
  </div>

</template>


<style scoped>


</style>