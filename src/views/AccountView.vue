<script setup lang="ts">
const checkAuth = localStorage.token != undefined;
</script>

<template>
  <main>
    <div class="container">
      <h2 class="text-h2" v-if="checkAuth">You are logged in!</h2>
      <h2 class="text-h2" v-else>You are not logged in(</h2>
    </div>
  </main>
</template>
