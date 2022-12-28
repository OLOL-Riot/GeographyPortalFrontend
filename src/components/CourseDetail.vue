<script setup lang="ts">
import { isAdministrator } from "@/roles";
import { useQuasar } from "quasar";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  toEdit: {
    type: Function,
  },
});
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-12">
        <div class="main-title">
          <h1 class="text-h1">
            {{ name }}
          </h1>
          <q-btn
            class="main-title__edit-btn"
            icon="edit"
            color="blue"
            v-if="toEdit && isAdministrator()"
            @click="toEdit && toEdit()"
          />
        </div>
        <div class="text-body1 q-mt-md" v-html="description"></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
.main-title
  position: relative
  width: max-content
  margin-inline: auto
  padding-inline: 35px

  &__edit-btn
    position: absolute
    right: 0
    top: 0
    padding: 10px
    border-radius: 100%
    z-index: 1
</style>
