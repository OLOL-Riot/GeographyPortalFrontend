<script setup lang="ts">
import { isAdministrator } from "@/roles";
import EditingToolBar from "@/components/EditingToolBar.vue";

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
  toEdit: {
    type: Function,
    default: (sectionId: string) => {},
  },
  toRemove: {
    type: Function,
    default: (sectionId: string) => {},
  },
});
</script>

<template>
  <div class="col-md-4 col-12 q-px-sm q-py-md">
    <q-card class="course-section bg-grey-8">
      <q-card-section class="bg-grey-8 text-white">
        <EditingToolBar
          v-if="isAdministrator()"
          :to-remove="() => toRemove(id)"
          :to-edit="() => toEdit(id)"
        />
        <div class="course-section__title">
          <h5 class="text-h6">{{ name }}</h5>
        </div>
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

<style lang="sass" scoped>
.course-section
  display: flex
  flex-direction: column
  min-height: 200px

  &__title
    position: relative
    margin-inline: auto
    padding: 25px 30px 5px

  &__edit-btn
    position: absolute
    right: 0
    top: 0
    padding: 7px
    border-radius: 100%
    z-index: 1
</style>
