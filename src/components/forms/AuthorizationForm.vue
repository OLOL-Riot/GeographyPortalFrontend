<script setup lang="ts">
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { LocalStorage } from "quasar";
import { ref } from "vue";
import type IAuthToken from "@/interfaces/IAuthToken";
import axios, { AxiosError } from "axios";
import type IRequestError from "@/interfaces/IRequestError";
// @ts-ignore
import jwt_decode from "jwt-decode";
import type IDecodedToken from "@/interfaces/IDecodedToken";

const props = defineProps({
  defaultLogin: String,
  defaultPassword: String,
  success: {
    type: Function,
    default: () => {},
  },
});

const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const login = ref();
const password = ref();

login.value = props.defaultLogin;
password.value = props.defaultPassword;

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
    axios
      .post("http://localhost:5242/api/Authentification/login", {
        login: login.value,
        password: password.value,
      })
      .then((response) => {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Ok!",
        });

        let decodeToken = jwt_decode(response.data.token) as IDecodedToken;

        let authToken = {
          login: login.value,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          role: {
            value:
              decodeToken[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ],
          },
        } as IAuthToken;

        LocalStorage.set("auth", authToken);

        $router.push({ name: "account" });

        props.success();
      })
      .catch((err: AxiosError<IRequestError>) => {
        console.log(err);
        if (typeof err.response !== "undefined")
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: err.response.data.error,
          });
        else
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: err.message,
          });
      });
  }
}

function onReset() {
  login.value = null;
  password.value = null;
}
</script>

<template>
  <q-card class="q-pa-md" style="max-width: 400px; width: 100%">
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
  </q-card>
</template>
