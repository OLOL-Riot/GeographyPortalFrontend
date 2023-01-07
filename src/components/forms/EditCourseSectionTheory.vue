<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";
import { getApi } from "@/api";
import type IUpdateTheory from "@/interfaces/IUpdateTheory";
import type { AxiosResponse } from "axios";
import type ITheory from "@/interfaces/ITheory";
import type ITheorySection from "@/interfaces/ITheorySection";
import EditingToolBar from "../EditingToolBar.vue";

const props = defineProps({
  theoryId: {
    type: String,
    required: true,
  },
  success: {
    type: Function,
    default: () => {},
  },
});

const theory = ref({} as IUpdateTheory);

function onReset() {
  getApi().then((api) => {
    api
      .get("api/Theory/" + props.theoryId)
      .then((response: AxiosResponse<ITheory>) => {
        const defaultValue: IUpdateTheory = {
          name: response.data.name,
          description: response.data.description,
          shortDescription: response.data.shortDescription,
          theorySections: response.data.theorySections,
        };

        theory.value = defaultValue;
      });
  });
}

onReset();

const $q = useQuasar();

function onSubmit() {
  getApi().then((api) =>
    api
      .put("api/Theory/" + props.theoryId, theory.value)
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

function addNewTheorySection() {
  theory.value.theorySections.push({
    header: "",
    serialNumber: 0,
    content: "",
  } as ITheorySection);
}
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <q-card>
      <q-card-section>
        <h4 class="q-mb-md">Изменение теоретической секции курса</h4>
        <q-input
          filled
          v-model="theory.name"
          label="Название секции"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
        />

        <q-input
          filled
          v-model="theory.shortDescription"
          label="Краткое описание"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
        />

        <p class="sub-title">Полное описание</p>
        <q-editor v-model="theory.description" min-height="5rem" />
      </q-card-section>
      <q-card-section class="theory-block">
        <h5 class="q-mb-md">Теоретические блоки</h5>
        <q-card
          class="theory-block__item"
          v-for="(theorySection, key) in theory.theorySections"
          :key="key"
        >
          <EditingToolBar
            :to-remove="
              () =>
                (theory.theorySections = theory.theorySections.filter(
                  (item) => item !== theorySection
                ))
            "
          />
          <q-input
            filled
            v-model="theorySection.header"
            label="Заголовок"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Введите что-нибудь']"
          />
          <q-input
            filled
            v-model="theorySection.serialNumber"
            label="Порядковый номер"
            type="number"
            lazy-rules
            :rules="[(val) => val !== '' || 'Введите что-нибудь']"
          />
          <p class="sub-title">Содержание</p>
          <q-editor v-model="theorySection.content" min-height="5rem" />
        </q-card>
        <q-btn
          label="Добавить теоретический блок"
          class="full-width"
          color="green"
          @click="addNewTheorySection"
        />
      </q-card-section>
      <q-card-actions vertical class="no-padding q-mt-auto bg-white">
        <q-btn
          label="Применить"
          class="full-width"
          type="submit"
          color="blue"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>
<style lang="sass" scoped>
.theory-block
  padding-bottom: 40px
  &__item
    padding: 15px 10px
    margin-block: 20px

.sub-title
  margin-bottom: 5px
  font-weight: 500
</style>
