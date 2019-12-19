<template>
  <q-dialog
    ref="reg"
    persistent
    @show="shown"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Register
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          :class="loading ? 'disabled no-pointer-events': ''"
          ref="mainForm"
        >
          <div class="row justify-center bg-white q-pa-md q-gutter-sm">
            <div class="col-12">
              <base-text-field
                :val="$v.form.email"
                outlined
                v-model="form.email"
                label="Email Address"
                @input="$v.form.email.$touch"
                @blur="$v.form.email.$touch"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon
                    name="mdi-account"
                    @click.stop.prevent
                    @focus.stop
                  />
                </template>
              </base-text-field>
            </div>
            <div class="col-12">
              <base-text-field
                :val="$v.form.password"
                @input="$v.form.password.$touch"
                @blur="$v.form.password.$touch"
                outlined
                v-model="form.password"
                label="Password"
                type="password"
                @keyup.enter="ok"
                hide-show-password
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-lock-outline" />
                </template>
              </base-text-field>
            </div>
            <div class="col-12">
              <base-text-field
                :val="$v.form.confirm_password"
                @input="$v.form.confirm_password.$touch"
                @blur="$v.form.confirm_password.$touch"
                outlined
                v-model="form.confirm_password"
                label="Confirm Password"
                type="password"
                @keyup.enter="ok"
                hide-show-password
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-lock-outline" />
                </template>
              </base-text-field>
            </div>
            <div class="col-12">
              <base-text-field
                :val="$v.form.name"
                outlined
                v-model="form.name"
                label="Name"
                @input="$v.form.name.$touch"
                @blur="$v.form.name.$touch"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon
                    name="mdi-account"
                    @click.stop.prevent
                    @focus.stop
                  />
                </template>
              </base-text-field>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          v-close-popup
          :disable="loading"
        />
        <q-btn
          label="Ok"
          color="primary"
          @click="ok"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { log } from 'assets/utils/app-utils'
import { required, email, sameAs } from 'vuelidate/lib/validators'
const fields = () => ({
  email: null,
  password: null,
  confirm_password: null,
  name: null
})
export default {
  data () {
    return {
      loading: false,
      form: {
        ...fields()
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
      confirm_password: { required, sameAsPassword: sameAs('password') },
      name: { required }
    }
  },
  methods: {
    shown () {
      this.$refs.mainForm.resetValidation()
    },
    show () {
      // this.form.url = null
      this.form = fields()
      this.$refs.reg.show()
      this.$nextTick(() => {
        log('IS FORM AVAILABLE?? ', !!this.$refs.mainForm)
        this.$refs.mainForm.resetValidation()
      })
    },
    async ok () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return
      }

      // this.$refs.settings.hide()
      console.log('IP SETTINS', this.form)
      // console.log('RESP IP SETTINS', ))
      // this.$store.dispatch('commons/updateSettings', params)
      this.loading = true
      this.$store.dispatch('auth/register', this.form)
        .then(res => {
          console.log('res', res)
          // this.$q.notify({
          //   icon: 'mdi-check-circle-outline',
          //   message: res,
          //   timeout: 1000,
          //   color: 'positive'
          // })
          this.$emit('register-status', true)
          this.$refs.reg.hide()
        })
        .catch(e => {
          console.log(e)
          // this.$q.notify({
          //   color: 'negative',
          //   icon: 'mdi-alert-circle-outline',
          //   message: e,
          //   timeout: 1000
          // })
        })
        .finally(_ => { this.loading = false })
    }
  }
}
</script>

<style>
</style>
