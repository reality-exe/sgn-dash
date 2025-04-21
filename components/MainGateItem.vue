<script lang="ts" setup>
import type { RecordModel } from 'pocketbase';
import type { Stargate } from '~/plugins/types/pocketbaseTypes';

defineProps<{ gate: RecordModel }>()
</script>

<template>
    <div>
        <Card class="w-[345px] gap-0 p-3.5">
            <CardHeader class="gap-1 px-0">
                <CardTitle>
                    <div class="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <Icon :name="gate.is_headless ? 'mdi:server' : 'mdi:account'" />
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
</template>
