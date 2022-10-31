<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { RouterLink, RouterView } from "vue-router";
import RegistrationForm from "./components/forms/RegistrationForm.vue";
import AuthorizationForm from "./components/forms/AuthorizationForm.vue";

const modalReg = ref();
const modalAuth = ref();
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
        <q-btn stretch flat label="Log In" @click="modalAuth = true"/>
        <q-separator dark vertical />
        <q-btn stretch flat label="Sign Up" @click="modalReg = true"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <RouterView />
      
      <q-dialog v-model="modalReg">
        <RegistrationForm/>
      </q-dialog>

      <q-dialog v-model="modalAuth">
        <AuthorizationForm/>
      </q-dialog>

    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
