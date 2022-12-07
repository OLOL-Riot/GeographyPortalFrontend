<script setup lang="ts">
import { getApi } from "@/api";
import { ref } from "vue";
import { useQuasar } from "quasar";
import type { AxiosError, AxiosResponse } from "axios";
import type IPageCourseSection from "@/interfaces/IPageCourseSection";
import type ITheory from "@/interfaces/ITheory";

const props = defineProps({
  courseSectionId: {
    type: String,
    required: true,
  },
});

const $q = useQuasar();

const pageCourseSection = ref({} as IPageCourseSection);
const theory = ref({} as ITheory);
const testId = ref({} as string);

getApi().then((api) =>
  api
    .get("/api/CourseSection/page/" + props.courseSectionId)
    .then((response: AxiosResponse<IPageCourseSection>) => {
      pageCourseSection.value = response.data;
      theory.value = pageCourseSection.value.theory;
      testId.value = pageCourseSection.value.testId;
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
  <div class="container">
    <div class="page-course-section-title">
      <h1 class="text-h4 q-pb-md">{{ pageCourseSection.name }}</h1>
    </div>

    <q-card flat bordered class="theory-card">
      <q-card-section class="q-py-md">
        <div class="text-h5">{{ theory.name }}</div>
      </q-card-section>
      <q-card-section class="q-pb-md">
        <div class="text-body1">{{ theory.description }}</div>
      </q-card-section>

      <q-card-section
        class="theory-section-card"
        v-for="theorySection in theory.theorySections"
        :key="theorySection.serialNumber"
      >
        <q-separator />
        <q-card-section>
          <div class="text-h6">{{ theorySection.header }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ theorySection.content }}
        </q-card-section>
      </q-card-section>
    </q-card>

    <div class="row q-pa-md">
      <q-btn
        class="q-mx-auto"
        color="green"
        label="Перейти к тесту"
        @click="$router.push({ name: 'test', params: { testId: testId } })"
      />
    </div>
  </div>
</template>

<style scoped>
.page-course-section-title {
  text-align: center;
}
</style>
