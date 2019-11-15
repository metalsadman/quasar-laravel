<template>
  <div class="q-pa-sm q-mt-md row justify-center">
    <form class="q-gutter-md">
      <base-text-field
        filled
        :val="$v.form.password"
        v-model="form.password"
        normalize-bottom
        label="Password"
        icon="mdi-card"
        clearable
        @input="$v.form.password.$touch"
        @blur="$v.form.password.$touch"
        autofocus
        type="password"
        hide-show-password
      >
        <template v-slot:prepend>
          <q-icon name="mdi-account-key" />
        </template>
      </base-text-field>
      <base-select-field
        filled
        v-model="form.type"
        :options="transTypeOptions"
        :val="$v.form.type"
        label="Transaction Type"
        normalize-bottom
        emit-value
        map-options
        hide-dropdown-icon
        clearable
        @input="$v.form.type.$touch"
        @blur="$v.form.type.$touch"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-cash-usd" />
        </template>
      </base-select-field>
      <base-text-field
        filled
        :val="$v.form.account"
        v-model="form.account"
        normalize-bottom
        label="Account Number"
        icon="mdi-card"
        clearable
        @input="$v.form.account.$touch"
        @blur="$v.form.account.$touch"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-account-card-details" />
        </template>
      </base-text-field>
      <base-text-field
        filled
        :val="$v.form.description"
        v-model="form.description"
        normalize-bottom
        label="Description"
        clearable
        @input="$v.form.description.$touch"
        @blur="$v.form.description.$touch"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-home-floor-b" />
        </template>
      </base-text-field>

      <base-currency-input
        filled
        label="Amount"
        :val="$v.form.amount"
        v-model="form.amount"
        normalize-bottom
        clearable
        :local-messages="{ checkAmt: 'must be greater than zero.' }"
        @input="$v.form.amount.$touch"
        @blur="$v.form.amount.$touch"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-cash" />
        </template>
      </base-currency-input>

      <base-text-field
        filled
        v-model="form.uppercase"
        normalize-bottom
        label="Custom upper-case prop"
        clearable
        upper-case
      />

      <custom-input
        v-model="form.uppercase"
        upper-case
        label="Custom Uppercase Input"
      />

      <div>
        <q-btn
          label="Post"
          type="submit"
          color="primary"
          class="full-width"
          :loading="payBtnLoading"
          :disable="payBtnState"
          @click.prevent="showPayNotif"
        />
      </div>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
// import { validationMixin } from 'vuelidate'

const checkAmt = (value, vm) => value > 0
export default {
  props: ['formData'],
  data () {
    return {
      fullName: '',
      transTypeOptions: [
        {
          value: 'Loans',
          label: 'Loan Payment'
        },
        {
          value: 'Savings',
          label: 'Cash Deposit'
        }
      ],
      payBtnState: false,
      payBtnLoading: false,
      localNotify: () => { },
      form: {
        amount: null,
        account: '',
        description: '',
        type: '',
        uppercase: '',
        password: ''
      },
      localMode: this.mode
    }
  },
  validations: {
    form: {
      amount: { required, checkAmt },
      account: { required },
      description: { required },
      type: { required },
      password: { required }
    }
  },
  methods: {
    showPayNotif () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return
      }
      this.localNotify()
      this.payBtnState = true
      this.localNotify = this.$q.notify({
        color: 'warning',
        message: 'Continue with payment?',
        position: 'bottom',
        multiLine: false,
        actions: [
          {
            label: 'Cancel',
            color: 'warning',
            handler: () => {
              this.payBtnState = false
            }
          },
          {
            label: 'OK',
            color: 'primary',
            handler: () => {
              this.$emit('form-update', this.form)
            }
          }
        ],
        timeout: 2500,
        onDismiss: () => {
          // validationMixin
          this.payBtnState = false
        }
      })
    }
  },
  created () {
    if (this.formData) {
      this.form = this.formData
    }
  }
}
</script>

<style>
</style>
