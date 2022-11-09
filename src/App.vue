<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { RouterView, useRouter } from "vue-router";
import RegistrationForm from "@/components/forms/RegistrationForm.vue";
import AuthorizationForm from "@/components/forms/AuthorizationForm.vue";
import { LocalStorage } from "quasar";
import type authToken from "@/interfaces/IAuthToken";

const modalReg = ref(false);
const modalAuth = ref(false);
const regLogin = ref("");
const regPass = ref("");

const username = ref("");

const $router = useRouter();

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
</script>

<template>
  <q-layout view="lhr lpR lFr">
    <q-header
      reveal
      elevated
      class="bg-red-7 text-white q-px-xl"
      height-hint="98"
    >
      <q-toolbar>
        <q-avatar>
          <img src="@/assets/logo.png" />
        </q-avatar>

        <q-toolbar-title>RL Portal</q-toolbar-title>
        <q-space />

        <div class="flex" v-if="!checkAuth">
          <q-btn stretch flat label="Log In" @click="modalAuth = true" />
          <q-separator dark vertical />
          <q-btn stretch flat label="Sign Up" @click="modalReg = true" />
        </div>
        <div class="flex" v-else>
          <q-btn stretch flat :label="username" @click="toAccountPage()" />
          <q-separator dark vertical />
          <q-btn stretch flat label="Log out" @click="exitFromAuth" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <RouterView />

      <q-dialog v-model="modalReg">
        <RegistrationForm :success="transitToAuth" />
      </q-dialog>

      <q-dialog v-model="modalAuth">
        <AuthorizationForm
          :defaultLogin="regLogin"
          :defaultPassword="regPass"
          :success="successAuth"
        />
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
