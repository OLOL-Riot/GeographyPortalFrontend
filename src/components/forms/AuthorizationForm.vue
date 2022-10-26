<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";

const $q = useQuasar();

const login = ref(null);
const password = ref(null);

function onSubmit() {
  let result = true;

  if (result !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
}

function onReset() {
  login.value = null;
  password.value = null;
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h4>Authorization</h4>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mt-md">
      <q-input
        filled
        v-model="login"
        label="login"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="password"
        label="Password"
        lazy-rules
        type="password"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Log in" class="full-width" type="submit" color="red" />
      </div>
    </q-form>
  </div>
</template>
