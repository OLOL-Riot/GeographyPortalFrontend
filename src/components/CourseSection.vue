<script setup lang="ts">
import { getApi } from "@/api";
import { ref } from "vue";
import { useQuasar } from "quasar";
import type { AxiosError, AxiosResponse } from "axios";
import type IPageCourseSection from "@/interfaces/IPageCourseSection"
import type ITheory from "@/interfaces/ITheory"


const props = defineProps({
  courseSectionId: {
    type: String,
    required: true,
  },
});

const $q = useQuasar();
const api = getApi();

const pageCourseSection = ref({} as IPageCourseSection);
const theory = ref({} as ITheory)
const testId = ref({} as string)

// Test Values
/*
pageCourseSection.value = {
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Course Section Name",
  "shortDescription": "shortDescription shortDescription shortDescription shortDescription shortDescription",
  "serialNumber": 0,
  "theory": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Theory Name",
    "description": "description description description description description description",
    "shortDescription": "shortDescription shortDescription shortDescription shortDescription",
    "theorySections": [
      {
        "serialNumber": 0,
        "header": "Header 1",
        "content": "content content content content content content content content content content content content "
      },
      {
        "serialNumber": 1,
        "header": "Header 2",
        "content": "content content content content content content content content content content content content "
      },
      {
        "serialNumber": 2,
        "header": "Header 3",
        "content": "content content content content content content content content content content content content "
      }
    ]
  },
  "testId": "e40f1a12-8759-45ef-8731-fd3b7ca1d372"
}
theory.value = pageCourseSection.value.theory;
testId.value = pageCourseSection.value.testId;
*/


api
  .get("/api/CourseSection/page/" + props.courseSectionId)
  .then((response: AxiosResponse<IPageCourseSection>) => {
    pageCourseSection.value = response.data;
    theory.value = pageCourseSection.value.theory;
    testId.value = pageCourseSection.value.testId;

    theory.value.theorySections.sort(x => x.serialNumber)
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
  <div class="container ">
    <div class="page-course-section-title">
      <h1 class="text-h4 q-pb-md">{{ pageCourseSection.name }}</h1>
      <div class="text-body1 q-pb-md">{{ pageCourseSection.shortDescription }}</div>
    </div>

    <q-card flat bordered class="theory-card">
      <q-card-section class="q-py-md">
        <div class="text-h5">{{ theory.name }}</div>
      </q-card-section>
      <q-card-section class="q-pb-md">
        <div class="text-body1">{{ theory.description }}</div>
      </q-card-section>

      <q-card-section class="theory-section-card" v-for="theorySection in theory.theorySections">
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
      <q-btn class="q-mx-auto" color="green" label="Перейти к тесту"
        @click="$router.push({ name: 'test', params: { testId: testId } })" />
    </div>

    <div class="row q-pa-none">
      <q-btn class="q-mx-auto" color="grey" label="Назад" @click="$router.back()" />
    </div>
  </div>
</template>

<style scoped>
.page-course-section-title {
  text-align: center
}
</style>