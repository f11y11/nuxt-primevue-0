<template>
<div>
  <div class="flex align-items-center justify-content-between px-5 py-2">
    <img src="~/assets/logo.png" width="50"/>
    <nav class="ms-auto">
      <ul style="list-style-type: none;" class="flex flex-row justify-content-around align-items-center">
        <li class="mx-4"><NuxtLink to="/" class="link-active">Home</NuxtLink></li>
        <li v-if="!user" class="mx-4"><NuxtLink to="/auth/login" class="link-active">Login</NuxtLink></li>
        <li v-if="!user" class="mx-4"><NuxtLink to="/auth/register" class="link-active">Register</NuxtLink></li>
        <li v-if="user" class="mx-4">
          <SplitButton @click="$router.push('/channels/@me')" :label="user.username + '#' + user.discriminator" :model="userSplitButtonModel"/>
        </li>
      </ul>
    </nav>
  </div>
</div>
</template>

<script setup lang="ts">
import {useToast} from "primevue/usetoast";

const toast = useToast();

const user = useState('user');

const _logout = async () => {
  await logout().then(() => {
    toast.add({
      severity: 'info',
      summary: 'Logged out',
      detail: 'You have logged out successfully'
    })
  })
}

const userSplitButtonModel = [
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    to: '/settings'
  },
  {
    label: 'Log out',
    icon: 'pi pi-sign-out',
    command: logout,
  },

]

</script>

<style scoped>
.link-active:hover {
  text-decoration: underline;

}
</style>