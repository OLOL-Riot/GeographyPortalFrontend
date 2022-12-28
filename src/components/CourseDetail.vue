<script setup lang="ts">
const props = defineProps({
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
  <div class="container text-center">
    <div class="row">
      <div class="col-12">
        <h1 class="text-h1">
          {{ name }}
        </h1>
        <div class="text-body1 q-mt-md" v-html="description"></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
