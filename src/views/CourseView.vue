<script setup lang="ts">
import { getApi } from "@/api";
import CourseSectionList from "@/components/CourseSectionList.vue";
import type { AxiosError, AxiosResponse } from "axios";
import type { ICourse } from "@/interfaces/ICourse";
import { useQuasar, QBtn } from "quasar";
import { ref } from "vue";
import { useRoute } from "vue-router";

const api = getApi();

const $q = useQuasar();
const route = useRoute();
const courseId = ref(route.params.courseId as string);

const course = ref({} as ICourse);

api
  .get("api/Course")
  .then((response: AxiosResponse<ICourse>) => {
    course.value = response.data;
  })
  .catch((err: AxiosError) => {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: err.message,
    });
  });
</script>

<template>
  <q-page padding>
    <CourseSection :courseId="courseId" />
  </q-page>
</template>
