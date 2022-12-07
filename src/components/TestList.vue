<script setup lang="ts">
import type { ITestList } from "@/interfaces/ITest";
import { getApi } from "@/api";
import { ref } from "vue";
import type { AxiosError, AxiosResponse } from "axios";
import { useQuasar, QBtn } from "quasar";
import { useRouter, useRoute } from "vue-router";

const tests = ref({} as ITestList);

const $q = useQuasar();
const $router = useRouter();

getApi().then((api) =>
  api
    .get("api/Test/solve")
    .then((response: AxiosResponse<ITestList>) => {
      tests.value = response.data;
    })
    .catch((err: AxiosError) => {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: err.message,
      });
    })
);
</script>

<template>
  <div class="q-py-md q-px-sm row items-start q-gutter-md q-mt-xl">
    <q-btn
      color="primary"
      :label="item.name"
      v-for="item in tests"
      :key="item.id"
      @click="$router.push({ name: 'test', params: { testId: item.id } })"
    />
  </div>
</template>
