<template>
  <content-loader
    :height="36"
    :width="300"
    :speed="2"
    primaryColor="#c5c5c5"
    secondaryColor="#e9e9e9"
  >
    <rect
      x="120"
      y="6"
      rx="3"
      ry="3"
      width="140"
      height="24"
    />
    <rect
      x="0"
      y="6"
      rx="3"
      ry="3"
      width="110"
      height="24"
    />
  </content-loader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  }
}
</script>
