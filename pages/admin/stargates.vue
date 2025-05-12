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

const pagedGates = ref<ListResult<Stargate>>({
  totalItems: 0,
  totalPages: 0,
  page: 0,
  perPage: 8,
  items: []
});

async function getGates() {
  stargates.value = await pb.collection('stargates').getFullList({ requestKey: "admin-full" })
}

async function changePage(page: number) {
  pagedGates.value = await pb.collection('stargates').getList(page, 8, { requestKey: "admin-paged" })
}

onMounted(() => {
  getGates()
  changePage(0)
})

</script>

<template>
  <TooltipProvider>
    <div class="space-y-4" vaul-drawer-wrapper>
      <!-- Top Bar -->
      <div>
        <div class="mb-4 flex items-center gap-2">
          <SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <a href="/admin/dashboard">
                    Admin
                  </a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <a href="/admin/stargates">
                    Stargates
                  </a>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

        </div>
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
          <CardContent class="flex flex-wrap gap-2 justify-center">
            <div
              class="bg-neutral-900 min-w-[175px] rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
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
                          <Icon class="text-lg"
                            :name="gate.is_headless ? 'mdi:server-outline' : 'mdi:account-outline'" />
                        </TooltipTrigger>
                        <TooltipContent>{{ gate.is_headless ? "Headless Session" : "User Session" }}</TooltipContent>
                      </Tooltip>
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
                    <AdminEdit :stargate="gate" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div class="flex gap-2 w-full mt-4 items-center">
            <p class="flex-0 min-w-fit text-neutral-400">{{ pagedGates?.totalItems }} total active gates</p>
            <div class="flex-1" />
            <Button variant="outline" size="icon" @click="changePage(1)">
              <Icon name="mdi:chevron-double-left" />
            </Button>
            <Button variant="outline" size="icon" @click="changePage(pagedGates!.page - 1)">
              <Icon name="mdi:chevron-left" />
            </Button>
            <p>{{ pagedGates?.page }}/{{ pagedGates?.totalPages }}</p>
            <Button variant="outline" size="icon" @click="changePage(pagedGates!.page + 1)">
              <Icon name="mdi:chevron-right" />
            </Button>
            <Button variant="outline" size="icon" @click="changePage(pagedGates!.totalPages)">
              <Icon name="mdi:chevron-double-right" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </TooltipProvider>

</template>
