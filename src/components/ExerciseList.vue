<script setup lang="ts">
import type { IExerciseList } from "@/interfaces/IExercise";
import { getApi } from "@/api";
import { ref } from "vue";

const api = getApi();

const exercises = ref({} as IExerciseList);

api.get("api/Exercise/solve").then((response) => {
  exercises.value = response.data;
});
</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md q-mt-xl">
    <!--<q-btn
      color="primary"
      :label="item.description"
      v-for="item in exercises"
      :key="item.serialNumber"
    />-->
  </div>
</template>
