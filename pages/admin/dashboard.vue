<script lang="ts" setup>
definePageMeta({
  middleware: "admin",
  layout: "admin"
})
import type { ListResult } from 'pocketbase';
import { type User, type Stargate } from '~/plugins/types/pocketbaseTypes';

useHead({
  title: "SGN | Dashboard"
})
const nuxt = useNuxtApp()

const pb = nuxt.$pb;

const stargates = ref<Stargate[]>([]);

const pagedGates = ref<ListResult<Stargate>>({
  totalItems: 0,
  totalPages: 0,
  page: 0,
  perPage: 8,
  items: []
});

const users = ref<User[]>([]);

async function getData() {
  stargates.value = await pb.collection('stargates').getFullList({ requestKey: "admin-full" })
  pagedGates.value = await pb.collection('stargates').getList(1, 5, {
    sort: "updated"
  })
  users.value = await pb.collection('users').getFullList({ requestKey: "user request" })
}

onMounted(() => {
  getData()
})

</script>

<template>
  <TooltipProvider>

    <div class="space-y-4">
      <!-- Top Bar -->
      <div>
        <div class="mb-4 flex items-center gap-2">
          <SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <a href="/">
                    Home
                  </a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <a href="/admin/dashboard">
                    Dashboard
                  </a>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

        </div>
        <div class="flex gap-4">
          <Card class="flex-2">
            <CardHeader>
              <CardTitle>
                Active Stargates
              </CardTitle>
              <CardDescription>
                Count of active gates
              </CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-2 justify-center">
              <div
                class="bg-neutral-900 min-w-[175px] rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
                <p class="font-bold text-2xl">Total Gates</p>
                <p class="text-3xl">{{ stargates.length }}</p>
              </div>
              <div
                class="bg-neutral-900 min-w-[175px] rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
                <p class="font-bold text-2xl">Public Gates</p>
                <p class="text-3xl">{{stargates.filter(v => v.public_gate).length}}</p>
              </div>
              <div
                class="bg-neutral-900 min-w-[175px] rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
                <p class="font-bold text-2xl">Hidden Gates</p>
                <p class="text-3xl">{{stargates.filter(v => !v.public_gate).length}}</p>
              </div>
            </CardContent>
          </Card>
          <Card class="flex-0 min-w-[520px]">
            <CardHeader>
              <CardTitle>
                Registered Users
              </CardTitle>
              <CardDescription>
                Count of all registered users
              </CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-2 justify-center">
              <div
                class="bg-neutral-900 min-w-[175px] rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
                <p class="font-bold text-2xl">Total users</p>
                <p class="text-3xl">{{ users.length }}</p>
              </div>
              <div
                class="bg-neutral-900 min-w-[175px] rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
                <p class="font-bold text-2xl">Administrators</p>
                <p class="text-3xl">{{users.filter(v => v.tags.includes('admin')).length}}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <!-- Paged Gate List --->
      <Card>
        <CardHeader>
          <CardTitle>Recently Updated Gates</CardTitle>
          <CardDescription>A list of the 5 most recently updated gates</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="border-neutral-800 border-1 rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-2" />
                  <TableHead class="w-10">
                    Gate Address
                  </TableHead>
                  <TableHead class="w-2">Gate Status</TableHead>
                  <TableHead>Sesson Name</TableHead>
                  <TableHead>Owner Name</TableHead>
                  <TableHead>User Count</TableHead>
                  <TableHead class="w-2" />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="gate in pagedGates?.items" :key="gate.id">
                  <TableCell>
                    <div class="space-x-2 mt-1">
                      <Tooltip>
                        <TooltipTrigger as-child>
                          <Icon class="text-lg" :name="gate.public_gate ? 'mdi:eye-outline' : 'mdi:eye-off-outline'" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Gate public state
                          [{{ gate.public_gate ? "Public Gate" : "Hidden Gate" }}]
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Icon class="text-lg" :name="gate.iris_state ? 'mdi:camera-iris' : 'mdi:circle-outline'" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Gate iris state [{{ gate.iris_state ? "Iris Close" : "Iris Open" }}]
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div class="flex">
                      <p>{{ gate.gate_address }}</p>
                      <span>
                        <Tooltip>
                          <TooltipTrigger class="text-violet-400">{{ gate.gate_code }}</TooltipTrigger>
                          <TooltipContent>Gate code</TooltipContent>
                        </Tooltip>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{{ gate.gate_status }}</TableCell>
                  <TableCell>{{ gate.session_name }}</TableCell>
                  <TableCell>{{ gate.owner_name }}</TableCell>
                  <TableCell>{{ gate.active_users }}/{{ gate.max_users }}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost">
                      <Icon class="text-lg" name="mdi:dots-horizontal" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  </TooltipProvider>

</template>
