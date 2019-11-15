<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      color="primary"
      label="Dropdown Button"
      v-model="menu"
    >
      <q-list>
        <!-- <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Photos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Videos</q-item-label>
          </q-item-section>
        </q-item>-->
        <q-item
          clickable
          v-close-popup
          @click="onItemClick"
          :key="1"
        >
          <q-item-section>
            <q-item-label>
              <test />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <div class="row justify-between q-gutter-md">
      <div class="col bg-primary">Some content....</div>
      <div class="col bg-secondary">Some content2...</div>
    </div>
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        text-color="testBrand"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['doing fine, how r you?']"
        stamp="4 minutes ago"
        text-color="testBrand"
        bg-color="testBrand"
      />
    </div>
    <div class="q-pa-md">
      <q-input
        v-model.number="model"
        type="number"
        filled
        style="max-width: 200px"
      />
    </div>
  </div>
</template>
<script>
import test from 'components/dropdown'
export default {
  components: {
    test
  },
  data () {
    return {
      menu: false,
      model: 10
    }
  },
  methods: {
    onItemClick () {
      console.log('Clicked on an Item')
    }
  }
}
</script>
<style lang="stylus" scoped>
.bg-myBrand {
  background: #dbe5f1;
}

.text-myBrand {
  color: $primary;
}
</style>
