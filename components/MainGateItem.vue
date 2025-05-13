<script lang="ts" setup>
import { useClipboard } from '@vueuse/core';
import type { RecordModel } from 'pocketbase';
import type { Stargate } from '~/plugins/types/pocketbaseTypes';

import { useStorage } from '@vueuse/core';

defineProps<{ gate: Stargate }>()

const glyphDisplay = useStorage('glyph-display', 'text', localStorage, { mergeDefaults: true })

const glyphsOpened = ref<boolean>(false)
</script>

<template>
  <div>
    <div v-if="glyphsOpened"
      class="w-full z-50 fixed left-0 top-0 min-h-screen bg-black/50 backdrop-blur-md flex items-center justify-center text-9xl">
      <div class="absolute right-1 top-1 mr-6">
        <Button size="icon" variant="secondary" @click="glyphsOpened = false">X</Button>
      </div>
      <div class="absolute left-1 top-1 ml-6">
        <GlyphSelector />
      </div>
      <p
        :class="{ 'font-mw': glyphDisplay == 'mw', 'font-pg': glyphDisplay == 'pg', 'font-uni': glyphDisplay == 'uni' }">
        {{ gate.gate_address }}<span class="text-violet-400">{{ gate.gate_code }}</span></p>
    </div>
    <div>
      <TooltipProvider disableHoverableContent>
        <Card class="min-w-[245px] gap-0 p-3.5">
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
              <Tooltip>
                <TooltipTrigger as-child>
                  <div @click="glyphsOpened = true" class="flex justify-between cursor-pointer">
                    <p class="font-bold">Gate Address</p>
                    <p
                      :class="{ 'font-mw text-lg': glyphDisplay == 'mw', 'font-pg text-2xl': glyphDisplay == 'pg', 'font-uni text-4xl': glyphDisplay == 'uni' }">
                      {{ gate.gate_address }}<span class="text-purple-400">{{ gate.gate_code }}</span></p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open the gate address in a large popup for better viewing</p>
                </TooltipContent>
              </Tooltip>
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
  </div>
</template>
