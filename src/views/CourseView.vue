<script setup lang="ts">
import { getApi } from "@/api";
import CourseDetail from "@/components/CourseDetail.vue";
import type { ICourse } from "@/interfaces/ICourse";
import type { AxiosResponse, AxiosError } from "axios";
import { QPage, useQuasar } from "quasar";
import { ref } from "vue";
import { useRoute } from "vue-router";
import CourseSectionPreview from "@/components/CourseSectionPreview.vue";

const $q = useQuasar();
const route = useRoute();
const courseId = route.params.courseId as string;

const course = ref({} as ICourse);

let load = ref(false);

getApi().then((api) =>
  api
    .get("api/Course/page/" + courseId)
    .then((response: AxiosResponse<ICourse>) => {
      course.value = response.data;
      load.value = true;
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
  <q-page padding>
    <CourseDetail
      v-if="load"
      :name="course.name"
      :description="course.description"
    >
      <div
        class="row"
        v-if="
          course.previewCourseSections && course.previewCourseSections.length
        "
      >
        <div class="col-12">
          <h3 class="text-h3 q-px-sm q-py-md">Секции курса</h3>
        </div>
        <CourseSectionPreview
          :id="section.id"
          :name="section.name"
          :shortDescription="section.shortDescription"
          v-for="section in course.previewCourseSections"
          :key="section.id"
        />
      </div>
    </CourseDetail>
  </q-page>
</template>
