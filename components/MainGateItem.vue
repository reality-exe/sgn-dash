<script lang="ts" setup>
import type { RecordModel } from 'pocketbase';
import type { Stargate } from '~/plugins/types/pocketbaseTypes';

defineProps<{ gate: Stargate, glyphDisplay: string }>()
</script>

<template>
  <div>
    <TooltipProvider disableHoverableContent>
      <Card class="min-w-[250px] gap-0 p-3.5">
        <CardHeader class="gap-1 px-0">
          <CardTitle>
            <div class="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger as-child>
                  <Icon :name="gate.is_headless ? 'mdi:server' : 'mdi:account'" />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{{ gate.is_headless ? "Headless Session" : "User Session" }}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Icon v-if="!gate.public_gate" name="mdi:lock" />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>This session is hidden from the public list</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger as-child>
                  <p class="text-xl h-7 overflow-clip">{{ gate.session_name }}</p>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{{ gate.session_name }}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardTitle>
          <CardDescription>{{ gate.owner_name }}</CardDescription>
        </CardHeader>
        <CardContent class="px-0">
          <div>
            <div class="flex justify-between">
              <p class="font-bold">Gate Address</p>
              <p
                :class="{ 'font-mw text-lg': glyphDisplay == 'mw', 'font-pg text-2xl': glyphDisplay == 'pg', 'font-uni text-4xl': glyphDisplay == 'uni' }">
                {{ gate.gate_address }}<span class="text-purple-400">{{ gate.gate_code }}</span></p>
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
    </TooltipProvider>
  </div>
</template>
