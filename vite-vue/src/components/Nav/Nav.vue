<script setup lang="ts">

import LogoBox from "./LogoBox/LogoBox.vue";

function returnHome() {
  window.location.href = window.location.origin + window.location.pathname
}

</script>


<template>

  <nav class="Navbar">
    <div @click="returnHome" class="mx-auto md:mx-0 flex px-1 py-3 w-max hover:cursor-pointer">
      <LogoBox letter="W" color="Blue" />
      <LogoBox letter="S" color="Red" />
      <LogoBox letter="C" color="Blue" />
      <LogoBox letter="R" color="Red" class="mr-2" />
      <LogoBox letter="V" color="Green" />
      <LogoBox letter="U" color="Green" />
      <LogoBox letter="E" color="Green" />

    </div>
  </nav>

</template>


<style scoped>

.Navbar {
  background-color: #e0e0e0;
  border-bottom: 2px solid black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>
