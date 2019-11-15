<template>
  <q-layout view="lHh lpr lFf">
    <!-- lFf -->
    <!-- lHh lpr lFf lHh Lpr fff-->
    <q-header
      elevated
      class="toolbar-grad"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          v-touch-hold:1000.mouse.stop="touchHeld"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>{{ pageMeta.title || '' }}</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <q-btn
          :icon="$q.dark.isActive ? 'mdi-brightness-5' : 'mdi-brightness-4'"
          flat
          dense
          round
          @click="$q.dark.isActive ? $q.dark.set(false) : $q.dark.set(true)"
          no-caps
        >
          <q-badge
            color="red"
            floating
            transparent
          >new</q-badge>
        </q-btn>
      </q-toolbar>
      <router-view
        name="tabs"
        ref="mainTab"
      />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
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
        <base-drawer />
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
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>Title
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
import BaseDrawer from 'components/Drawers/BaseDrawer'
import { openURL } from 'quasar'
import { mapFields } from 'assets/utils/vuex-utils'
export default {
  name: 'MyLayout',
  components: {
    BaseDrawer
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      hasTabs: false
    }
  },
  computed: {
    ...mapFields('commons', ['pageMeta'])
  },
  methods: {
    openURL,
    touchHeld () {
      console.log('Touch held!')
      alert('Touch held!')
    },
    checkTabs () {
      this.$nextTick(() => {
        this.hasTabs = !!(this.$refs.toolbarTab || this.$refs.mainTab)
        // if (this.$refs.toolbarTab) {
        //   this.hasTabs = true
        // } else if (this.$refs.mainTab) {
        //   this.hasTabs = true
        // } else {
        //   this.hasTabs = false
        // }
        console.log('hasTabs =>', this.hasTabs)
      })
    }
  },
  mounted () {
    console.log(this.$q.platform.is.desktop)
    this.checkTabs()
  },
  updated: function () {
    this.checkTabs()
  }
}
</script>

<style scoped>
.toolbar-grad {
  background-image: linear-gradient(to bottom right, #ec268f 0%, #bc1e72 75%);
}
</style>
