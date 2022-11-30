<script setup lang="ts">
import { getApi } from "@/api";
import CourseDetail from "@/components/CourseDetail.vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

const api = await getApi();

const $q = useQuasar();
const route = useRoute();
const courseId = route.params.courseId as string;

</script>

<template>
  <q-page padding>
    <CourseDetail :courseId="courseId" />
  </q-page>
</template>
