<script lang="ts" setup>
useHead({
  title: "Stargate Network | Login",
});
definePageMeta({
  middleware: "auth",
});

import { toast } from "vue-sonner";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
const nuxt = useNuxtApp();

const formSchema = toTypedSchema(
  z.object({
    email: z.string(),
    password: z.string().min(6),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const pb = nuxt.$pb;
const tryLogin = form.handleSubmit(async (values) => {
  pb.collection("users")
    .authWithPassword(values.email, values.password)
    .catch(() => {
      toast("Failed to login", {
        description:
          "Something went wrong when trying to login.\nPlease double check you typed in the corrent information.",
        position: "top-center",
        style: {
          background: "var(--destructive)",
        },
        important: true,
      });
    })
    .then(() => {
      toast.success("Logged in");
      navigateTo('/')
    });
});

async function discordLogin() {
  pb.collection('users').authWithOAuth2({
    provider: "discord"
  }).then(() => {
    toast.success("Logged in with Discord")
    navigateTo('/')
  }).catch(() => {
    toast.error("Failed to login with Discord", {})
  })
}

const passVis = ref(false);
</script>

<template>
  <div class="w-full min-h-screen flex justify-center items-center">
    <Card class="w-[512px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your AoR account</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <form @submit="tryLogin" class="space-y-4">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div class="flex gap-2">
                  <Input :type="passVis ? 'text' : 'password'" placeholder="12345678" v-bind="componentField" />
                  <Button type="button" @click="passVis = !passVis" size="icon" variant="outline">
                    <Icon :name="passVis
                      ? 'mdi:eye-off'
                      : 'mdi:eye'
                      " />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full">Login</Button>
        </form>
        <Button class="w-full" variant="outline" type="button" @click="discordLogin()">
          <Icon class="text-lg" name="ic:round-discord" /> Continue
          with Discord
        </Button>
        <p class="w-full text-center text-sm">Dont have an account? <a class="underline text-white"
            href="/register">Register here</a> :3</p>
      </CardContent>
    </Card>
  </div>
</template>
