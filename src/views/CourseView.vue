<script setup lang="ts">
import { getApi } from "@/api";
import CourseDetail from "@/components/CourseDetail.vue";
import type { ICourse, IUpdateCourse } from "@/interfaces/ICourse";
import type { AxiosResponse, AxiosError } from "axios";
import { QPage, useQuasar } from "quasar";
import { ref } from "vue";
import { useRoute } from "vue-router";
import CourseSectionPreview from "@/components/CourseSectionPreview.vue";
import EditCourse from "@/components/forms/EditCourse.vue";
import AddCourseSection from "@/components/forms/AddCourseSection.vue";

const $q = useQuasar();
const route = useRoute();
const courseId = route.params.courseId as string;

const course = ref({} as ICourse);

let load = ref(false);
let editMode = ref(false);

function getData() {
  getApi().then((api) =>
    api
      .get("api/Course/page/" + courseId)
      .then((response: AxiosResponse<ICourse>) => {
        course.value = response.data;
        course.value.previewCourseSections.sort(
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

function updateCourse(data: IUpdateCourse) {
  let toSend = data;
  toSend.courseSectionIds = course.value.previewCourseSections.map((e) => e.id);

  getApi().then((api) =>
    api
      .put("api/Course/" + courseId, toSend)
      .then((response: AxiosResponse) => {
        editMode.value = false;
        load.value = false;
        getData();

        $q.notify({
          color: "green-5",
          textColor: "white",
          icon: "done",
        });
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
</script>

<template>
  <q-page padding v-if="load">
    <CourseDetail
      v-if="!editMode"
      :name="course.name"
      :description="course.description"
      :toEdit="() => (editMode = true)"
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
          v-for="section in course.previewCourseSections"
          :key="section.id"
          :id="section.id"
          :name="section.name"
          :shortDescription="section.shortDescription"
        />
        <AddCourseSection :course-id="course.id" :success="getData" />
      </div>
      <div v-else class="row">
        <AddCourseSection :course-id="course.id" :success="getData" />
      </div>
    </CourseDetail>
    <EditCourse
      v-else
      :name="course.name"
      :description="course.description"
      :shortDescription="course.shortDescription"
      :onSave="updateCourse"
    />
  </q-page>
</template>
