<template>
  <q-page
    padding
    class="row justify-center"
  >
    <div class="col-12 col-sm-6">
      <q-btn
        label="Test Laravel API"
        @click="testServer"
        :loading="loading"
      />
      <p class="text-h6">Laravel Api Response: {{ testResponse }}</p>
    </div>
    <div class="col-12 col-sm-6 q-gutter-md">
      <base-text-field
        v-model="url"
        label="Test URL"
        hint="Enter endpoint for GET request. ie. https://codesandbox.io/s/b9g95"
        :val="$v.url"
        @input="$v.url.$touch"
        @blur="$v.url.$touch"
        clearable
        :local-messages="{ url: 'is invalid.' }"
      />
      <q-btn
        label="test url"
        @click="testUrl"
        :loading="loading"
      />
      <p class="text-h6">Test URL response: {{ testUrlResp || '' }}</p>
    </div>
  </q-page>
</template>

<script>
import { required, url } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      testResponse: '',
      loading: false,
      testUrlResp: null,
      url: '',
      notif: () => void 0
    }
  },
  validations: {
    url: { required, url }
  },
  methods: {
    testServer () {
      this.loading = true
      this.testResponse = ''
      // this.notif()
      this.$axios
        .get('/test')
        .then(res => {
          this.loading = false
          this.testResponse = res.data.msg
          // this.notif = this.$q.notify({ color: 'positive', message: 'Server responded' })
        })
        .catch(e => {
          this.loading = false
          // this.notif = this.$q.notify({ color: 'negative', message: e.message })
        })
    },
    testUrl () {
      this.$v.url.$touch()

      if (this.$v.url.$error) {
        return
      }
      this.loading = true
      this.$axios
        .get(this.url)
        .then(res => {
          this.loading = false
          this.testUrlResp = res.data
          // this.notif = this.$q.notify({ color: 'positive', message: 'Server responded' })
        })
        .catch(e => {
          this.loading = false
          // this.notif = this.$q.notify({ color: 'negative', message: e.message })
        })
    }
  }
}
</script>

<style>
</style>
