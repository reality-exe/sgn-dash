<script setup lang="ts">
import { useStorage } from '@vueuse/core';
const glyphDisplay = useStorage('glyph-display', 'text', localStorage, { mergeDefaults: true })

const glyphNames: any = {
  text: "Text",
  mw: "Milky Way",
  uni: "Universe",
  pg: "Pegasus"
};

</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button class="h-12 px-4" as-child variant="outline">
        <div class="flex gap-2 items-center justify-center">
          <div>
            <p class="font-bold">Glyphs [{{ glyphNames[glyphDisplay] }}]</p>
          </div>
        </div>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="space-y-4">
      <RadioGroup :default-value="glyphDisplay" v-model="glyphDisplay" :orientation="'vertical'">
        <div class="border-1 border-muted rounded p-2 flex items-center space-x-2">
          <RadioGroupItem id="r1" value="text" />
          <Label for="r1">Text</Label>
        </div>
        <div class="border-1 border-muted rounded p-2 flex items-center space-x-2">
          <RadioGroupItem id="r2" value="mw" />
          <Label for="r2">Milky Way</Label>
        </div>
        <div class="border-1 border-muted rounded p-2 flex items-center space-x-2">
          <RadioGroupItem id="r3" value="pg" />
          <Label for="r3">Pegasus</Label>
        </div>
        <div class="border-1 border-muted rounded p-2 flex items-center space-x-2">
          <RadioGroupItem id="r4" value="uni" />
          <Label for="r4">Universe</Label>
        </div>
      </RadioGroup>
    </PopoverContent>
  </Popover>
</template>
