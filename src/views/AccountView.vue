<script setup lang="ts">
import { LocalStorage } from "quasar";
import CourseList from "@/components/CourseList.vue";

const checkAuth = LocalStorage.getItem("auth") !== null;
</script>

<template>
  <main>
    <div class="container q-pt-xl">
      <div v-if="checkAuth">
        <CourseList />
      </div>
      <h2 class="text-h2" v-else>You are not logged in(</h2>
    </div>
  </main>
</template>
