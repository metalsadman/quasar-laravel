<template>
  <q-layout>
    <q-page-container>
      <q-page class="docs-input row main justify-center">
        <transition
          appear
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
          :duration="500"
        >
          <div
            class="self-center"
            style="width:500px; max-width: 90vw;"
            v-if="showLoginForm"
          >
            <div class="row justify-center q-pb-xs">
              <q-img
                src="statics/icons/icon-256x256.png"
                contain
                style="width: 150px;"
                no-default-spinner
              />
            </div>
            <div class="row q-pb-md justify-center text-h6 text-white">
              {{subAgent || ''}}
            </div>
            <form>
              <base-text-field
                :val="$v.form.email"
                filled
                v-model="form.email"
                label="Username"
                @blur="$v.form.email.$touch"
                @keyup.enter="login"
                normalize-bottom
                dark
                color="blue-grey-1"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-account" />
                </template>
              </base-text-field>
              <br>
              <base-text-field
                :val="$v.form.password"
                filled
                v-model="form.password"
                label="Password"
                @blur="$v.form.password.$touch"
                @keyup.enter="login"
                type="password"
                hide-show-password
                normalize-bottom
                dark
                color="blue-grey-1"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-lock" />
                </template>
              </base-text-field>
              <br>
              <div>
                <q-btn
                  class="full-width"
                  :loading="loading"
                  @click="login"
                  color="primary"
                  label="Login"
                  size="18px"
                />

              </div>
              <!-- <div class="row justify-end q-pt-md"> -->
              <div class="row justify-center q-pt-md">
                <q-btn
                  flat
                  dense
                  @click="showRegistrationDialog"
                  color="blue-grey-1"
                  label="Register"
                >
                  <q-tooltip>
                    Settings
                  </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  dense
                  rounded
                  v-if="false"
                  label="Forgot password?"
                  @click="forgotPasswordDialog = true"
                  no-caps
                />
                <q-btn
                  flat
                  dense
                  round
                  v-if="false"
                  icon="mdi-settings"
                  @click="showRegistrationDialog"
                  color="blue-grey-1"
                >
                  <q-tooltip>
                    Settings
                  </q-tooltip>
                </q-btn>
              </div>
              <q-dialog
                ref="minimizedModal"
                v-model="forgotPasswordDialog"
                minimized
              >
                <q-card class="q-pa-md">
                  <q-card-section>
                    <div class="text-h6">Forgot Password</div>
                  </q-card-section>

                  <q-card-section>
                    <p>Enter your email address associated with your account to reset your password.</p>
                    <q-input
                      type="text"
                      label="Email Address"
                      value=""
                      v-model="email"
                    />
                  </q-card-section>

                  <q-card-actions
                    align="right"
                    class="text-primary"
                  >
                    <q-btn
                      flat
                      color="primary"
                      @click="todo"
                      v-close-popup
                      label="Reset Password"
                    />
                    <q-btn
                      flat
                      color="primary"
                      @click="todo"
                      v-close-popup
                      label="Cancel"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </form>
          </div>
        </transition>
        <transition
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
          :duration="{ enter: 500, leave: 230 }"
          @after-leave="showFormMethod"
        >
          <div
            class="self-center"
            style="width:500px; max-width: 90vw;"
            v-if="showLogo"
          >
            <div class="row justify-center q-pb-xs">
              <q-img
                src="statics/icons/icon-256x256.png"
                contain
                style="width: 100px;"
                no-default-spinner
              />
            </div>
          </div>
        </transition>

        <register ref="registerDialog" />

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Register from 'features/Auth/ui/RegisterDialog'
import { required } from 'vuelidate/lib/validators'
import { mapFields } from 'assets/utils/vuex-utils'
// import { log } from 'assets/utils/app-utils'

export default {
  components: {
    Register
  },
  data () {
    return {
      email: '',
      form: {
        email: '',
        password: ''
      },
      loading: false,
      localNotif: () => void 0,
      forgotPasswordDialog: false,
      showLoginForm: false,
      showLogo: true
    }
  },
  computed: {
    ...mapFields('commons', ['subAgent'])
  },
  validations: {
    form: {
      email: { required },
      password: { required }
    }
  },
  methods: {
    showRegistrationDialog () {
      this.$refs.registerDialog.show()
    },
    showLogoMethod () {
      this.showLogo = true
      console.log('showLogoMethod', this.showLogo)
    },
    showFormMethod () {
      this.showLoginForm = true
      this.showLogo = false
      console.log('showFormMethod', this.showLoginForm, this.showLogo)
    },
    resetCommons () {
      this.$store.dispatch('resetAllState')
    },
    async login () {
      this.$v.form.$touch()
      if (this.$v.form.$error || this.loading === true) {
        return
      }

      console.log('login', this.form)
      this.loading = true
      await this.$store.dispatch('auth/login', this.form)
        .then(res => {
          // this.localNotif()
          // this.localNotif = this.$q.notify({
          //   color: 'positive',
          //   icon: 'mdi-check',
          //   message: res,
          //   timeout: 1500
          // })
          this.$router.replace('/home')
        }).catch(err => {
          console.log(err)
          // this.localNotif()
          // this.localNotif = this.$q.notify({
          //   color: 'negative',
          //   icon: 'mdi-alert',
          //   message: err,
          //   timeout: 1000
          // })
        }).finally(_ => {
          this.loading = false
        })
    },
    todo () {
      this.localNotif()
      this.localNotif = this.$q.notify({ color: 'info', icon: 'mdi-information-outline', message: 'TODO', timeout: 1000 })
    },
    fetchUsersfetchUsers () {
      this.loading = true
      this.$store.dispatch('commons/getUsers')
        .then(res => { this.$appUtils.log(res) })
        .catch(_ => void 0) // do nothing
        .finally(_ => { this.loading = false })
    },
    exitApp (evt) {
      console.log(`backbuttom ${JSON.stringify(window.location.hash)}`)
      console.log('EXIT')
      window.plugins.appMinimize.minimize()
    }
  },
  created () {
    if (this.$store.state.commons.isAuth) {
      this.$q.notify({ icon: 'mdi-information-outline', color: 'info', message: 'Already logged in, moving to home.', timeout: 2500 })
      this.$router.replace('/home')
    }
  },
  mounted () {
    this.subAgent && (this.showLogo = false)
    setTimeout(() => {
      this.showLogo = false
    }, 1000)

    if (this.$q.platform.is.cordova) {
      console.log('MOUNTED')
      document.addEventListener('backbutton', this.exitApp, false)
    }
  },
  beforeDestroy () {
    console.log('APP === destroy')
    if (this.$q.platform.is.cordova) {
      document.removeEventListener('backbutton', this.exitApp, false)
    }
  }
}

</script>

<style scoped>
.main {
  background-color: #268fec;
  background-repeat: no-repeat;
  background-size: cover;
}

.formContainer {
  width: 500px;
  max-width: 90vw;
  border: solid lightgrey 1px;
  padding: 20px;
  overflow: hidden;
  border-radius: 70px;
}
</style>
