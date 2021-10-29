<template>
  <div>
    <q-item-label header>Sample Modules</q-item-label>
    <q-item
      clickable
      to="/component-samples"
    >
      <q-item-section avatar>
        <q-icon name="school" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Select Sample</q-item-label>
        <q-item-label caption>QSelect Extension</q-item-label>
      </q-item-section>
    </q-item>
    <!-- <q-item clickable to="/autocomplete">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Autocomplete Sample</q-item-label>
            <q-item-label caption>samp</q-item-label>
          </q-item-section>
        </q-item>-->
    <q-item
      clickable
      to="/form-validations"
    >
      <q-item-section avatar>
        <q-icon name="chat" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Form Input Samples</q-item-label>
        <q-item-label caption>Quasar Form Input Extension with Vuelidate</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      to="/dialog-sample"
    >
      <q-item-section avatar>
        <q-icon name="record_voice_over" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Dialog Sample</q-item-label>
        <q-item-label caption>Dialog Sample</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      to="/axios-node-test"
    >
      <q-item-section avatar>
        <q-icon name="rss_feed" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Test Sandbox Server</q-item-label>
        <q-item-label caption>Emulate api call using axios</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      to="/table-extensions"
    >
      <q-item-section avatar>
        <q-icon name="rss_feed" />
      </q-item-section>
      <q-item-section>
        <q-item-label>QTable Extension</q-item-label>
        <q-item-label caption>QTable Extension Sample</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      to="/quasar-third-party"
    >
      <q-item-section avatar>
        <q-icon name="rss_feed" />
      </q-item-section>
      <q-item-section>
        <q-item-label>QComponents w/ Third Party</q-item-label>
        <q-item-label caption>This is just a drill.</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
