<script setup lang="ts">
import { getUnauthorizedApi } from "@/api";
import type { AxiosError, AxiosResponse } from "axios";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const $q = useQuasar();
const api = getUnauthorizedApi();

const id = ref(route.query.id as string);
const token = ref(route.query.token as string);
const isConfirmed = ref(false as boolean);

api.get("/api/Authentification/confirm-email?id=" + id.value + "&token=" + token.value)
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

</script>

<template>
    <div class="container ">
        <div class="page-confirm-email-title">
            <h1 class="text-h4 q-mx-auto text-center" v-if="isConfirmed">Почта успешно подтверждена!</h1>
            <h1 class="text-h4 q-mx-auto text-center" v-else>Почта не подтверждена!</h1>
        </div>
    </div>
</template>