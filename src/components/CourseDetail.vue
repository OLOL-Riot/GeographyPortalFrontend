<script setup lang="ts">
import { getApi } from "@/api";
import type { AxiosError, AxiosResponse } from "axios";
import type { ICourse } from "@/interfaces/ICourse";
import { useQuasar, QBtn } from "quasar";
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
});

const api = getApi();

const $q = useQuasar();
const route = useRoute();

const course = ref({} as ICourse);

api
  .get("api/Course/" + props.courseId)
  .then((response: AxiosResponse<ICourse>) => {
    course.value = response.data;

    course.value.previewCourseSections = [
      {
        id: "0",
        name: "test section 1",
        shortDescription: "test short description... ".repeat(10),
      },
      {
        id: "1",
        name: "test section 2",
        shortDescription: "test short description... ".repeat(10),
      },
      {
        id: "2",
        name: "test section 3",
        shortDescription: "test short description... ".repeat(10),
      },
      {
        id: "3",
        name: "test section 4",
        shortDescription: "test short description... ".repeat(10),
      },
    ];
  })
  .catch((err: AxiosError) => {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: err.message,
    });
  });
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-12">
        <h1 class="text-h1">
          {{ course.name }}
        </h1>
        <p class="text-body1 q-mt-md">
          {{ course.description }}
        </p>
      </div>
    </div>
    <div class="row">
			<div class="col-12">
				<h3 class="text-h3  q-px-sm q-py-md">
					Секции курса
				</h3>
			</div>
      <div
        class="col-md-4 q-px-sm q-py-md"
        v-for="section in course.previewCourseSections"
        :key="section.id"
      >
        <q-card>
          <q-card-section class="bg-grey-8 text-white">
            <div class="text-h6">{{ section.name }}</div>
            <div class="text-subtitle2">{{ section.shortDescription }}</div>
          </q-card-section>

          <q-card-actions vertical class="no-padding">
            <q-btn
              flat
              @click="
                $router.push({
                  name: 'courseSection',
                  params: { courseSectionId: section.id },
                })
              "
              >Перейти</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>
