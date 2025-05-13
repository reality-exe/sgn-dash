<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

const nuxtApp = useNuxtApp();
const pb = nuxtApp.$pb;
const loading = ref(true);

const isDesktop = useMediaQuery('(min-width: 800px)')

const { data: stargates } = useAsyncData('gates-1', async () => pb.collection('stargates').getFullList())
const account = pb.authStore.model;

async function logout() {
  pb.authStore.clear();
  reloadNuxtApp()
}

watch([stargates], () => {
  loading.value = false
}, {
  once: true
})

// TODO: Figure out some better way to update the list
pb.collection('stargates').subscribe('*', () => {
  refreshNuxtData()
})

const glyphs = ref('text');
const glyphNames: any = {
  text: "Text",
  mw: "Milky Way",
  uni: "Universe",
  pg: "Pegasus"
};

</script>

<template>
  <div>
    <div class="font-ancient w-full pointer-events-none fixed bottom-1 text-center text-4xl text-muted">
      Nou
      Ani
      Anquietas</div>
    <header class="w-full h-18 bg-neutral-900 flex items-center px-4">
      <div class="flex-1 flex items-center gap-4">
        <img src="/images/AoR_Chevron2.png" width="46" height="46" />
        <p class="text-xl font-medium">Ancients of Resonite</p>
      </div>
      <div class="flex-0 flex justify-end gap-2">
        <div v-if="!account">
          <Button class="h-12" @click="navigateTo('/login')" variant="ghost">Login</Button>
        </div>
        <ClientOnly fallback="loading...">
          <GlyphSelector />
        </ClientOnly>
        <div v-if="account">
          <Popover>
            <PopoverTrigger>
              <Button class="h-12 px-4" as-child variant="outline">
                <div class="flex gap-2 items-center justify-center">
                  <Avatar>
                    <AvatarImage :src="pb.getFileUrl(account, account.avatar ?? '')" alt="pfp" />
                    <AvatarFallback>{{ account.username.slice(0, 2) }}</AvatarFallback>
                  </Avatar>
                  <div v-if="isDesktop">
                    <p class="font-bold">Hello, {{ account.username }}</p>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="space-y-4">
              <Button class="w-full" v-if="account.tags.includes('admin')" @click="navigateTo('/admin/dashboard')">Admin
                Panel</Button>
              <Button @click="logout" class="w-full" variant="destructive">Logout</Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
    <div class="mb-96">
      <div v-if="!loading && stargates!.length == 0">
        <h1 class="text-4xl font-bold">There are currently no gates online.</h1>
      </div>
      <div v-if="!loading" class="flex gap-4 p-4 flex-wrap justify-center">
        <MainGateItem class="flex-1" v-for="i in stargates" :gate="i" :glyph-display="glyphs" />
      </div>
      <div v-if="loading" class="flex gap-4 p-4 flex-wrap justify-center">
        <Skeleton class="w-96 h-44" />
        <Skeleton class="w-96 h-44" />
        <Skeleton class="w-96 h-44" />
        <Skeleton class="w-96 h-44" />
      </div>
    </div>
  </div>
</template>
