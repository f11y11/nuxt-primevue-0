<template>
<div>
  <div class="grid pt-5">
    <div class="col">
      <Listbox :options="listBoxItems" v-model="selectedItem"/>
      <div class="flex flex-column mt-1">
        <Button label="Go back" class="mb-1" @click="_goBack"/>
        <Button label="Log out" class="p-button-danger" @click="logout"/>
      </div>
    </div>
    <div class="col-8">
      <div>
        <h1>{{ selectedItem }}</h1>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {Ref} from "vue";
import {IUser} from "~/server/database/schemas/user";
import logout from "~/utils/logout";
const _goBack = () => window.history.back();

const user = await fetchUser()

const initialUserData = {...user} as IUser
const currentPassword: Ref<string> = ref('');
const newPassword: Ref<string> = ref('');

const newPasswordConfirm: Ref<string> = ref('');

const listBoxItems = [
  "Account",
  "Privacy",
  "Appearance"
]

const selectedItem: Ref<string> = ref(listBoxItems[0]);

watch(selectedItem, (n, o) => {
  // prevent deselecting listbox item
  if (!n) {selectedItem.value = o}
})

definePageMeta({layout: 'settings'})
</script>

<style scoped>

</style>