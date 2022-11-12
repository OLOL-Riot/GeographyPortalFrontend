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

interface IAnswersStatus {
  [index: string]: "red" | "green" | "blue";
}

const answersByExercises = ref({} as IAnswersToExercisesArray);
const answersStatus = ref({} as IAnswersStatus);

api
  .get("api/Test/solve/" + props.testId)
  .then((response: AxiosResponse<ITest>) => {
    test.value = response.data;

    exerciseList.value = response.data.exercises;

    response.data.exercises.forEach((exercise) => {
      answersStatus.value[exercise.id] = "blue";
    });
  })
  .catch((err: AxiosError) => {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: err.message,
    });
  });

function checkAnsver() {
  let postData = {} as IVerifyTestPost;

  postData.testId = props.testId;
  postData.userAnswers = [];

  for (let exercise of exerciseList.value) {
    if (typeof answersByExercises.value[exercise.id] == "undefined") {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "Необходимо ответить на все вопросы!",
      });
      return;
    }

    postData.userAnswers.push({
      exerciseId: exercise.id,
      chosenAnswer: answersByExercises.value[exercise.id],
    });
  }

  api
    .post("api/VerifiedTest/", postData)
    .then((response: AxiosResponse<IVerifyTestResponse>) => {
      response.data.verifiedAnswers.forEach((question) => {
        if (question.isRight)
          answersStatus.value[question.exerciseId] = "green";
        else answersStatus.value[question.exerciseId] = "red";
      });

      if (response.data.points == response.data.maxPoints)
        $q.notify({
          color: "green-5",
          textColor: "white",
          icon: "done",
          message: "Абсолютно верно!",
        });

      $q.notify({
        color: "blue-5",
        textColor: "white",
        icon: "done",
        message: `Вы набрали ${response.data.points} из ${response.data.maxPoints} баллов`,
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

        <div class="q-gutter-sm flex column q-py-sm">
          <q-radio
            class="q-pr-md"
            v-for="option in exercise.answers"
            :color="answersStatus[exercise.id]"
            v-model="answersByExercises[exercise.id]"
            :val="option"
            :label="option"
            @click="answersStatus[exercise.id] = 'blue'"
          />
        </div>
      </q-card>
    </div>
    <div class="row q-pa-md">
      <q-btn color="primary" label="Проверить" @click="checkAnsver()" />
    </div>
  </div>
</template>
