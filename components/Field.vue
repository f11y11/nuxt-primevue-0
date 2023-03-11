<template>
  <div class="field-component">
    <label>{{props.label}}</label>
      <span class="block">
      <slot><InputText disabled/></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String
})
</script>

<style scoped>
.field-component:nth-child(even) {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>