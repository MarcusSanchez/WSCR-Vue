<script setup lang="ts">

import { inject, Ref } from "vue";
import Log from "./Log/Log.vue";
import MessageBox from "./MessageBox/MessageBox.vue";
import NewMessageAlert from "./NewMessageAlert/NewMessageAlert.vue";

const [newMessageAlert, ] = inject("NewMessageAlert") as [Ref<boolean>, void];

</script>


<template>

  <div class="col-span-3 relative">
    <Log />
    <NewMessageAlert v-if="newMessageAlert"/>
    <MessageBox />
  </div>

</template>


<style scoped>


</style>