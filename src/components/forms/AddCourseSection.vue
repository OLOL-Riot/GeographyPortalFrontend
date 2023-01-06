<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";
import { getApi } from "@/api";
import type IAddCourseSection from "@/interfaces/IAddCourseSection";

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
  success: {
    type: Function,
    default: () => {},
  },
});

const courseSection = ref({} as IAddCourseSection);
onReset();

const $q = useQuasar();

function onSubmit() {
  getApi().then((api) =>
    api
      .post("api/CourseSection", courseSection.value)
      .then((response) => {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Успешно добавлено!",
        });

        props.success();
      })
      .catch((err) => {
        console.log(err);
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: err.response.data.title,
        });
      })
  );
}

function onReset() {
  courseSection.value = {
    name: "",
    shortDescription: "",
    serialNumber: 0,
    courseId: props.courseId,
  };
}
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset" class="col-md-4 col-12 q-px-sm q-py-md">
    <q-card class="course-section">
      <q-card-section class="">
        <h4 class="q-mb-md">Добавление секции курса</h4>
        <q-input
          filled
          v-model="courseSection.name"
          label="Название секции"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
        />

        <q-input
          filled
          v-model="courseSection.shortDescription"
          label="Название краткое описание"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
        />

        <q-input
          filled
          v-model="courseSection.serialNumber"
          type="number"
          label="Введите порядковый номер"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
        />
      </q-card-section>

      <q-card-actions vertical class="no-padding q-mt-auto bg-white">
        <q-btn
          label="Добавить"
          class="full-width"
          type="submit"
          color="green"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>
