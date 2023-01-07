<script setup lang="ts">
import EditingToolBar from "@/components/EditingToolBar.vue";
import { isAdministrator } from "@/roles";

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
  onRemove: {
    type: Function,
    default: (id: string) => {},
  },
});
</script>

<template>
  <q-card class="col-12 course-preview bg-grey-8 column">
    <EditingToolBar
      v-if="isAdministrator()"
      :to-remove="() => onRemove(id)"
    />

    <q-card-section class="text-white">
      <h6 class="text-h6">{{ name }}</h6>
      <div class="text-subtitle2" v-html="description"></div>
    </q-card-section>

    <q-card-actions vertical class="bg-white no-padding q-mt-auto">
      <q-btn
        flat
        @click="$router.push({ name: 'course', params: { courseId: id } })"
        >Перейти</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped>
.course-preview {
  position: relative;
  min-height: 150px;
}
</style>
