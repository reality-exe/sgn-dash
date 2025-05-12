<script lang="ts" setup>
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { ref } from 'vue'
import type { Stargate } from '~/plugins/types/pocketbaseTypes'

import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from 'vue-sonner';
const props = defineProps<{
  stargate: Stargate,
}>()

const nuxt = useNuxtApp()
const pb = nuxt.$pb

const formSchema = toTypedSchema(
  z.object({
    gate_address: z.string().min(6).max(6).default(props.stargate.gate_address),
    gate_code: z.string().min(2).max(2).default(props.stargate.gate_code),
    session_name: z.string().default(props.stargate.session_name),
    owner_name: z.string().default(props.stargate.owner_name),
    public_gate: z.string().default(String(props.stargate.public_gate)),
    gate_status: z.string().default(props.stargate.gate_status)
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')

const isOpen = ref(false)

const tryEdit = form.handleSubmit(async (values) => {
  pb.collection('stargates').update(props.stargate.id, {
    gate_address: values.gate_address,
    gate_code: values.gate_code,
    public_gate: values.public_gate == 'true',
    gate_status: values.gate_status,
    owner_name: values.owner_name,
    session_name: values.session_name
  })
  isOpen.value = false
  toast('Saved stargate data')
})
</script>

<template>
  <UseTemplate>
    <form @submit="tryEdit" class="space-y-4 px-4">
      <div class="flex gap-2">
        <FormField v-slot="{ componentField }" name="gate_address">
          <FormItem class="flex-1">
            <FormLabel>Gate Address</FormLabel>
            <FormControl>
              <Input disabled type="text" :default-value="stargate.gate_address" placeholder="AEN2ZU"
                v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="gate_code">
          <FormItem class="flex-1">
            <FormLabel>Gate Code</FormLabel>
            <FormControl>
              <Input disabled type="text" :default-value="stargate.gate_code" placeholder="M@"
                v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
      </div>
      <FormField v-slot="{ componentField }" name="session_name">
        <FormItem>
          <FormLabel>Session Name</FormLabel>
          <FormControl>
            <Input type="text" :default-value="stargate.session_name" placeholder="Some gate name"
              v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="owner_name">
        <FormItem>
          <FormLabel>Owner Name</FormLabel>
          <FormControl>
            <Input type="text" :default-value="stargate.owner_name" placeholder="Some gate name"
              v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex gap-2">
        <FormField v-slot="{ componentField }" name="gate_status">
          <FormItem class="flex-1">
            <Select v-bind="componentField" :default-value="stargate.gate_status">
              <FormLabel>Gate Status</FormLabel>
              <FormControl>
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Set gate status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="IDLE">
                    Idle (Close)
                  </SelectItem>
                  <SelectItem value="INCOMING7">
                    Incoming (7 Chevron)
                  </SelectItem>
                  <SelectItem value="INCOMING9">
                    Incoming (8 Chevron)
                  </SelectItem>
                  <SelectItem value="INCOMING8">
                    Incoming (9 Chevron)
                  </SelectItem>
                  <SelectItem disabled value="OPEN">
                    Open
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="public_gate">
          <FormItem class="flex-1">
            <Select v-bind="componentField" :default-value="String(stargate.public_gate)">
              <FormLabel>Gate Publicity</FormLabel>
              <FormControl>
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Set gate status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true">
                    Public
                  </SelectItem>
                  <SelectItem value="false">
                    Hidden
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>
      </div>
      <Button class="w-full" type="submit">Save</Button>
    </form>
  </UseTemplate>

  <Dialog v-if="isDesktop" v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="ghost" size="icon">
        <Icon name="mdi:pencil-outline" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit stargate</DialogTitle>
        <DialogDescription>
          Editing stargate <span class="bg-muted p-1 rounded text-white italic">{{ stargate.gate_address }}<span
              class="text-violet-400">{{ stargate.gate_code }}</span></span>
        </DialogDescription>
      </DialogHeader>
      <GridForm />
    </DialogContent>
  </Dialog>

  <Drawer v-else v-model:open="isOpen">
    <DrawerTrigger as-child>
      <Button variant="ghost" size="icon">
        <Icon name="mdi:pencil-outline" />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle>Edit stargate</DrawerTitle>
        <DrawerDescription>
          Editing stargate <span class="bg-muted p-1 rounded text-white italic">{{ stargate.gate_address }}<span
              class="text-violet-400">{{ stargate.gate_code }}</span></span>
        </DrawerDescription>
      </DrawerHeader>
      <GridForm />
      <DrawerFooter class="pt-2">
        <DrawerClose as-child>
          <Button variant="outline">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
