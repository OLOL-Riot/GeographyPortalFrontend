<script setup lang="ts">
import type { IExerciseList } from "@/interfaces/IExercise";
import { getApi } from "@/api";
import { ref } from "vue";
import type { AxiosError, AxiosResponse } from "axios";
import type { ITest } from "@/interfaces/ITest";
import { useQuasar } from "quasar";

const props = defineProps({
  testId: String,
});

const $q = useQuasar();
const api = getApi();

const exerciseList = ref({} as IExerciseList);
const test = ref({} as ITest);

api
  .get("api/Test/solve/" + props.testId)
  .then((response: AxiosResponse<ITest>) => {
    test.value = response.data;

    exerciseList.value = [...response.data.exercises];
  })
  .catch((err: AxiosError) => {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: err.message,
    });

    exerciseList.value = [
      {
        id: "",
        description: "Задание 1",
        serialNumber: 1,
        answers: [
          "Правильный вариант ответа",
          "Неправильный вариант ответа 1",
          "Неправильный вариант ответа 2",
          "Неправильный вариант ответа 3",
        ],
        rightAnswer: "Правильный вариант ответа",
      },
      {
        id: "",
        description: "Задание 2",
        serialNumber: 2,
        answers: [
          "Правильный вариант ответа",
          "Неправильный вариант ответа 1",
          "Неправильный вариант ответа 2",
          "Неправильный вариант ответа 3",
        ],
        rightAnswer: "Правильный вариант ответа",
      },
    ];
  });

function checkAnsver(answer: string, rightAnswer: string) {
  if (answer == rightAnswer)
    $q.notify({
      color: "green-5",
      textColor: "white",
      icon: "done",
      message: "Правильный ответ!",
    });
  else
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Ответ не верен",
    });
}
</script>

<template>
  <div class="container">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="exercise in exerciseList">
        <q-card-section>
          <div class="text-h6">{{ exercise.description }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical>
          <q-btn flat v-for="option in exercise.answers" @click="checkAnsver(option, exercise.rightAnswer)">{{
            option
          }}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
