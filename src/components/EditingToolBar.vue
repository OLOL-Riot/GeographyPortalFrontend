<script setup lang="ts">
import { useQuasar } from "quasar";

const props = defineProps({
  toEdit: {
    type: Function,
  },
  toRemove: {
    type: Function,
  },
});

const $q = useQuasar();

function confirmRemove() {
  if (typeof props.toRemove !== "undefined") {
    const remove = props.toRemove;

    $q.dialog({
      title: "Удаление курса",
      message: "Вы действительно хотите удалить курс?",
      cancel: true,
      persistent: true,
      ok: {
        color: "red",
      },
    }).onOk(() => {
      remove();
    });
  }
}

function edit() {
  if (typeof props.toEdit !== "undefined") {
    props.toEdit();
  }
}
</script>

<template>
  <div class="toolbar">
    <div class="toolbar__item">
      <q-btn
        v-if="toEdit"
        color="primary"
        icon="edit"
        label=""
        @click="edit"
      />
    </div>
    <div class="toolbar__item">
      <q-btn
        v-if="toRemove"
        color="red"
        icon="delete"
        label=""
        @click="confirmRemove"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  right: 5px;
  top: 5px;
  height: 100%;
  gap: 5px;
  &__item {
    z-index: 10;
  }
}
</style>
