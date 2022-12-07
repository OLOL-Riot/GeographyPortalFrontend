<script setup lang="ts">
import type { ITestList } from "@/interfaces/ITest";
import { getApi } from "@/api";
import { ref } from "vue";
import type { AxiosError, AxiosResponse } from "axios";
import { useQuasar, QBtn } from "quasar";
import { useRouter, useRoute } from "vue-router";
import type { ICourse, ICourseList, IUpdateCourse } from "@/interfaces/ICourse";

const api = getApi();

const courses = ref({} as ICourseList);

const $q = useQuasar();
const $router = useRouter();

api
  .get("api/Course")
  .then((response: AxiosResponse<ICourseList>) => {
    courses.value = response.data;
  })
  .catch((err: AxiosError) => {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: err.message,
    });
  });

function updateCoursData(course: ICourse) {
  let toSend = course as IUpdateCourse;
  api.put("api/Course/" + course.id, toSend);
}
</script>

<template>
  <h2 class="text-h2 text-center">Список доступных курсов</h2>

  <div class="q-py-md q-px-sm row items-start q-gutter-md q-mt-xl text-center">
    <q-card class="col-12" v-for="item in courses" :key="item.id">
      <q-card-section class="bg-grey-8 text-white">
        <div class="text-h6">{{ item.name }}</div>
        <div class="text-subtitle2">{{ item.description }}</div>
      </q-card-section>

      <q-card-actions vertical class="no-padding">
        <q-btn
          flat
          @click="
            $router.push({ name: 'course', params: { courseId: item.id } })
          "
          >Перейти</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>
