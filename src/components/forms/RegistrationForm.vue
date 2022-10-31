<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";

//import { api } from '../../api'

const $q = useQuasar();

const firstName = ref(null);
const lastName = ref(null);
const login = ref(null);
const email = ref(null);
const phoneNumber = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const age = ref(null);
const accept = ref(false);
const openPwd = ref(false);
const openConfirmPwd = ref(false);

function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    openPwd.value = false;
    openConfirmPwd.value = false;

    axios
      .post("http://localhost:5242/api/Authentification/registration", {
        firstName: firstName.value,
        lastName: lastName.value,
        login: login.value,
        email: email.value,
        password: password.value,
        phoneNumber: phoneNumber.value,
        confirmPassword: confirmPassword.value,
      })
      .then((response) => {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Ok!",
        });
      })
      .catch((err) => {
        console.log(err);
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: err.response.data.title,
        });
      });
  }
}

function onReset() {
  firstName.value = null;
  lastName.value = null;
  login.value = null;
  email.value = null;
  age.value = null;
  accept.value = false;
  password.value = null;
  confirmPassword.value = null;
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h4>Registration</h4>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mt-md">
      <q-input
        filled
        v-model="firstName"
        label="Your first name *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="lastName"
        label="Your last name *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="login"
        label="login *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="email"
        label="Email *"
        hint="Your email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="phoneNumber"
        label="Phone number *"
        hint="Your phone number"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="password"
        label="Password"
        hint="Your new password"
        lazy-rules
        :type="!openPwd ? 'password' : 'text'"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:append>
          <q-icon
            :name="!openPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            v-on:click="openPwd = !openPwd"
          ></q-icon>
        </template>
      </q-input>

      <q-input
        filled
        v-model="confirmPassword"
        label="Confirm password"
        hint="Confirm your new password"
        lazy-rules
        :type="!openConfirmPwd ? 'password' : 'text'"
        :rules="[
          (val) => (val && val == password) || 'Please confirm password',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="!openConfirmPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            v-on:click="openConfirmPwd = !openConfirmPwd"
          ></q-icon>
        </template>
      </q-input>

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Sing Up" class="full-width" type="submit" color="red" />
        <q-btn
          label="Reset"
          type="reset"
          color="red"
          flat
          class="full-width q-mt-md"
        />
      </div>
    </q-form>
  </div>
</template>
