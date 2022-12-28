<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  theoryName: {
    type: String,
    required: true,
  },
  theoryDescription: {
    type: String,
    required: true,
  },
  testId: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="container">
    <div class="page-course-section-title">
      <h1 class="text-h4 q-pb-md">{{ name }}</h1>
    </div>

    <slot></slot>

    <div class="row q-pa-md">
      <q-btn
        class="q-mx-auto"
        color="green"
        label="Перейти к тесту"
        @click="$router.push({ name: 'test', params: { testId: testId } })"
      />
    </div>
  </div>
</template>

<style scoped>
.page-course-section-title {
  text-align: center;
}
</style>
