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

const route = useRoute();
const courseSectionId = ref(route.params.courseSectionId as string);
const load = ref(false);

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

// function updateCourse(data: IUpdateCourseSection) {
//   let toSend = data;
//   //   toSend.courseSectionIds = course.value.previewCourseSections.map((e) => e.id);

//   //   getApi().then((api) =>
//   //     api
//   //       .put("api/Course/" + courseId, toSend)
//   //       .then((response: AxiosResponse) => {
//   //         editMode.value = false;
//   //         getData();

//   //         $q.notify({
//   //           color: "green-5",
//   //           textColor: "white",
//   //           icon: "done",
//   //         });
//   //       })
//   //       .catch((err: AxiosError) => {
//   //         $q.notify({
//   //           color: "red-5",
//   //           textColor: "white",
//   //           icon: "warning",
//   //           message: err.message,
//   //         });
//   //       })
//   //   );
// }
</script>

<template>
  <q-page padding>
    <CourseSection
      v-if="load"
      :name="pageCourseSection.name"
      :theoryName="pageCourseSection.theory.name"
      :theoryDescription="pageCourseSection.theory.description"
      :testId="pageCourseSection.testId"
    >
      <CourseSectionTheory
        :name="pageCourseSection.theory.name"
        :description="pageCourseSection.theory.description"
      >
        <CourseSectionTheoryBlock
          v-for="theoryBlock in pageCourseSection.theory.theorySections"
          :key="theoryBlock.serialNumber"
          :title="theoryBlock.header"
          :content="theoryBlock.content"
        />
      </CourseSectionTheory>
    </CourseSection>
  </q-page>
</template>
