<script lang="ts" setup>
const nuxt = useNuxtApp();
const pb = nuxt.$pb;

const user = await pb.collection('users').authRefresh();
</script>

<template>
  <div>
    <SidebarProvider>

      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div class="flex gap-2">
                <div class="flex size-10 items-center justify-center">
                  <img src="/images/AoR_Chevron2.png" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">Stargate Network</span>
                  <span class="truncate text-xs">Admin Panel</span>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenuButton as-child>
            <a href="/admin/dashboard">
              <Icon class="text-lg" name="mdi:view-dashboard" />
              <span>Dashboard</span>
            </a>
          </SidebarMenuButton>
          <SidebarMenuButton as-child>
            <a href="/admin/stargates">
              <Icon class="text-lg" name="mdi:view-list" />
              <span>Stargates</span>
            </a>
          </SidebarMenuButton>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div class="flex gap-2 items-center">
                <div class="flex size-10 items-center rounded-lg bg-accent justify-center">
                  {{ user.record.username.slice(0, 1) }}
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">{{ user.record.username }}</span>
                  <span class="truncate text-xs">{{ user.record.email }}</span>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div class="p-4">
          <slot />

        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
