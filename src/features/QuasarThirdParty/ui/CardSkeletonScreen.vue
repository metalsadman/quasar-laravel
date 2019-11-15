<template>
  <q-page padding>
    <div class="row q-pa-md q-gutter-md">
      <div class="col-12 row justify-center">
        <q-btn
          color="primary"
          @click="showTextLoading"
          :loading="visible"
        >
          Show Text Loading
        </q-btn>
      </div>
      <div class="col-12 row justify-center">
        <q-card class="relative-position card-example">
          <q-card-section>
            <header-text-skeleton v-if="visible" />
            <div
              class="text-h6"
              v-if="showSimulatedReturnData"
            >
              Lorem Ipsum
            </div>
          </q-card-section>

          <q-card-section>
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              :duration="{ enter: 200, leave: 200 }"
              @after-leave="showSimulatedReturnData = true"
            >
              <div v-if="visible">
                <body-text-skeleton />
                <body-text-skeleton />
              </div>
            </transition>
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              :duration="{ enter: 500, leave: 230 }"
              @after-leave="visible = true"
            >
              <div v-if="showSimulatedReturnData">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vel magna eu risus laoreet tristique. Nulla ut
                fermentum elit, nec consequat augue. Morbi et dolor nec metus
                tincidunt pellentesque. Nullam non semper ante. Fusce
                pellentesque sagittis felis quis porta. Aenean condimentum neque
                sed erat suscipit malesuada. Nulla eget rhoncus enim. Duis
                dictum interdum eros.
              </div>
            </transition>
          </q-card-section>

          <!-- <q-inner-loading :showing="visible">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import BodyTextSkeleton from './BodyTextSkeleton.vue'
import HeaderTextSkeleton from './HeaderTextSkeleton.vue'
export default {
  components: {
    BodyTextSkeleton,
    HeaderTextSkeleton
  },
  data () {
    return {
      visible: false,
      showSimulatedReturnData: true
    }
  },
  methods: {
    showTextLoading () {
      this.showSimulatedReturnData = false
      setTimeout(() => {
        this.visible = false
      }, 3000)
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-example {
  width: 288px;
  height: 300px;
}
</style>
