<script lang="ts">
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated'
})
useHead({
  title: "SGN | My Profile"
})
</script>

<template>
  <div>
    <!-- Top Bar -->
    <div class="flex gap-2 items-center">
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <a href="/profile">
                Profile
              </a>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </div>
</template>
