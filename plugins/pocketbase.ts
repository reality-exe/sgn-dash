import PocketBase, { type AuthModel } from "pocketbase";

export default defineNuxtPlugin(async (nuxtApp) => {
  const pb = new PocketBase("https://aor-db.rxserver.net");

  const cookie = useCookie<{ token: string; model: AuthModel | null }>(
    "pb_auth",
    {
      path: "/",
      secure: true,
      sameSite: "strict",
      httpOnly: false, // change to "true" if you want only server-side access
      maxAge: 604800,
    }
  );

  // load the store data from the cookie value
  pb.authStore.save(cookie.value?.token, cookie.value?.model);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange((value) => {
    cookie.value = {
      token: pb.authStore.token,
      model: pb.authStore.model,
    };
  }, true);

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
  }

  return {
    provide: { pb },
  };
});
