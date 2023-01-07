<script setup lang="ts">
import { getApi } from "@/api";
import { ref } from "vue";
import type { AxiosError, AxiosResponse } from "axios";
import type { ITest } from "@/interfaces/ITest";
import { useQuasar } from "quasar";
import type IUpdateTest from "@/interfaces/IUpdateTest";
import { QForm } from "quasar";
import EditingToolBar from "@/components/EditingToolBar.vue";

const props = defineProps({
  testId: {
    type: String,
    required: true,
  },
  success: {
    type: Function,
    default: () => {},
  },
});

const $q = useQuasar();

const load = ref(false);
const exerciseListToUpdate = ref({} as IUpdateTest);

function updateTest() {
  console.log("test");
  getApi().then((api) =>
    api
      .put("api/Test/" + props.testId, exerciseListToUpdate.value)
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

function onReset() {
  getApi().then((api) =>
    api
      .get("api/Test/edit/" + props.testId)
      .then((response: AxiosResponse<ITest>) => {
        const responsTest = {
          name: response.data.name,
          exercises: response.data.exercises,
        } as IUpdateTest;

        responsTest.exercises = responsTest.exercises.sort(
          (a, b) => a.serialNumber - b.serialNumber
        );

        exerciseListToUpdate.value = responsTest;
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

onReset();
</script>

<template>
  <div class="container">
    <h3 class="q-mb-lg">Редактирование теста</h3>
    <q-form v-if="load" @submit="updateTest" @reset="onReset">
      <q-input
        class="test-name"
        filled
        v-model="exerciseListToUpdate.name"
        label="Название теста"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
      />
      <div class="q-py-md column justify-center items-center">
        <!-- eslint-disable vue/valid-v-for -->
        <q-card
          class="full-width q-mb-md q-pt-md"
          v-for="exercise in exerciseListToUpdate.exercises"
        >
          <EditingToolBar
            :to-remove="
              () =>
                (exerciseListToUpdate.exercises =
                  exerciseListToUpdate.exercises.filter((el) => el != exercise))
            "
          />
          <q-card-section>
            <q-input
              filled
              v-model="exercise.description"
              label="Текст вопроса"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Введите что-нибудь',
              ]"
            />
            <q-input
              filled
              v-model="exercise.serialNumber"
              type="number"
              label="Порядковый номер вопроса"
              lazy-rules
              :rules="[(val) => val !== '' || 'Введите что-нибудь']"
            />
          </q-card-section>

          <q-separator size="sm" />

          <div class="q-py-sm exercise-list-item-options">
            <q-input
              class="q-mx-md q-my-sm"
              filled
              v-for="(option, key) in exercise.answers"
              :key="key"
              v-model="exercise.answers[key]"
              label="Вариант ответа"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Введите что-нибудь',
              ]"
            >
              <template v-slot:append>
                <q-btn
                  outline
                  round
                  color="red-5"
                  icon="delete"
                  size="sm"
                  @click="
                    exercise.answers = exercise.answers.filter(
                      (el, currentKey) => key != currentKey
                    )
                  "
                />
              </template>
            </q-input>
            <q-btn
              class="q-mx-md q-mb-md"
              color="green-5"
              icon-right="add"
              size="md"
              label="Добавить вариант ответа"
              @click="exercise.answers.push('')"
            />

            <q-select
              class="q-mx-md q-mb-md"
              filled
              v-model="exercise.rightAnswer"
              :options="exercise.answers"
              stack-label
              label="Правельный вариант ответа"
              bg-color="blue-5"
              label-color="white"
            />
          </div>
        </q-card>
        <q-btn
          class="q-mx-md q-mb-md"
          color="green-5"
          icon-right="add"
          size="md"
          label="Добавить вопрос"
          @click="
            exerciseListToUpdate.exercises.push({
              id: null,
              serialNumber: 0,
              description: '',
              answers: [],
              rightAnswer: '',
            })
          "
        />
      </div>
      <div class="row q-pb-sm">
        <q-btn
          label="Применить"
          class="full-width"
          type="submit"
          color="blue"
        />
      </div>
    </q-form>
  </div>
</template>
