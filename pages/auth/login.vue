<template>
  <div>
    <div class="flex flex-column align-items-center justify-content-center" style="margin-top: 20vh;">
      <h1 class="p-5 text-primary">Login</h1>
      <div id="test" class="p-5 border-round-2xl" style="outline: 2px solid var(--primary-300); box-shadow: .9rem .9rem 0 var(--primary-color); background-color: var(--surface-c)">
        <form @submit.prevent="register()">
          <div class="flex align-items-center justify-content-center mb-5">
            <img src="~/assets/logo.png" width="50" alt="logo" style="align-self: center; filter: brightness(1);">
          </div>
          <div class="field">
            <InputText placeholder="Email" required v-model="email" type="email" class="w-full"/>
          </div>
          <div class="field">
            <Password placeholder="Password" required v-model="password" :feedback="false" toggle-mask input-class="w-full" class="w-full"/>
          </div>
          <Button type="submit" label="Login" class="p-button-raised w-full"/>
        </form>
        <p class="text-center">Don't have an account? <NuxtLink href="/auth/register">Register</NuxtLink></p>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useToast} from "primevue/usetoast";
import user from "~/server/database/schemas/user";

definePageMeta({
  layout: 'auth'
})

const email = ref('');
const password = ref('');

const router = useRouter();
const toast = useToast();

const register = async () => {
  const {data, error} = await useLazyFetch('/api/v1/auth/login', {method: 'POST', body: {...{
        email: email.value,
        password: password.value
      }}});

  if (data.value && !error.value) {

    await fetchUser();

    await router.push('/');

    toast.add({
      severity: 'success',
      summary: 'Logged in',
      detail: `Welcome back, ${data.value.username}`,
      life: 3000,
    })
  }
  else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.value!.data.message,
      life: 3000
    })
  }

}
</script>

<style scoped>
body {
  background-image: url('https://www.toptal.com/designers/subtlepatterns/uploads/black_lozenge.png');
}
</style>