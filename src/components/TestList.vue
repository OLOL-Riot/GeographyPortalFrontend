<script setup lang="ts">
import type { ITestList } from "@/interfaces/ITest";
import { getApi } from "@/api";
import { ref } from "vue";
import type { AxiosResponse } from "axios";
import { useQuasar, QBtn } from "quasar";
import { useRouter, useRoute } from "vue-router";

const api = getApi();

const tests = ref({} as ITestList);

const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

api.get("api/Test/solve").then((response: AxiosResponse<ITestList>) => {
  tests.value = [
    ...response.data,
    {
      id: "1",
      name: "Проверочный тест 1",
      exercises: [
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
      ],
    },
    {
      id: "2",

      name: "Проверочный тест 2",
      exercises: [
        {
          id: "",
          description: "Задание 3",
          serialNumber: 3,
          answers: [
            "Правильный вариант ответа",
            "Неправильный вариант ответа 1",
            "Неправильный вариант ответа 2",
            "Неправильный вариант ответа 3",
          ],
          rightAnswer: "Правильный вариант ответа",
        },
      ],
    },
  ];
});
</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md q-mt-xl">
    <q-btn
      color="primary"
      :label="item.name"
      v-for="item in tests"
      :key="item.id"
      @click="$router.push({ name: 'test', params: { testId: item.id } })"
    />
  </div>
</template>
