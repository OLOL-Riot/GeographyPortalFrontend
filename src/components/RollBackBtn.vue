<script setup lang="ts">
import router from "@/router";
import { useRouter } from "vue-router";

const $router = useRouter();

function rollback() {
  $router.back();
}
</script>

<template>
  <q-btn class="rollback-btn" icon="fast_rewind" @click="rollback()"></q-btn>
</template>

<style scoped>
.rollback-btn {
  left: 0;
}
</style>
