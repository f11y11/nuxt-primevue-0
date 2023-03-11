<template>
  <div>
    <div class="flex flex-column align-items-center justify-content-center" style="margin-top: 20vh;">
      <h1 class="p-5 text-primary">Create a new account</h1>
      <div class="p-5 border-round-2xl" style="outline: 2px solid var(--primary-300); box-shadow: .9rem .9rem 0 var(--primary-color); background-color: var(--surface-c)">
        <form @submit.prevent="register()">
          <div class="flex align-items-center justify-content-center mb-5">
            <img src="~/assets/logo.png" width="50" alt="logo" style="align-self: center; filter: brightness(1);">
          </div>
          <div class="field">
            <InputText placeholder="Email" required v-model="email" type="email" class="w-full"/>
          </div>
          <div class="field p-input-icon-right w-full">
            <InputText placeholder="Username" required v-model="username" type="text" class="w-full"/>
            <i class="pi pi-refresh cursor-pointer" @click="generateUsername()"></i>
          </div>
          <div class="field">
            <Password placeholder="Password" required v-model="password" :feedback="false" toggle-mask input-class="w-full" class="w-full"/>
          </div>
          <div class="field">
            <Password placeholder="Confirm Password" required v-model="confirmPassword" :feedback="false" toggle-mask input-class="w-full" class="w-full"/>
          </div>
          <div class="field">
            <Calendar placeholder="Birthday" required class="w-full" v-model="birthdate" :feedback="false" toggle-mask/>
          </div>
          <div class="field">
            <p><Checkbox v-model="legalConfirmation" binary/> I agree to <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
          </div>
          <Button type="submit" label="Register" class="p-button-raised w-full"/>
        </form>
        <p class="text-center">Already have an account? <NuxtLink href="/auth/login">Login</NuxtLink></p>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker';
import {useToast} from "primevue/usetoast";

const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const birthdate = ref('');
const legalConfirmation = ref(true);

definePageMeta({
  layout: 'auth'
})

const router = useRouter();
const toast = useToast();

const register = async () => {
  const {data, error} = await useLazyFetch('/api/auth/register', {method: 'POST', body: {...{
    username: username.value,
    email: email.value,
    password: password.value,
    passwordConfirm: confirmPassword.value,
    birthdate: birthdate.value,
    legalConfirmation: legalConfirmation.value
  }}});

  if (data) {
    toast.add({
      severity: 'success',
      summary: 'Registration complete',
      detail: 'You are being redirected to login...',
      life: 3000
    })
    setTimeout(async () => {
      await router.push('/auth/login');
    }, 3000)
  }
  else if (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.value.data.message,
      life: 3000
    })
  }
}

const generateUsername = () => {
  username.value = faker.word.adverb() + faker.word.adjective()
}
</script>

<style scoped>
body {
  background-image: url('https://www.toptal.com/designers/subtlepatterns/uploads/black_lozenge.png');
}
</style>