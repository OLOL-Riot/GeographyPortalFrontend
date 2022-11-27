<script setup lang="ts">
import { getApi } from "@/api";
import { ref } from "vue";
import { useRoute } from "vue-router";
import CourseSection from "@/components/CourseSection.vue"

const route = useRoute();
const courseSectionId = ref(route.params.courseSectionId as string);
</script>

<template>
    <q-page padding>
        <CourseSection :courseSectionId="courseSectionId" />
    </q-page>
</template>