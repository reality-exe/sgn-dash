<script setup lang="ts">
import { type AuthModel, type RecordModel } from 'pocketbase';

let gates = ref<RecordModel[]>([]);
const nuxtApp = useNuxtApp();
const pb = nuxtApp.$pb;

const account = pb.authStore.model;

async function getGates() {
    gates.value = await pb.collection("stargates").getFullList();
}
getGates()

function serverIcon(b:boolean) {
    return b ? "mdi:server" : "mdi:account"
}
</script>

<template>
    <div>
        <header class="w-full h-16 bg-neutral-900 flex items-center px-4">
            <div class="flex-1 flex items-center gap-4">
                <img src="/images/AoR_Chevron2.png" width="46" height="46" />
                <p class="text-xl font-medium">Ancients of Resonite</p>
            </div>
            <div class="">a</div>
            <div class="flex-1 flex justify-end">
                <div v-if="!account">
                    <Button @click="navigateTo('/login')">Login</Button>
                </div>
                <div v-if="account">
                    <Button @click="navigateTo('/admin/dashboard')">Admin Dash</Button>
                </div>
            </div>
        </header>
        <div class="mb-96">
            <div class="flex gap-4 p-4 flex-wrap justify-center">
                <MainGateItem v-for="i in gates" :gate="i" />
            </div>
        </div>
    </div>
</template>
