<script setup lang="ts">
import { getApi } from "@/api";
import { ref } from "vue";
import { useQuasar } from "quasar";
import type { AxiosError, AxiosResponse } from "axios";
import type IPageCourseSection from "@/interfaces/IPageCourseSection";
import type ITheory from "@/interfaces/ITheory";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  theoryName: {
    type: String,
    required: true,
  },
  theoryDescription: {
    type: String,
    required: true,
  },
  testId: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="container">
    <div class="page-course-section-title">
      <h1 class="text-h4 q-pb-md">{{ name }}</h1>
    </div>

    <q-card flat bordered class="theory-card">
      <q-card-section class="q-py-md">
        <div class="text-h5">{{ theoryName }}</div>
      </q-card-section>
      <q-card-section class="q-pb-md">
        <div class="text-body1">{{ theoryDescription }}</div>
      </q-card-section>

      <slot></slot>
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
