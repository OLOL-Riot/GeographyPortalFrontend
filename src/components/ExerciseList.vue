<script setup lang="ts">
import { getApi } from "@/api";

const api = getApi();

api.get("api/Exercise/solve").then((response) => console.log);
</script>

<template>
  <div class="greetings"></div>
</template>
