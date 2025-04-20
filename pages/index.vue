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
                <Card class="w-[345px] gap-0 p-3.5" v-for="(gate) in gates" :key="gate.id">
                    <CardHeader class="gap-1 px-0">
                        <CardTitle>
                            <div class="flex items-center gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger as-child>
                                            <Icon :name="serverIcon(gate.is_headless)" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{{ gate.is_headless ? "Headless Session" : "User Session" }}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <p class="text-xl">{{ gate.session_name }}</p>
                            </div>
                        </CardTitle>
                        <CardDescription>{{ gate.owner_name }}</CardDescription>
                    </CardHeader>
                    <CardContent class="px-0">
                        <div>
                            <div class="flex justify-between">
                                <p class="font-bold">Gate Address</p>
                                <p>{{ gate.gate_address }}<span class="text-purple-400">{{ gate.gate_code }}</span></p>
                            </div>
                            <div class="flex justify-between">
                                <p class="font-bold">Users</p>
                                <p>{{ gate.active_users }}/{{ gate.max_users }}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="font-bold">Gate Status</p>
                                <p>{{ gate.gate_status }}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>
