<script setup lang="ts">
import type { IExerciseList } from "@/interfaces/IExercise";
import { getApi } from "@/api";
import { ref } from "vue";
import type { AxiosError, AxiosResponse } from "axios";
import type { ITest } from "@/interfaces/ITest";
import { useQuasar } from "quasar";
import type {
  IVerifyExercisePost,
  IVerifyTestPost,
} from "@/interfaces/IVerifyTestPost";
import type { IVerifyTestResponse } from "@/interfaces/IVerifyTestResponse";

const props = defineProps({
  testId: {
    type: String,
    required: true,
  },
});

const $q = useQuasar();
const api = getApi();

const exerciseList = ref({} as IExerciseList);
const test = ref({} as ITest);

interface IAnswersToExercisesArray {
  [index: string]: string;
}

const answersByExercises = ref({} as IAnswersToExercisesArray);

api
  .get("api/Test/solve/" + props.testId)
  .then((response: AxiosResponse<ITest>) => {
    test.value = response.data;

    exerciseList.value = response.data.exercises;
  })
  .catch((err: AxiosError) => {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: err.message,
    });
  });

function toEntries<T>(a: T[]) {
  return a.map((value, index) => [index, value] as const);
}

function checkAnsver() {
  let postData = {} as IVerifyTestPost;

  postData.testId = props.testId;
  postData.userAnswers = [];
  
  for (let exercise of exerciseList.value) {
    postData.userAnswers.push({
      id: exercise.id,
      chosenAnswer: answersByExercises.value[exercise.id],
    });
  }

  api
    .post("api/VerifiedTest/", postData)
    .then((response: AxiosResponse<IVerifyTestResponse>) => {
      if (response.data.points == response.data.maxPoints)
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

        <div class="q-gutter-sm flex column q-pr-md">
          <q-radio
            v-for="option in exercise.answers"
            v-model="answersByExercises[exercise.id]"
            :val="option"
            :label="option"
          />
        </div>
      </q-card>
    </div>
    <div class="row q-pa-md">
      <q-btn color="primary" label="Проверить" @click="checkAnsver()" />
    </div>
  </div>
</template>
