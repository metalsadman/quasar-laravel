<template>
  <q-tabs align="center">
    <q-route-tab
      icon="mail"
      :label="tab.meta.tabLabel"
      :to="`/table-extensions/${tab.path}`"
      exact
      v-for="tab in tabs"
      :key="tab.name"
    />
  </q-tabs>
</template>

<script>
import { tabs } from '../route'
console.log('tabs', tabs)
export default {
  data: () => ({
    tabs
  })
}
</script>

<style>
</style>
