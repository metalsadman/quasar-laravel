<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      label="Click me"
      color="primary"
      @click="layout = true"
    />

    <q-dialog
      v-model="layout"
      ref="dialog"
      @show="shown"
      @hide="hidden"
    >
      <q-layout
        view="Lhh lpR fff"
        container
        :class="$q.dark.isActive ? 'bg-grey-9' :'bg-white'"
      >
        <q-header class="bg-primary">
          <q-toolbar>
            <q-btn
              flat
              @click="drawer = !drawer"
              round
              dense
              icon="menu"
            />
            <q-toolbar-title>Header</q-toolbar-title>
            <q-btn
              flat
              @click="drawerR = !drawerR"
              round
              dense
              icon="menu"
            />
            <q-btn
              flat
              v-close-popup
              round
              dense
              icon="close"
            />
          </q-toolbar>
        </q-header>

        <q-footer class="text-white">
          <q-toolbar inset>
            <q-toolbar-title>Footer</q-toolbar-title>
          </q-toolbar>
        </q-footer>

        <q-drawer
          bordered
          v-model="drawer"
          :width="200"
          :breakpoint="600"
          content-class="q-pa-sm"
        >
          <div
            v-for="n in 50"
            :key="n"
          >Drawer {{ n }} / 50</div>
        </q-drawer>

        <q-drawer
          side="right"
          bordered
          v-model="drawerR"
          :width="200"
          :breakpoint="300"
          content-class="q-pa-sm"
        >
          <div
            v-for="n in 50"
            :key="n"
          >Drawer {{ n }} / 50</div>
        </q-drawer>

        <q-page-container>
          <q-page padding>
            <!-- <p v-for="n in contentSize" :key="n">{{ lorem }}</p> -->
            <q-uploader ref="uploader" />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      layout: false,

      moreContent: true,
      drawer: false,
      drawerR: false,

      lorem:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!'
    }
  },

  computed: {
    contentSize () {
      return this.moreContent ? 150 : 5
    }
  },
  methods: {
    shown () {
      console.log('mounted1', this.$refs.dialog)
      console.log('mounted2', this.$refs.uploader)
    },
    hidden () {
      this.$emit('uploader-ref', this.$refs.uploader)
    }
  },
  mounted () {
    // this.$nextTick(() => {
    console.log('mounted1', this.$refs.dialog)
    console.log('mounted2', this.$refs.uploader)
    // })
  },
  beforeDestroy () {
    console.log('destroyed')
  }
}
</script>
