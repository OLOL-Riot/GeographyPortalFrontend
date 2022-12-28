<script setup lang="ts">
import { ref } from "vue";
import type { IUpdateCourse } from "@/interfaces/ICourse";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  onSave: {
    type: Function,
    default: (data: IUpdateCourse) => {},
  },
});

const course = ref({
  name: props.name,
  description: props.description,
  shortDescription: props.shortDescription,
} as IUpdateCourse);

function onSubmit() {
  props.onSave(course.value);
}
</script>

<template>
  <q-card class="q-pa-md" style="width: 100%">
    <h4>Редактирование курса</h4>
    <q-form @submit="onSubmit" class="q-gutter-md q-mt-md text-left">
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
          type="submit"
          label="Применить"
          class="full-width"
          color="green"
        />
      </div>
    </q-form>
  </q-card>
</template>
