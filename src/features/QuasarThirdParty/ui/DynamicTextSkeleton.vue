<template>
  <content-loader
    v-bind="$attrs"
    :height="height"
    :width="$attrs.width || 400"
    :speed="$attrs.speed || 2"
    :primaryColor="$attrs.primary || '#c5c5c5'"
    :secondaryColor="$attrs.secondary || '#e9e9e9'"
  >
    <template v-for="(row, i) in locRows">
      <rect
        v-for="(col, r) in row.cols"
        :x="col.x"
        :y="col.y"
        rx="2"
        ry="2"
        :width="col.w"
        height="18"
        :key="'yo' + r + i"
      />
    </template>
  </content-loader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  props: {
    cols: {
      type: Number,
      default: 1
    },
    rows: {
      type: Number,
      default: 1
    },
    maxWidth: {
      type: Number,
      default: 400
    },
    minColWidth: {
      type: Number,
      default: 40
    }
  },
  components: {
    ContentLoader
  },
  data () {
    return {
      locRows: null
    }
  },
  computed: {
    height () {
      return (this.rows + 1) * 30
    }
  },
  methods: {
    randomWidth (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
      // return Math.floor(Math.random() * (max - min + min)) + min //The maximum is exclusive and the minimum is inclusive
    },
    getRowNumColumns (min, max) {
      // min = 1;
      // max = Math.floor(this.colsMax);
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
      // return Math.floor(Math.random() * (max - min + min)) + min //The maximum is exclusive and the minimum is inclusive
    },
    getColumns (numCols, yAxis) {
      if (numCols > 1) {
        let colsArr = [...Array(numCols)],
          colPadding = colsArr.length * 10,
          xAxis = 0,
          maxW = this.maxWidth - colPadding,
          lastWidth = 0,
          remainingWidth = maxW,
          cols = []
        colsArr.forEach(v => {
          lastWidth = this.randomWidth(this.minColWidth, remainingWidth)
          remainingWidth -= lastWidth
          const col = { x: xAxis, y: yAxis, w: lastWidth }
          xAxis += 10 + lastWidth
          lastWidth >= this.minColWidth && cols.push(col)
        })
        return cols
      }
      return [{ x: 0, y: yAxis, w: this.randomWidth(this.minColWidth, this.maxWidth) }]
    },
    getRows (rows) {
      let y = 0
      let allRows = [...Array(rows + 1)].map(i => {
        y += 30
        let row = {
          type: 'rect',
          cols: this.getColumns(this.getRowNumColumns(1, this.cols), y)
        }

        // console.log('rows', row)
        return row
      })
      // console.log('allrows', allRows)
      return allRows
    }
  },
  created () {
    this.locRows = this.getRows(this.rows)
    console.log('mounted', this.locRows)
  }
}
</script>
