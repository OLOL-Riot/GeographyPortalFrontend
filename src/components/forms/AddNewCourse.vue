<script setup lang="ts">
import type IRegistrationPost from "@/interfaces/IRegistrationPost";
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

const $q = useQuasar();

function onSubmit() {
  getApi().then((api) =>
    api
      .post("api/Course", course)
      .then((response) => {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Ok!",
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
  for (let prop in course) {
    course[prop] = ''
  }
}
</script>

<template>
  <q-card class="q-pa-md" style="max-width: 500px; width: 100%">
    <h4>Добавление курса</h4>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mt-md">
      <q-input
        filled
        v-model="course.name"
        label="Название курса"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
      />

      <q-input
        filled
        v-model="course.name"
        label="Описание курса"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
      />

      <q-input
        filled
        v-model="course.name"
        label="Краткое описание курса"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
      />

      <div>
        <q-btn label="Sign Up" class="full-width" type="submit" color="red" />
        <q-btn
          label="Reset"
          type="reset"
          color="red"
          flat
          class="full-width q-mt-md"
        />
      </div>
    </q-form>
  </q-card>
</template>
