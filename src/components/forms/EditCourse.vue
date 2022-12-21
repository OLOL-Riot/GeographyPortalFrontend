<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";
import type IAddCourse from "@/interfaces/IAddCourse";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
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
  onUpdate: {
    type: Function,
    default: (id: string, data: IAddCourse) => {},
  },
});

const course = ref({} as IAddCourse);
onReset();

function onSubmit() {
  props.onUpdate(props.id, course.value);
}

function onReset() {
  course.value = {
    name: props.name,
    description: props.description,
    shortDescription: props.shortDescription,
  };
}
</script>

<template>
  <q-card class="q-pa-md" style="width: 100%">
    <h4>Редактирование курса</h4>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-mt-md text-left"
    >
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
          label="Применить"
          class="full-width"
          type="submit"
          color="green"
        />
      </div>
    </q-form>
  </q-card>
</template>
