<template>
  <q-layout view="lHh lpr lFf">
    <!-- lFf -->
    <!-- lHh lpr lFf lHh Lpr fff-->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>{{ pageMeta.title || '' }}</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <!-- TODO:: move drawer items to a separate file -->
      <q-list>
        <q-item
          clickable
          to="/"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item-label header>Sample Modules</q-item-label>
        <q-item
          clickable
          to="/component-samples"
        >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Select Sample</q-item-label>
            <q-item-label caption>QSelect Extension</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable to="/autocomplete">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Autocomplete Sample</q-item-label>
            <q-item-label caption>samp</q-item-label>
          </q-item-section>
        </q-item> -->
        <q-item
          clickable
          to="/form-validations"
        >
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Form Input Samples</q-item-label>
            <q-item-label caption>Quasar Form Input Extension with Vuelidate</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          to="/dialog-sample"
        >
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dialog Sample</q-item-label>
            <q-item-label caption>Dialog Sample</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          to="/test-server"
        >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Test Sandbox Server</q-item-label>
            <q-item-label caption>Emulate api call using axios</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          to="/table-extension"
        >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>QTable Extension</q-item-label>
            <q-item-label caption>QTable Extension Sample</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer
      class="text-white"
      reveal
      v-if="false"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
        mode="out-in"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapFields } from 'assets/utils/vuex-utils'
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    ...mapFields('commons', ['pageMeta'])
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
