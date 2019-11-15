<template>
  <q-tabs align="center">
    <q-route-tab
      :icon="tab.meta.tabIcon"
      :label="tab.meta.tabLabel"
      :to="`/quasar-third-party/${tab.path}`"
      exact
      v-for="tab in tabs"
      :key="tab.name"
    />
  </q-tabs>
</template>

<script>
import { tabs } from '../route'
export default {
  data: () => ({
    tabs
  })
}
</script>

<style>
</style>
