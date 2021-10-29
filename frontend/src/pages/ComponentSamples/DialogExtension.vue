<template>
  <div class="q-pa-md q-gutter-sm row justify-center">
    <q-dialog
      @show="shown"
      @hide="isShowing = false"
      v-model="$attrs.value"
      v-bind="$attrs"
      v-on="$listeners"
      ref="mDialog"
    >
      <q-layout
        view="Lhh lpR fFf"
        reveal
        container
        :class="$q.dark.isActive ? 'bg-grey-9' :'bg-white'"
      >
        <q-header
          reveal
          class="bg-primary"
        >
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
            <keep-alive>
              <form-sample
                @form-update="
                  $emit('child-update', $event)
                  $refs.mDialog.hide()
                "
                ref="dForm"
                key="daform"
                :formData="formData"
              />
            </keep-alive>
            <p
              v-for="n in contentSize"
              :key="n"
            >{{ lorem }}</p>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>
</template>

<script>
import FormSample from 'pages/FormSamples/FormValidationSamples'
export default {
  props: ['formData'],
  components: {
    FormSample
  },
  inheritAttrs: false,
  data () {
    return {
      layout: false,

      moreContent: true,
      drawer: false,
      drawerR: false,

      lorem:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',
      isShowing: false
    }
  },

  computed: {
    contentSize () {
      return this.moreContent ? 150 : 5
    }
  },
  methods: {
    shown () {
      this.isShowing = true
    }
  },
  created () {
    // console.log('created', this.$refs.mDialog)
  },
  mounted () { }
}
</script>
