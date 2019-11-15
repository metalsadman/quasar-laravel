<template>
  <q-page
    padding
    class="row justify-center"
  >
    <div class="col-12 col-sm-6">
      <q-btn
        label="test server"
        @click="testServer"
        :loading="loading"
      />
      <p class="text-h6">Test server response: {{ testResponse.resp }}</p>
      <p class="text-caption">
        If server error response, open this sandbox ->
        <a
          target="_blank"
          href="https://codesandbox.io/s/b9g95"
        >Test Node server</a>
        to start the node server. You have to keep the tab open since the
        sandbox server will shut down/hibernate after some time or when the
        server page becomes inactive.
      </p>
    </div>
    <div class="col-12 col-sm-6">
      <base-text-field
        v-model="url"
        label="Test URL"
        hint="Enter endpoint for GET request"
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
          this.notif = this.$q.notify({ color: 'positive', message: 'Server responded' })
        })
        .catch(e => {
          this.loading = false
          this.notif = this.$q.notify({ color: 'negative', message: e.message })
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
