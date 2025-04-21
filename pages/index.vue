<script setup lang="ts">
import { type AuthModel, type RecordModel } from 'pocketbase';

let gates = ref<RecordModel[]>([]);
const nuxtApp = useNuxtApp();
const pb = nuxtApp.$pb;
const loading = ref(true);

const account = pb.authStore.model;

async function getGates() {
    gates.value = await pb.collection("stargates").getFullList();
}
getGates()
watch([gates], () => {
    loading.value = false
})

</script>

<template>
    <div>
        <header class="w-full h-18 bg-neutral-900 flex items-center px-4">
            <div class="flex-1 flex items-center gap-4">
                <img src="/images/AoR_Chevron2.png" width="46" height="46" />
                <p class="text-xl font-medium">Ancients of Resonite</p>
            </div>
            <div class="font-ancient text-4xl">Nou Ani Anquietas</div>
            <div class="flex-1 flex justify-end">
                <div v-if="!account">
                    <Button @click="navigateTo('/login')" variant="ghost">Login</Button>
                </div>
                <div v-if="account">
                    <Popover>
                        <PopoverTrigger>
                            <Button class="h-12 px-3" variant="outline">
                                <div class="flex gap-2">
                                    <div
                                        class="bg-accent aspect-square p-2 rounded-lg size-8 flex items-center justify-center">
                                        <p>{{ account.username.slice(0, 1) }}</p>
                                    </div>
                                    <div>
                                        <p class="font-bold">Hello, {{ account.username }}</p>
                                        <p>{{ account.username }}</p>
                                    </div>
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            Popover content test
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </header>
        <div class="mb-96">
            <div v-if="!loading && gates.length == 0">
                <h1 class="text-4xl font-bold">There are currently no gates online.</h1>
            </div>
            <div v-if="!loading" class="flex gap-4 p-4 flex-wrap justify-center">
                <MainGateItem v-for="i in gates" :gate="i" />
            </div>
            <div v-if="loading" class="flex gap-4 p-4 flex-wrap justify-center">
                <Skeleton class="w-96 h-44" />
                <Skeleton class="w-96 h-44" />
                <Skeleton class="w-96 h-44" />
                <Skeleton class="w-96 h-44" />
            </div>
        </div>
    </div>
</template>

<style lang="css">
@font-face {
    font-family: 'Anquietas';
    src: url('~/assets/fonts/sg_anq.ttf');
}

.font-ancient {
    font-family: 'Anquietas';
}
</style>
