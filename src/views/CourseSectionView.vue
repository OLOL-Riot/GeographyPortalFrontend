<script setup lang="ts">
import { getApi } from "@/api";
import { ref } from "vue";
import { useRoute } from "vue-router";
import CourseSection from "@/components/CourseSection.vue";
import type IPageCourseSection from "@/interfaces/IPageCourseSection";
import type { AxiosError, AxiosResponse } from "axios";
import { useQuasar } from "quasar";
import CourseSectionTheoryBlock from "@/components/CourseSectionTheoryBlock.vue";
import CourseSectionTheory from "@/components/CourseSectionTheory.vue";
import EditCourseSectionTheory from "@/components/forms/EditCourseSectionTheory.vue";
import { isAdministrator } from "@/roles";

const route = useRoute();
const courseSectionId = ref(route.params.courseSectionId as string);
const load = ref(false);

const editMode = ref(false);

const pageCourseSection = ref({} as IPageCourseSection);
const $q = useQuasar();

function getData() {
  getApi().then((api) =>
    api
      .get("/api/CourseSection/page/" + courseSectionId.value)
      .then((response: AxiosResponse<IPageCourseSection>) => {
        pageCourseSection.value = response.data;
        pageCourseSection.value.theory.theorySections.sort(
          (a, b) => a.serialNumber - b.serialNumber
        );
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
}
getData();
</script>

<template>
  <q-page padding v-if="load">
    <CourseSection
      :name="pageCourseSection.name"
      :testId="pageCourseSection.testId"
    >
      <CourseSectionTheory
        :name="pageCourseSection.theory.name"
        :description="pageCourseSection.theory.description"
        :to-edit="() => (editMode = true)"
        v-if="!editMode"
      >
        <CourseSectionTheoryBlock
          v-for="theoryBlock in pageCourseSection.theory.theorySections"
          :key="theoryBlock.serialNumber"
          :title="theoryBlock.header"
          :content="theoryBlock.content"
        />
      </CourseSectionTheory>
      <EditCourseSectionTheory
        v-else-if="isAdministrator()"
        :theoryId="pageCourseSection.theory.id"
        :success="
          () => {
            load = false;
            editMode = false;
            getData();
          }
        "
      />
    </CourseSection>
  </q-page>
</template>
