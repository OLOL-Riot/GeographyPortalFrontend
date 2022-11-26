<script setup lang="ts">
import { getApi } from "@/api";
import { useQuasar } from "quasar";
import type { ICourseSection} from "@/interfaces/ICourse"

const props = defineProps({
  sections: {
    type: String,
    required: true,
  },
});

const $q = useQuasar();
const api = getApi();


</script>

<template>
  <div class="container">
    
  </div>
</template>

<style scoped>
</style>
