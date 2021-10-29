<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md row justify-center">
      <div class="col-12 row justify-center q-gutter-md">
        <q-btn
          color="primary"
          @click="showTextLoading"
          :loading="visible"
        >Show Skeleton Loader</q-btn>
        <q-field
          filled
          label="Primary"
          stack-label
          dense
        >
          <template v-slot:control>
            <div
              class="self-center full-width no-outline content-stretch"
              tabindex="0"
            >{{ skeletonColor.primary || 'Hex color' }}</div>
          </template>
          <template v-slot:append>
            <q-btn
              flat
              round
              dense
              icon="mdi-palette"
              :style="
                skeletonColor.primary ? `color: ${skeletonColor.primary}` : ''
              "
            >
              <q-menu
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <q-color
                  :color="skeletonColor.primary"
                  v-model="skeletonColor.primary"
                />
              </q-menu>
            </q-btn>
          </template>
        </q-field>
        <q-field
          filled
          label="Secondary"
          stack-label
          dense
        >
          <template v-slot:control>
            <div
              class="self-center full-width no-outline"
              tabindex="0"
            >{{ skeletonColor.secondary || 'Hex color' }}</div>
          </template>
          <template v-slot:append>
            <q-btn
              flat
              round
              dense
              icon="mdi-palette"
              :style="
                skeletonColor.secondary
                  ? `color: ${skeletonColor.secondary}`
                  : ''
              "
            >
              <q-menu
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <q-color v-model="skeletonColor.secondary" />
              </q-menu>
            </q-btn>
          </template>
        </q-field>
      </div>
      <div class="col-12 row justify-center">
        <q-card class="relative-position card-example">
          <q-card-section>
            <div
              class="text-h6"
              v-if="showSimulatedReturnData"
            >Lorem Ipsum</div>
          </q-card-section>

          <q-card-section>
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              :duration="{ enter: 200, leave: 200 }"
              @after-leave="showSimulatedReturnData = true"
            >
              <div v-if="visible">
                <dynamic-skeleton
                  :primary="skeletonColor.primary"
                  :secondary="skeletonColor.secondary"
                  :rows="10"
                  :cols="4"
                />
                <!-- <dynamic-skeleton/> -->
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
          </q-inner-loading>-->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import DynamicSkeleton from './DynamicTextSkeleton.vue'
export default {
  components: {
    DynamicSkeleton
  },
  data () {
    return {
      visible: false,
      showSimulatedReturnData: true,
      skeletonColor: {
        primary: null,
        secondary: null
      }
    }
  },
  methods: {
    showTextLoading () {
      this.showSimulatedReturnData = false
      setTimeout(() => {
        this.visible = false
      }, 3000)
    },
    setColor (type, hex) {
      this.skeletonColor[type] = hex
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
