<script setup lang="ts">
import { getUnauthorizedApi } from "@/api";
import type { AxiosError, AxiosResponse } from "axios";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { IConfirmEmailRequest } from "@/interfaces/IConfirmEmail"

const route = useRoute();
const $q = useQuasar();
const api = getUnauthorizedApi();

const idUser = ref(route.query.id as string);
const tokenConfirmEmail = ref(route.query.token as string);
const isConfirmed = ref(false as boolean);

function confirmEmail() {
    const formattedToken = (((tokenConfirmEmail.value.replace("%2B", "+")).replace("%2F", "/")).replace("%3D%3D", "=="));

    const confirmEmailRequest: IConfirmEmailRequest = { id: idUser.value, token: formattedToken }

    api.post("/api/Authentification/confirm-email", confirmEmailRequest)
        .then((response) => {
            isConfirmed.value = true;

        })
        .catch((err: AxiosError) => {
            $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: err.message,
            });
        });
}



</script>

<template>
    <div class="container">
        <div class="page-confirm-email-result" v-if="!isConfirmed">
            <div class="text-h4 q-pt-md text-center">Почта ещё не подтверждена!</div>
            <div class="fail-confirm-email-container">
                <div class="row q-pa-md">
                    <q-btn class="q-mx-auto" color="blue" label="Подтвердить почту" @click="confirmEmail()" />
                </div>
            </div>
        </div>
        <div class="success-confirm-email-container" v-else>
            <h1 class="text-h4 q-pt-md text-center">Почта успешно подтверждена!</h1>
            <div class="row q-pa-md">
                <q-btn class="q-mx-auto" color="green" label="Перейти на главную страницу"
                    @click="$router.push({ name: 'home' })" />
            </div>
        </div>
    </div>
</template>