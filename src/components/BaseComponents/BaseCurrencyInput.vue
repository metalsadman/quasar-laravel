<template>
  <base-text-field
    v-model="localVal"
    prefix="$"
    ref="priceField"
    @input="formatCurrency"
    @blur="
      val => {
        formatCurrency(val.target.value, 'blur')
      }
    "
    v-bind="$attrs"
    inputmode="decimal"
  >
    <!-- prefix="₱" -->
    <template
      v-for="(_, slot) of $scopedSlots"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </base-text-field>
</template>

<script>
export default {
  name: 'BaseCurrencyInput',
  inheritAttrs: false,
  props: {
    value: { type: [String, Number] }
  },
  data () {
    return {
      localVal: null
    }
  },
  methods: {
    formatCurrency (val, blur) {
      if (val === null) return
      const input = this.$refs.priceField
      let inputVal = val
      // console.log('child', input)
      let inner =
        input.$children.length > 0
          ? input.$children[0].$refs.input
          : input.$refs.input
      // let inner = input.$refs.input

      // console.log('the input', inner)
      let originalLen = inputVal.length
      let caretPos = inner.selectionStart
      if (inputVal.indexOf('.') >= 0) {
        let decimalPos = inputVal.indexOf('.')
        let leftSide = inputVal.substring(0, decimalPos)
        let rightSide = inputVal.substring(decimalPos)
        leftSide = this.formatNumber(leftSide)
        rightSide = this.formatNumber(rightSide)
        if (blur === 'blur') {
          rightSide += '00'
        }
        rightSide = rightSide.substring(0, 2)
        inputVal = leftSide + '.' + rightSide
      } else {
        inputVal = this.formatNumber(inputVal)
        if (blur === 'blur' && inputVal.length > 0) {
          inputVal += '.00'
        }
      }

      let updatedLen = inputVal.length
      caretPos = updatedLen - originalLen + caretPos
      // console.log('inner', inner)
      this.$nextTick(() => {
        inner.setSelectionRange(caretPos, caretPos)
      })
      this.localVal = inputVal
      this.$emit(
        'input',
        parseFloat(this.localVal.replace(/[^\d.]/g, '')) || inputVal
      )
    },
    formatNumber (n) {
      return n
        .replace(/^0+/, '')
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  created () {
    this.localVal = this.value
  }
}
</script>

<style>
</style>
