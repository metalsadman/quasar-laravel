<template>
  <q-page class="flex flex-center">
    <div class="column justify-center items-center">
      <div>
        <h5>Quasar Laravel Integration</h5>
      </div>
      <div>
        <img
          alt="Quasar logo"
          src="~assets/quasar-logo-full.svg"
        >
      </div>
      <div>
        <p>
          Make an api request to Laravel <i>/api/test</i><br />
          <sub>Before you need to run <i>artisan serve</i></sub>
        </p>
        <q-btn
          :loading="loading"
          :color="color"
          @click="makeRequest"
        >
          make an api request
        </q-btn>
      </div>
      <div>
        <code>
          {{ response }}
        </code>
      </div>
    </div>
  </q-page>
</template>

<style></style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      color: 'primary',
      response: '',
      loading: false
    }
  },
  created () {
    console.log('hey index.vue')
  },
  methods: {
    // async makeRequest () {
    //   let response
    //   let color = 'negative'
    //   this.loading = true

    //   try {
    //     response = ''
    //     let req = await fetch(process.env.api + '/test')

    //     if (!req.ok) throw new Error('error request')

    //     let {data} = await req.json()
    //     response = data
    //     color = 'positive'
    //   } catch (err) {
    //     console.log(err)
    //     response = err.message
    //   }

    //   setTimeout(() => {
    //     this.response = response
    //     this.color = color
    //     this.loading = false
    //   }, 700)
    // }
    makeRequest () {
      //   let response
      //   let color = 'negative'
      this.loading = true
      this.$axios
        .get('/test')
        .then(res => {
          console.log('res', res)
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          console.log('err', err)
        })

      //   try {
      //     response = ''
      //     let req = await fetch(process.env.api + '/test')

      //     if (!req.ok) throw new Error('error request')

      //     let {data} = await req.json()
      //     response = data
      //     color = 'positive'
      //   } catch (err) {
      //     console.log(err)
      //     response = err.message
      //   }

      //   setTimeout(() => {
      //     this.response = response
      //     this.color = color
      //     this.loading = false
      //   }, 700)
    }
  }
}
</script>
