<script setup lang="ts">
import type IRegistrationPost from "@/interfaces/IRegistrationPost";
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";

const props = defineProps({
  success: {
    type: Function,
    default: (login: string, pass: string) => {},
  },
});

//import { api } from '../../api'

const specChargins = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const mailFormat = /@\w+\.\w+/;
const numbers = /\d/;

const $q = useQuasar();

const firstName = ref("");
const lastName = ref("");
const login = ref("");
const email = ref("");
const phoneNumber = ref("");
const password = ref("");
const confirmPassword = ref("");
const age = ref("");
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

    let regForm: IRegistrationPost = {
      firstName: firstName.value,
      lastName: lastName.value,
      login: login.value,
      email: email.value,
      password: password.value,
      phoneNumber: phoneNumber.value,
      confirmPassword: confirmPassword.value,
    };

    axios
      .post("http://localhost:5242/api/Authentification/registration", regForm)
      .then((response) => {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Ok!",
        });

        props.success(login.value, password.value);
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
  firstName.value = "";
  lastName.value = "";
  login.value = "";
  email.value = "";
  age.value = "";
  accept.value = false;
  password.value = "";
  confirmPassword.value = "";
}
</script>

<template>
  <q-card class="q-pa-md" style="max-width: 500px; width: 100%">
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
        :rules="[
          (val) => (val && val.length > 0) || 'Please type something',
          (val) => mailFormat.test(val) || 'Неверный формат почты',
        ]"
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
        :rules="[
          (val) => (val && val.length > 0) || 'Введите пароль',
          (val) =>
            val.length >= 8 || 'Длина пароля должна быть не меньше 8 символов',
          (val) =>
            specChargins.test(val) ||
            'В пароле должны присутствовать спецсимволы',
          (val) => numbers.test(val) || 'Пароль должен содержать цифры',
          (val) => val.toUpperCase() != val && val.toLowerCase() != val || 'Пароль должен содержать символы в разном регистре',
        ]"
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
        <q-btn label="Sign Up" class="full-width" type="submit" color="red" />
        <q-btn
          label="Reset"
          type="reset"
          color="red"
          flat
          class="full-width q-mt-md"
        />
      </div>
    </q-form>
  </q-card>
</template>
