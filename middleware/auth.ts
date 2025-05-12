export default defineNuxtRouteMiddleware((to, from) => {
  const nuxt = useNuxtApp();
  const account = nuxt.$pb.authStore.model;

  if (account) {
    return navigateTo('/');
  } else {
    return;
  }
});
