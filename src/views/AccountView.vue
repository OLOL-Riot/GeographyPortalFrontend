<script setup lang="ts">
import { LocalStorage } from "quasar";
import TestList from "@/components/TestList.vue";

const checkAuth = LocalStorage.getItem("auth") !== null;
</script>

<template>
  <main>
    <div class="container q-pt-xl">
      <div v-if="checkAuth">
        <h2 class="text-h2">You are logged in!</h2>
        <TestList />
      </div>
      <h2 class="text-h2" v-else>You are not logged in(</h2>
    </div>
  </main>
</template>
