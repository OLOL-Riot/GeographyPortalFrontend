<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";
import { getApi } from "@/api";
import type IUpdateCourseSection from "@/interfaces/IUpdateCourseSection";

const props = defineProps({
  sectionId: {
    type: String,
    required: true,
  },
  sectionName: {
    type: String,
    required: true,
  },
  sectionShortDescription: {
    type: String,
    required: true,
  },
  sectionSerialNumber: {
    type: Number,
    required: true,
  },
  success: {
    type: Function,
    default: () => {},
  },
});

const courseSection = ref({} as IUpdateCourseSection);

function onReset() {
  courseSection.value = {
    name: props.sectionName,
    shortDescription: props.sectionShortDescription,
    serialNumber: props.sectionSerialNumber,
  };
}

onReset();

const $q = useQuasar();

function onSubmit() {
  getApi().then((api) =>
    api
      .put("api/CourseSection/" + props.sectionId, courseSection.value)
      .then((response) => {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Успешно изменено!",
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
</script>

<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset">
      <q-card>
        <q-card-section>
          <h4 class="q-mb-md">Изменение секции курса</h4>
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
            label="Краткое описание"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
          />

          <q-input
            filled
            v-model="courseSection.serialNumber"
            type="number"
            label="Порядковый номер"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
          />
        </q-card-section>

        <q-card-actions vertical class="no-padding q-mt-auto bg-white">
          <q-btn
            label="Применить"
            class="full-width"
            type="submit"
            color="green"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>
