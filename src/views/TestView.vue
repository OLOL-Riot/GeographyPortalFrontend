<script setup lang="ts">
import { getApi } from "@/api";
import ExerciseList from "@/components/ExerciseList.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const testId = ref(route.params.testId as string);
</script>

<template>
  <q-page padding>
    <ExerciseList :testId="testId" />
  </q-page>
</template>
