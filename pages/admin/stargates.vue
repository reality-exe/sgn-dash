<script lang="ts" setup>
definePageMeta({
  middleware: "admin",
  layout: "admin"
})
import type { ListResult } from 'pocketbase';
import type { Stargate } from '~/plugins/types/pocketbaseTypes';

useHead({
  title: "SGN | Stargates"
})
const nuxt = useNuxtApp()

const pb = nuxt.$pb;

const stargates = ref<Stargate[]>([]);

const pagedGates = ref<ListResult<Stargate>>();

async function getGates() {
  stargates.value = await pb.collection('stargates').getFullList()
}

async function changePage(page: number) {
  pagedGates.value = await pb.collection('stargates').getList(page, 10)
}

onMounted(() => {
  getGates()
  changePage(0)
})

</script>

<template>
  <div class="space-y-4">
    <!-- Top Bar -->
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            Stargate Count
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <span>[{{ stargates.length }}]</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of gates</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>
            A count of each gate type
          </CardDescription>
        </CardHeader>
        <CardContent class="flex gap-2 justify-center">
          <div class="bg-neutral-900 rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
            <p class="font-bold text-2xl">Milky Way</p>
            <p class="text-3xl">{{stargates.filter((v) => v.gate_code == "M@").length}}</p>
          </div>
          <div class="bg-neutral-900 rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
            <p class="font-bold text-2xl">Pegasus</p>
            <p class="text-3xl">{{stargates.filter((v) => v.gate_code == "P@").length}}</p>
          </div>
          <div class="bg-neutral-900 rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
            <p class="font-bold text-2xl">Universe</p>
            <p class="text-3xl">{{stargates.filter((v) => v.gate_code == "U@").length}}</p>
          </div>
          <div class="bg-neutral-900 rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
            <p class="font-bold text-2xl">Dawn</p>
            <p class="text-3xl">{{stargates.filter((v) => v.gate_code == "R@").length}}</p>
          </div>

          <div class="bg-neutral-900 rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
            <p class="font-bold text-2xl">Others</p>
            <p class="text-3xl">{{stargates.filter((v) => v.gate_code != "M@" && v.gate_code != "P@" && v.gate_code !=
              "U@" && v.gate_code != "R@").length}}</p>
          </div>
        </CardContent>
      </Card>
    </div>
    <!-- Paged Gate List --->
    <Card>
      <CardHeader>
        <CardTitle>Stargate List</CardTitle>
        <CardDescription>A detailed paged list of all active stargates</CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  </div>
</template>

<style></style>
