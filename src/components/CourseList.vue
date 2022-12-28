<script setup lang="ts">
import { getApi } from "@/api";
import { ref } from "vue";
import type { AxiosError, AxiosResponse } from "axios";
import { useQuasar, QBtn } from "quasar";
import { useRouter, useRoute } from "vue-router";
import type { ICourse, ICourseList, IUpdateCourse } from "@/interfaces/ICourse";
import { isAdministrator } from "@/roles";
import CourseListItem from "@/components/CourseListItem.vue";
import AddNewCourse from "@/components/forms/AddNewCourse.vue";

const courses = ref({} as ICourseList);

const $q = useQuasar();
const $router = useRouter();
const addFormShow = ref(false);

updateList();

function updateList() {
  getApi().then((api) =>
    api
      .get("api/Course")
      .then((response: AxiosResponse<ICourseList>) => {
        courses.value = response.data;
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

function updateCoursData(course: ICourse) {
  let toSend = course as IUpdateCourse;
  getApi().then((api) => api.put("api/Course/" + course.id, toSend));
}

function addNewCourse() {
  addFormShow.value = true;
}

function removeCourse(id: string) {
  getApi().then((api) =>
    api
      .delete("api/Course/" + id)
      .then((response) => {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Успешное удаление",
        });
        updateList();
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

function isAdmin() {
  return isAdministrator();
}
</script>

<template>
  <h2 class="text-h2 text-center">Список доступных курсов</h2>

  <div class="q-py-md q-px-sm row items-start q-mt-xl text-center">
    <CourseListItem
      :id="item.id"
      :name="item.name"
      :description="item.shortDescription"
      :on-remove="removeCourse"
      v-for="item in courses"
      :key="item.id"
      class="q-mb-md"
    />

    <template v-if="isAdmin()">
      <AddNewCourse :success="updateList" v-if="addFormShow" />
      <q-btn class="col-12" v-else @click="addNewCourse" color="secondary"
        >Добавить курс</q-btn
      >
    </template>
  </div>
</template>
