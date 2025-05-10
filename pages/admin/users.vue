<script lang="ts" setup>
definePageMeta({
  middleware: "admin",
  layout: "admin"
})
import type { ListResult } from 'pocketbase';
import type { Stargate, User } from '~/plugins/types/pocketbaseTypes';

useHead({
  title: "SGN | Users"
})
const nuxt = useNuxtApp()

const pb = nuxt.$pb;

const users = ref<User[]>([]);

const pagedUsers = ref<ListResult<User>>({
  totalItems: 0,
  totalPages: 0,
  page: 0,
  perPage: 8,
  items: []
});

async function getUsers() {
  users.value = await pb.collection('users').getFullList({ requestKey: "admin-full" })
}

async function changePage(page: number) {
  pagedUsers.value = await pb.collection('users').getList(page, 8, { requestKey: "admin-paged" })
}

onMounted(() => {
  getUsers()
  changePage(0)
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
                  <a href="/admin/dashboard">
                    Admin
                  </a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <a href="/admin/users">
                    Users
                  </a>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              User Count
            </CardTitle>
            <CardDescription>
              A count of each gate type
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-wrap gap-2 justify-center">
            <div
              class="bg-neutral-900 min-w-[175px] rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
              <p class="font-bold text-2xl">Users</p>
              <p class="text-3xl">{{ users.length }}</p>
            </div>
            <div
              class="bg-neutral-900 min-w-[175px] rounded-lg flex-1 flex h-32 p-2 flex-col gap-2 justify-center items-center">
              <p class="font-bold text-2xl">Administrators</p>
              <p class="text-3xl">{{users.filter((v) => v.tags.includes('admin')).length}}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <!-- Paged Gate List --->
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>A detailed paged list of all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="border-neutral-800 border-1 rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-2" />
                  <TableHead class="w-10">
                    Username
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead class="w-2" />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="user in pagedUsers.items" :key="user.id">
                  <TableCell>
                    <Avatar class="size-10">
                      <AvatarImage :src="pb.getFileUrl(user, user.avatar ?? '')" alt="pfp" />
                      <AvatarFallback>{{ user.username.slice(0, 2) }}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{{ user.username }}</TableCell>
                  <TableCell>{{ user.email }}</TableCell>
                  <TableCell class="space-x-2 overflow-scroll">
                    <Badge v-for="tag in user.tags">
                      {{ tag }}
                    </Badge>
                    <span v-if="user.tags.length == 0">
                      User has no assigned tags
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost">
                      <Icon class="text-lg" name="mdi:dots-horizontal" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div class="flex gap-2 w-full mt-4 items-center">
            <p class="flex-0 min-w-fit text-neutral-400">{{ pagedUsers?.totalItems }} total users</p>
            <div class="flex-1" />
            <Button variant="outline" size="icon" @click="changePage(1)">
              <Icon name="mdi:chevron-double-left" />
            </Button>
            <Button variant="outline" size="icon" @click="changePage(pagedUsers!.page - 1)">
              <Icon name="mdi:chevron-left" />
            </Button>
            <p>{{ pagedUsers?.page }}/{{ pagedUsers?.totalPages }}</p>
            <Button variant="outline" size="icon" @click="changePage(pagedUsers!.page + 1)">
              <Icon name="mdi:chevron-right" />
            </Button>
            <Button variant="outline" size="icon" @click="changePage(pagedUsers!.totalPages)">
              <Icon name="mdi:chevron-double-right" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </TooltipProvider>

</template>
