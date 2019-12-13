<template>
  <div class="q-mb-xl q-pb-md">
    <!-- v-touch-pan.prevent.mouse.mouse-capture="handlePan" -->
    <q-table
      :grid="mode === 'grid'"
      :hide-header="mode === 'grid'"
      :data="localData"
      :columns="columns"
      :row-key="$attrs['row-key'] ? $attrs['row-key'] : '$_index'"
      :visible-columns="visibleColumns"
      :loading="innerLoading"
      :rows-per-page-options="rowOptions"
      :pagination.sync="paginationControl"
      :separator="separator"
      :filter="filterOpts"
      :selection="selectionMode"
      :selected.sync="selected"
      v-bind="$attrs"
      :color="theme"
      v-on="$listeners"
      :class="`relative-position ${$q.dark.isActive ? 'dark-fs' : 'light-fs'}`"
      ref="myTable"
      id="table1"
      :table-class="computedTableClass"
    >
      <!-- @touchstart.stop
      @mousedown.stop-->
      <!-- v-touch-pan.prevent.mouse="handlePan"
    @mousedown.native.prevent
      -->
      <template v-slot:top="props">
        <div class="row col-12">
          <div
            v-if="$attrs.title"
            class="col-12 text-center text-h5 q-pb-md"
          >{{ $attrs.title }}</div>
          <div
            v-if="$attrs.subTitle"
            class="col-12 text-center text-caption"
          >{{ $attrs.subTitle }}</div>
        </div>
        <div :class="
            `row col-12${
              $q.screen.gt.xs ? ' justify-between' : ' justify-center'
            }`
          ">
          <q-input
            v-if="search"
            outlined
            :color="theme"
            dense
            :debounce="searchDebounce"
            v-model="filterOpts"
            :placeholder="searchInputPlaceholder || 'Search'"
            :class="$q.screen.width <= 405 ? 'full-width' : ''"
          >
            <template v-slot:append>
              <q-icon
                name="mdi-magnify"
                :color="theme"
              />
            </template>
          </q-input>
          <div :class="
              `row${
                $q.screen.width <= 405 ? ' justify-between full-width' : ''
              }`
            ">
            <q-toggle
              v-if="changeableSelectionMode"
              v-model="toggleSelectionMode"
              dense
              :color="theme"
              checked-icon="mdi-checkbox-multiple-marked-outline"
              unchecked-icon="mdi-checkbox-marked-outline"
            >
              <q-tooltip
                :disable="$q.platform.is.mobile"
                v-close-popup
              >{{ toggleSelectionMode ? 'Multiple' : 'Single' }}</q-tooltip>
            </q-toggle>
            <q-select
              :color="theme"
              borderless
              dense
              v-model="rowSelectionType"
              v-show="topRightOptions.cellLines"
              :options="rowSelectionTypeOpts"
              emit-value
              map-options
              hide-underline
            />
            <q-select
              v-model="visibleColumns"
              multiple
              borderless
              dense
              options-dense
              display-value="Fields"
              emit-value
              map-options
              :options="columns"
              option-value="name"
              placeholder="Fields"
              :color="theme"
            />
            <q-select
              :color="theme"
              borderless
              dense
              v-model="separator"
              v-show="topRightOptions.cellLines && mode === 'list'"
              :options="separatorOptions"
              emit-value
              map-options
              hide-underline
            />
            <q-btn
              flat
              :color="theme"
              round
              dense
              :icon="mode === 'grid' ? 'mdi-view-list' : 'mdi-view-grid'"
              @click="
                mode = mode === 'grid' ? 'list' : 'grid'
                separator = mode === 'grid' ? 'none' : 'horizontal'
              "
            />
            <q-btn
              flat
              :color="theme"
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-show="topRightOptions.fullscreenToggle"
            />
          </div>
        </div>

        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div
            class="row col-12 justify-center q-gutter-md q-pt-md"
            v-if="
              actions &&
                (actionsDisplayType.includes('top') ||
                  actionsDisplayType === 'all') &&
                selected.length > 0
            "
          >
            <q-btn
              outline
              v-for="(action, i) in actions"
              :label="action"
              :key="i"
              :color="theme"
              :disable="innerLoading"
              @click="$emit(action.replace(' ', '-'), selected)"
            />
          </div>
        </transition>
      </template>
      <template
        v-if="mode === 'grid'"
        v-slot:item="props"
      >
        <div
          class="q-pa-xs col-xs-6 col-sm-4 col-md-3 col-lg-3 grid-style-transition cursor-pointer"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card
            :class="`${props.selected ? $q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2' : ''}`"
            @click.native="props.selected = !props.selected"
          >
            <!-- v-touch-pan.prevent.mouse="handlePan" -->
            <template v-if="gridCardStyle === 'horizontal'">
              <q-card-section class="relative-position">
                <q-checkbox
                  v-if="toggleSelectionMode"
                  dense
                  :color="theme"
                  v-model="props.selected"
                  :label="props.cols[0].value"
                  class="ellipsis-2-lines"
                />
                <div
                  v-if="!toggleSelectionMode"
                  class="ellipsis-2-lines"
                >{{ props.cols[0].value }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="q-pa-none">
                <q-list>
                  <template v-for="(col, i) in props.cols">
                    <q-item
                      v-if="i > 0"
                      :key="col.name"
                    >
                      <q-item-section>
                        <q-item-label
                          lines="1"
                          caption
                        >{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label
                          lines="1"
                          class="text-right"
                        >{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card-section>
            </template>
            <template v-else>
              <!-- <q-card-section class="q-pa-none"> -->
              <q-list>
                <q-item
                  v-for="(col, i) in props.cols"
                  :key="i"
                >
                  <q-item-section>
                    <q-item-label
                      lines="1"
                      caption
                    >
                      {{
                      col.label
                      }}
                    </q-item-label>
                    <q-item-label :lines="
                        typeof col.value === 'string' &&
                        (col.value.includes(' ') || col.value.includes('-'))
                          ? 3
                          : 1
                      ">{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <!-- </q-card-section> -->
            </template>

            <q-menu
              touch-position
              v-if="
                actions &&
                  (actionsDisplayType.includes('menu') ||
                    actionsDisplayType === 'all') &&
                  selected.length > 0 &&
                  props.selected
              "
              context-menu
            >
              <q-list style="min-width: 100px">
                <template v-for="(action, idx) in actions">
                  <q-item
                    :key="idx"
                    @click.native="$emit(action.replace(' ', '-'), selected)"
                    :clickable="!innerLoading"
                    :disable="innerLoading"
                    v-close-popup
                  >
                    <q-item-section>
                      {{
                      capitalize(`${action}`)
                      }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-menu>
            <!-- v-if="actions && (actionsDisplayType === 'menu' || actionsDisplayType === 'all')" -->
            <q-tooltip
              :disable="
                $q.platform.is.mobile &&
                  actions &&
                  (actionsDisplayType === 'menu' ||
                    actionsDisplayType === 'all')
              "
              :delay="1000"
              anchor="bottom middle"
              v-close-popup
              self="bottom middle"
              :offset="[10, 10]"
            >{{ menuToolTipMessage }}</q-tooltip>
          </q-card>
        </div>
      </template>

      <template
        v-slot:body="props"
        v-if="mode === 'list'"
      >
        <!-- v-touch-pan.prevent.mouse="handlePan" -->
        <!-- <div  v-touch-pan.prevent.mouse="handlePan" class="relative-position"> -->
        <q-tr
          :props="props"
          :class="'cursor-pointer'"
          @[computedNativeHover].native="props.selected = !props.selected"
          @[computedNativeClick].native="props.selected = !props.selected"
          @keyup.enter.native.stop.prevent="
            $refs.myTable.isRowSelected(props.row.$_index)
          "
          ref="myRef"
        >
          <!-- @click.native="props.selected = !props.selected"
              @mouseover.native="props.selected = !props.selected"
              v-on="computedRowSelectionType"
              @mouseover.native="props.selected = !props.selected"
          -->
          <q-td auto-width>
            <q-checkbox
              :color="theme"
              v-model="props.selected"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
            <q-menu
              touch-position
              v-if="
                actions &&
                  (actionsDisplayType.includes('menu') ||
                    actionsDisplayType === 'all') &&
                  selected.length > 0 &&
                  props.selected
              "
              context-menu
            >
              <q-list style="min-width: 100px">
                <template v-for="(action, idx) in actions">
                  <q-item
                    :key="idx"
                    @click.native="
                      !innerLoading && $emit(action.replace(' ', '-'), selected)
                    "
                    clickable
                    v-close-popup
                  >
                    <q-item-section>
                      {{
                      capitalize(`${action}`)
                      }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-menu>
          </q-td>
          <q-tooltip
            :disable="
              $q.platform.is.mobile &&
                actions &&
                (actionsDisplayType === 'menu' || actionsDisplayType === 'all')
            "
            :delay="1000"
            anchor="bottom middle"
            v-close-popup
            self="bottom middle"
            :offset="[10, 10]"
          >{{ menuToolTipMessage }}</q-tooltip>
        </q-tr>
        <!-- </div> -->
      </template>
    </q-table>

    <transition
      appear
      :duration="500"
      enter-active-class="animated fadeInUpBig"
      leave-active-class="animated fadeOutDown"
    >
      <q-page-sticky
        v-if="
          actions &&
            (actionsDisplayType.includes('bottom') ||
              actionsDisplayType === 'all') &&
            selected.length > 0
        "
        position="bottom"
        :offset="[0, 45]"
      >
        <!-- <q-btn
          rounded
          v-for="action in actions"
          :key="action"
          :label="action.replace(' ','-')"
          :color="theme"
          @click="$emit(action.replace(' ','-'), selected)"
        />-->
        <div class="row col-12 justify-center q-gutter-sm">
          <q-btn
            rounded
            v-for="(action, i) in actions"
            :label="action"
            :key="i"
            :color="theme"
            :disable="innerLoading"
            @click="$emit(action.replace(' ', '-'), selected)"
          />
        </div>
      </q-page-sticky>
    </transition>

    <q-page-scroller
      position="bottom-right"
      :scroll-offset="400"
      :offset="[16, 16]"
    >
      <q-btn
        fab
        icon="keyboard_arrow_up"
        color="accent"
      />
    </q-page-scroller>

    <q-inner-loading :showing="innerLoading && mode === 'grid'">
      <q-spinner
        color="secondary"
        size="50px"
      />
    </q-inner-loading>
  </div>
</template>

<script>
/**
 * @description A Custom DataTable implementation for the purpose of uniform table look and feel.
 * This is has a server side functionality which calls the index function of your API
 * for Filtering results
 * @author Aldrin Marquez
 */

const capitalize = str =>
  str
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ')

export default {
  name: 'dynamic-table',
  props: {
    // the table data
    data: {
      type: [Array, Object],
      default: null
    },
    // column definition
    columns: {
      type: [Array, Object],
      default: null
    },
    // actions shown when user right clicks on row or onto a table item
    // pass an array of strings pertaining to the actions that are available
    // for the current table, action name will be emitted
    // ie. if you pass :actions="['edit']" edit event will be emitted when you click on the Edit action
    actions: {
      type: [Array, Object],
      default: null
    },
    actionsDisplayType: {
      type: String,
      default: 'top',
      validator: value =>
        [
          'top',
          'menu',
          'bottom',
          'all',
          'top menu',
          'bottom menu',
          'top bottom'
        ].indexOf(value) !== -1
    },
    actionInvokeType: {
      type: String,
      default: 'show',
      validator: value => ['show', 'instant'].indexOf(value) !== -1
    },
    // color theme
    theme: {
      type: String,
      default: 'primary'
    },
    // pass a false if search is disabled
    search: {
      type: Boolean,
      default: false
    },
    searchDebounce: {
      type: Number,
      default: 500
    },
    // pass this prop if you want to limit the options
    // on the table. props are shown in the default
    topRightOptions: {
      type: Object,
      default: () => {
        return {
          visibleCols: true,
          cellLines: true,
          fullscreenToggle: true
        }
      }
    },
    // current pagination settings of the table
    pagination: {
      type: Object,
      default: () => {
        return {
          rowsPerPage: 7,
          page: 1
        }
      }
    },
    dark: {
      type: Boolean,
      default: () => false
    },
    rowOptions: {
      type: Array,
      default: () => [3, 5, 7, 10, 15, 25, 50, 0]
    },
    // pass a boolean model if you want to show a loading animation
    innerLoading: {
      type: Boolean,
      default: () => false
    },
    // the filter model of your table
    searchField: {
      type: String,
      default: () => ''
    },
    selectionMode: {
      type: String,
      default: () => 'none'
    },
    changeableSelectionMode: {
      type: Boolean,
      default: false
    },
    gridCardStyle: {
      type: String,
      default: 'vertical',
      validator: value => ['horizontal', 'vertical'].indexOf(value) !== -1
    },
    searchInputPlaceholder: {
      type: String,
      default: null
    }
  },
  inheritAttrs: false,
  data () {
    return {
      visibleColumns: [],
      separator: 'horizontal',
      selected: [],
      mode: 'grid',
      paginationControl: this.pagination,
      // loading: this.innerLoading,
      selection: this.selectionMode,
      separatorOptions: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Cell', value: 'cell' },
        { label: 'None', value: 'none' }
      ],
      rowSelectionTypeOpts: [
        { label: 'Click', value: 'click' },
        { label: 'Hover', value: 'hover' },
        { label: 'Both', value: 'both' }
      ],
      rowSelectionType: 'click',
      info: null,
      panning: false,
      active: false,
      currentRow: { key: null },
      previousRow: { key: null },
      localData: []
    }
  },
  computed: {
    computedTableClass () {
      return this.active ? ' myClass' : ''
    },
    filterOpts: {
      set (val) {
        this.selected = []
        this.$emit('search-change', val)
      },
      get () {
        return this.searchField
      }
    },
    selectionComputedMode () {
      return this.mode === 'grid'
        ? this.selectionMode === 'none'
          ? 'single'
          : this.selectionMode
        : this.selectionMode !== 'none'
          ? this.selectionMode
          : 'none'
    },
    toggleSelectionMode: {
      set (val) {
        this.selected = []
        this.$emit('selection-mode-change', val)
      },
      get () {
        return this.selectionMode === 'multiple'
      }
    },
    menuToolTipMessage () {
      return `${
        this.actionsDisplayType === 'menu' || this.actionsDisplayType === 'all'
          ? 'Right/Left/Hold click'
          : 'Click'
      } to see actions`
    },
    computedRowSelectionType () {
      // for v-on not native
      return this.rowSelectionType === 'both'
        ? {
          click: props => {
            props.selected = !props.selected
          },
          mouseover: props => {
            props.selected = !props.selected
          }
        }
        : this.rowSelectionType === 'click'
          ? {
            click: props => {
              props.selected = !props.selected
            }
          }
          : {
            mouseover: props => {
              props.selected = !props.selected
            }
          }
    },
    computedNativeHover () {
      return this.rowSelectionType === 'hover' ||
        this.rowSelectionType === 'both'
        ? 'mouseover'
        : null
    },
    computedNativeClick () {
      return this.rowSelectionType === 'click' ||
        this.rowSelectionType === 'both'
        ? 'click'
        : null
    }
  },
  methods: {
    setRowIndex () {
      this.localData = this.$attrs['row-key'] ? this.data : this.data.map((v, i) => ({ ...v, $_index: i }))
      console.log('data w/index =>', this.data)
    },
    capitalize,
    notify (notif) {
      this.$q.notify({
        type: 'negative',
        message: 'Not allowed to delete.'
      })
    },
    handlePan ({ evt, ...info }) {
      this.info = info

      // native Javascript event
      // console.log(evt)
      console.log('currentTarget', evt)
      if (evt.target.hasOwnProperty('__vue__')) {
        console.log('isVue', evt.target)
      }
      if (info.isFirst) {
        this.panning = true
        console.log('pan first', info, evt)
      } else if (info.isFinal) {
        this.panning = false
        console.log('pan final', info, evt)
      }
    },
    colSelector () {
      this.$nextTick(() => {
        this.active = false
        const a = [].forEach.call(document.querySelectorAll('td'), el => {
          // console.log('td parent', el.parentNode.__vue__)
          // let parentTr = el.parentNode.__vue__.props
          el.addEventListener('mousedown', ev => {
            this.active = true
            // parentTr.selected = true
            ev.preventDefault()
            let b = [].forEach.call(
              document.querySelectorAll('.highlight'),
              el2 => {
                el2.classList.remove('highlight')
                // parentTr.selected = false
              }
            )

            console.log(b)
            // el.classList.add('highlight')
          })
        })

        const c = [].forEach.call(document.querySelectorAll('td'), el => {
          el.addEventListener('mousemove', ev => {
            let parentTr = el.parentNode.__vue__.props
            if (this.active) {
              this.currentRow = parentTr
              // this.previousRow = this.previousRow.key !== this.currentRow
              if (this.currentRow.key !== this.previousRow.key) {
                console.log('not', this.currentRow, this.previousRow)
                this.previousRow = this.currentRow
                parentTr.selected = !this.previousRow.selected
              }
              console.log('cur prev', this.currentRow.key, this.previousRow.key)
            }

            if (this.active && !el.classList.contains('highlight')) {
              // let curSelection = parentTr.selected
              // console.log('cur', curSelection)
              // // parentTr.selected = curSelection ? false : true
              // !curSelection && (parentTr.selected = true)
              el.classList.add('highlight')
            }
            // else if (this.active && !parentTr.selected) {
            //   parentTr.selected = true
            // }
          })
        })
        console.log(a, c)

        document.addEventListener('mouseup', ev => {
          this.active = false
          let b = [].forEach.call(
            document.querySelectorAll('.highlight'),
            el2 => {
              el2.classList.remove('highlight')
              // parentTr.selected = false
            }
          )
          console.log(b)
        })
      })
    }
  },
  watch: {
    selectionMode (val) {
      // console.log('changed', val)
    },
    selected (val) {
      // console.log('selected changed', val)
      if (
        val.length > 0 &&
        this.actions &&
        this.actionInvokeType === 'instant' &&
        this.actions.length === 1
      ) {
        this.$emit(this.actions[0].replace(' ', '-'), this.selected)
      }
    },
    pagination: {
      deep: true,
      handler (newVal, oldVal) {
        console.log('pag', newVal, oldVal)
        this.colSelector()
      }
    },
    paginationController: {
      deep: true,
      handler (newVal, oldVal) {
        console.log('hanlder', newVal, oldVal)
        this.colSelector()
      }
    },
    data (v) {
      this.selected = []
      console.log('dynamic-table', v)
    },
    computedRowSelectionType (val) {
      console.log('event', val)
    },
    mode (v) {
      this.colSelector()
    }
  },
  mounted () {
    this.visibleColumns = this.columns.map(v => {
      if (v.hideonload) {
        return
      }
      return v.name
    })

    if (this.$attrs.hasOwnProperty('grid')) {
      this.mode = this.$attrs.grid ? 'grid' : 'list'
    } else {
      this.mode = 'grid'
    }

    const tableEl = document.querySelectorAll('#table1')
    console.log('tableEl mounted', tableEl)
    console.log(tableEl[0].children[1].firstChild)
    const tb = document.getElementsByClassName('q-table')
    console.log('ref', tb)

    this.$nextTick(() => {
      let g = tb[0].rows
      console.log('tb', g)

      this.colSelector()
    })
  },
  created () {
    console.log('screen', this.$attrs)
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1500)

    console.log('actions', this.actionsDisplayType.includes('menu'))

    const tableEl = this.$refs.myTable
    console.log('tableEl', tableEl)
    // this.$attrs['row-key'] || this.setRowIndex()
    this.setRowIndex()
  },
  beforeDestroy () {
    // clear the dom listeners
  }
}
</script>

<style lang="sass" scoped>
.dark-fs
  &.fullscreen
    background: #121212

.light-fs
  &.fullscreen
    background: white

.grid-style-transition
  transition: transform 0.3s

.highlight
  background-color: $primary
  color: white

.myClass
  tbody tr
    &:hover
      background: none

.dragClass
  tbody td.highlighted
    background-color: #999

</style>

<!--style lang="stylus" scoped>
.custom-area {
  width: 90%;
  height: 480px;
  border-radius: 3px;
  padding: 8px;
}

.custom-info pre {
  width: 180px;
  font-size: 12px;
}

.touch-signal {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 35px;
  height: 35px;
  font-size: 25px;
  border-radius: 50% !important;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
}
</style-->
