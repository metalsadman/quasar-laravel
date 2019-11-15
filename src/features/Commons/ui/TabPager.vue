<template>
  <q-tabs align="center">
    <q-route-tab
      icon="mdi-card"
      :label="tab.meta.tabLabel"
      :to="`/quasar-third-party/${tab.path}`"
      exact
      v-for="tab in tabs"
      :key="tab.name"
    />
  </q-tabs>
</template>

<script>
// import { tabs } from '../route'
export default {
  props: ['tabs'],
  created () {
    console.log('tabs', this.tabs)
  }
}
</script>

<style>
</style>
