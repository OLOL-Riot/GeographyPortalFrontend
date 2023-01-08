<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";
import RegistrationForm from "@/components/forms/RegistrationForm.vue";
import AuthorizationForm from "@/components/forms/AuthorizationForm.vue";
import RollBackBtn from "./components/RollBackBtn.vue";
import { LocalStorage } from "quasar";
import type authToken from "@/interfaces/IAuthToken";

const modalReg = ref(false);
const modalAuth = ref(false);
const regLogin = ref("");
const regPass = ref("");

const username = ref(
  LocalStorage.getItem("auth")
    ? (LocalStorage.getItem("auth") as authToken).login
    : ""
);

const $router = useRouter();
const $route = useRoute();

const checkAuth = ref(LocalStorage.getItem("auth") !== null);

function transitToAuth(login: string, password: string) {
  modalReg.value = false;
  modalAuth.value = true;

  regLogin.value = login;
  regPass.value = password;
}

function exitFromAuth() {
  localStorage.removeItem("auth");
  checkAuth.value = false;
  $router.push({ name: "home" });
}

function toAccountPage() {
  $router.push({ name: "account" });
}

function successAuth() {
  checkAuth.value = true;
  username.value = (LocalStorage.getItem("auth") as authToken).login;
}

function goHomePage() {
  $router.push({ name: "home" })
}


</script>

<template>
  <q-layout view="lhr lpR lFr">
    <q-header reveal elevated class="bg-primary text-white q-px-xl" height-hint="98">
      <q-toolbar>
        <q-btn flat @click="goHomePage()">
          <q-avatar>
            <img src="@/assets/logo.png" />
          </q-avatar>

          <q-toolbar-title>RL Portal</q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="flex" v-if="!checkAuth">
          <q-btn stretch flat label="Авторизация" @click="modalAuth = true" />
          <q-separator dark vertical />
          <q-btn stretch flat label="Регистрация" @click="modalReg = true" />
        </div>
        <div class="flex" v-else>
          <q-btn stretch flat :label="username" @click="toAccountPage()" />
          <q-separator dark vertical />
          <q-btn stretch flat label="Выйти" @click="exitFromAuth" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <RollBackBtn v-if="!(['home', 'confirmEmail'].includes($route.name as string))" />
      <RouterView />

      <q-dialog v-model="modalReg">
        <RegistrationForm :success="transitToAuth" />
      </q-dialog>

      <q-dialog v-model="modalAuth">
        <AuthorizationForm :defaultLogin="regLogin" :defaultPassword="regPass" :success="successAuth" />
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<style scoped>

</style>
