<script setup lang="ts">
import { getApi } from "@/api";
import type { AxiosError, AxiosResponse } from "axios";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const $q = useQuasar();
const api = getApi();

const id = ref(route.query.id as string);
const token = ref(route.query.token as string);
const isConfirmed = ref(false as boolean);

api
    .get("/api/Authentification/confirm-email?id=" + id + "&token=" + token)
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
            <h1 class="text-h4 q-pb-md absolute-center" v-if="isConfirmed">Почта успешно подтверждена!</h1>
            <h1 class="text-h4 q-pb-md absolute-center" v-else>Почта не подтверждена!</h1>
        </div>
    </div>
</template>