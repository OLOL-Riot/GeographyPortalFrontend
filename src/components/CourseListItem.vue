<script setup lang="ts">
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
});

</script>

<template>
  <q-card class="col-12">
    <q-card-section class="bg-grey-8 text-white">
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">{{ description }}</div>
    </q-card-section>

    <q-card-actions vertical class="no-padding">
      <q-btn
        flat
        @click="$router.push({ name: 'course', params: { courseId: id } })"
        >Перейти</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

