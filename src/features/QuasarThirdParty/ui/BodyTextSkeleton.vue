<template>
  <content-loader
    :height="148"
    :width="400"
    :speed="2"
    primaryColor="#c5c5c5"
    secondaryColor="#e9e9e9"
  >
    <rect
      x="1"
      y="0"
      rx="3"
      ry="3"
      width="110"
      height="18"
    />
    <rect
      x="120"
      y="0"
      rx="3"
      ry="3"
      width="270"
      height="18"
    />

    <rect
      x="1"
      y="30"
      rx="3"
      ry="3"
      width="270"
      height="18"
    />
    <rect
      x="280"
      y="30"
      rx="3"
      ry="3"
      width="120"
      height="18"
    />

    <rect
      x="1"
      y="60"
      rx="3"
      ry="3"
      width="120"
      height="18"
    />
    <rect
      x="130"
      y="60"
      rx="3"
      ry="3"
      width="228"
      height="18"
    />

    <rect
      x="1"
      y="90"
      rx="3"
      ry="3"
      width="370"
      height="18"
    />

    <rect
      x="1"
      y="120"
      rx="3"
      ry="3"
      width="90"
      height="18"
    />
    <!-- <rect x="1" y="120" rx="3" ry="3" width="378" height="18" /> -->

    <!-- <rect x="1" y="150" rx="3" ry="3" width="227.8" height="18" />
    <rect x="238" y="150" rx="3" ry="3" width="110" height="18" /> -->
    <!-- <rect x="480" y="150" rx="3" ry="3" width="109.65" height="18" /> -->

    <!-- <rect x="1" y="142.2" rx="3" ry="3" width="109.65" height="18" />
    <rect x="122" y="142" rx="3" ry="3" width="109.65" height="18" />
    <rect x="235.94" y="140.79" rx="3" ry="3" width="151.92" height="18" /> -->
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
