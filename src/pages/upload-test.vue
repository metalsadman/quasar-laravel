<template>
  <q-page class="row justify-center">
    <q-uploader
      extensions=".jpg, .png"
      multiple
      :upload-factory="uploadFile"
      ref="uploader"
      auto-expand
      url=""
      stack-label="upload image"
    />
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      uploadPercentage: 0
    }
  },
  methods: {
    uploadFile (file, updateProgress) {
      const fd = new FormData()
      fd.append('file', file)
      updateProgress(0)
      return new Promise((resolve, reject) => {
        this.$axios.post(process.env.api + '/upload1',
          fd,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              //   console.log('progressEvent', progressEvent)
              //   console.log('current progress', progressEvent.loaded / progressEvent.total)
              //   console.log('current progress parsed', parseFloat(progressEvent.loaded / progressEvent.total).toFixed(2))
              //   console.log('current progress parsed as num', parseFloat((progressEvent.loaded / progressEvent.total).toFixed(2)))
              //   console.log('using round', Math.round((progressEvent.loaded / progressEvent.total) * 100) / 100)
              //   console.log('current progress percentage', Math.min(99, parseInt((progressEvent.loaded / progressEvent.total) * 100, 10)))
              // updateProgress(progressEvent.loaded / progressEvent.total) // correct way
              updateProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100) / 100)
            }
          })
          .then(res => {
            resolve(file)
          })
          .catch(err => reject(err))
      })
    }
  }
}
</script>

<style>
</style>
