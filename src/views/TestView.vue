<script setup lang="ts">
import { getApi } from "@/api";
import ExerciseList from "@/components/ExerciseList.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { isAdministrator } from "@/roles";
import EditExerciseList from "@/components/forms/EditExerciseList.vue";

const route = useRoute();
const testId = ref(route.params.testId as string);
const editMode = ref(false);
</script>

<template>
  <q-page padding>
    <ExerciseList
      :testId="testId"
      :toEdit="() => (editMode = true)"
      v-if="!editMode"
    />
    <EditExerciseList
      :testId="testId"
      :success="() => (editMode = false)"
      v-else-if="isAdministrator()"
    />
  </q-page>
</template>
