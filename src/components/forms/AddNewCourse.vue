<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";
import { getApi } from "@/api";
import type IAddCourse from "@/interfaces/IAddCourse";

const props = defineProps({
  success: {
    type: Function,
    default: () => {},
  },
});

const course = ref({} as IAddCourse);
onReset();

const $q = useQuasar();

function onSubmit() {
  getApi().then((api) =>
    api
      .post("api/Course", course.value)
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
  course.value = {
    name: "",
    description: "",
    shortDescription: "",
  };
}
</script>

<template>
  <q-card class="q-pa-md" style="width: 100%">
    <h4>Добавление курса</h4>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mt-md text-left">
      <q-input
        filled
        v-model="course.name"
        label="Название курса"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
      />

      <h5>Описание курса</h5>
      <q-editor v-model="course.description" min-height="5rem" />

      <h5>Краткое описание курса</h5>
      <q-editor v-model="course.shortDescription" min-height="5rem" />

      <div>
        <q-btn
          label="Добавить"
          class="full-width"
          type="submit"
          color="green"
        />
      </div>
    </q-form>
  </q-card>
</template>
