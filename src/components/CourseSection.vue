<script setup lang="ts">
import { isAdministrator } from "@/roles";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  testId: {
    type: String,
    required: true,
  },
  toEdit: {
    type: Function,
  },
});
</script>

<template>
  <div class="container">
    <div class="course-section-title">
      <h1 class="text-h4 q-pb-md">{{ name }}</h1>
      <q-btn
        class="course-section-title__edit-btn"
        icon="edit"
        color="blue"
        v-if="toEdit && isAdministrator()"
        @click="toEdit && toEdit()"
      />
    </div>

    <slot></slot>

    <div class="row q-pa-md">
      <q-btn
        class="q-mx-auto"
        color="primary"
        label="Перейти к тесту"
        @click="$router.push({ name: 'test', params: { testId: testId } })"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.course-section-title
  position: relative
  width: max-content
  margin-inline: auto
  padding-inline: 55px

  &__edit-btn
    position: absolute
    right: 0
    top: 0
    padding: 10px
    border-radius: 100%
    z-index: 1
</style>
