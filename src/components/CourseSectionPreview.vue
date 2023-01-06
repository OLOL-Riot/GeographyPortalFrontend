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
  shortDescription: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="col-md-4 col-12 q-px-sm q-py-md">
    <q-card class="course-section bg-grey-8">
      <q-card-section class="bg-grey-8 text-white">
        <div class="text-h6">{{ name }}</div>
        <div class="text-subtitle2">{{ shortDescription }}</div>
      </q-card-section>

      <q-card-actions vertical class="no-padding q-mt-auto bg-white">
        <q-btn
          flat
          @click="
            $router.push({
              name: 'courseSection',
              params: { courseSectionId: id },
            })
          "
          >Перейти</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<style scoped>
.course-section {
  display: flex;
  flex-direction: column;
  min-height: 200px;
}
</style>
