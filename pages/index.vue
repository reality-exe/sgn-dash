<script setup lang="ts">
import type { RecordModel } from 'pocketbase';

let gates: RecordModel[] = [];
const nuxtApp = useNuxtApp();
const pb = nuxtApp.$pb;

async function getGates() {
    gates = await pb.collection("stargates").getFullList();
}
getGates()
</script>

<template>
    <div>
        <p  v-for="gate in gates">
            {{ gate.gate_address }} => {{ gate.owner_name }}
        </p>
        <Button onclick="getGates()">Refresh</Button>
    </div>
</template>
