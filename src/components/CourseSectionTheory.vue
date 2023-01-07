<script setup lang="ts">
import EditingToolBar from "./EditingToolBar.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  toEdit: {
    type: Function,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <q-card flat bordered class="theory-card">
    <EditingToolBar :to-edit="toEdit" />
    <q-card-section class="q-py-md">
      <div class="text-h5">{{ name }}</div>
    </q-card-section>
    <q-card-section class="q-pb-md">
      <div class="text-body1">{{ description }}</div>
    </q-card-section>

    <slot></slot>
  </q-card>
</template>
