<template>
  <q-page padding>
    <div class="row text-center">Quasar Components using Third Party Vue Components</div>
    <!-- <q-btn @click="dialog = true" label="Show Form Dialog"/>
    <q-dialog v-model="dialog" seamless>
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>
        <div>
          <vue-scroll-sample/>
        </div>
        <q-card-section>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>-->
    <!--
  Forked from:
  https://quasar.dev/vue-components/stepper#Example--Vertical
    -->
    <div id="q-app">
      <div class="q-pa-md">
        <q-stepper
          v-model="step"
          vertical
          color="primary"
          animated
        >
          <q-step
            :name="1"
            title="Select campaign settings Select campaign settings Select campaign settings Select Select campaign settings Select campaign settings Select campaign settings Select Select campaign settings Select campaign settings Select campaign settings Select Select campaign settings Select campaign settings Select campaign settings Select Select campaign settings Select campaign settings Select campaign settings Select campaign settings"
            icon="settings"
            :done="step > 1"
          >
            For each ad campaign that you create, you can control how much you're willing to
            spend on clicks and conversions, which networks and geographical locations you want
            your ads to show on, and more.
            <q-stepper-navigation>
              <q-btn
                @click="step = 2"
                color="primary"
                label="Continue"
              ></q-btn>
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group Create an ad group "
            caption="Optional"
            icon="create_new_folder"
            :done="step > 2"
          >An ad group contains one or more ads which target a shared set of keywords.
            <q-stepper-navigation>
              <q-btn
                @click="step = 4"
                color="primary"
                label="Continue"
              ></q-btn>
              <q-btn
                flat
                @click="step = 1"
                color="primary"
                label="Back"
                class="q-ml-sm"
              ></q-btn>
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="3"
            title="Ad template"
            icon="assignment"
            disable
          >This step won't show up because it is disabled.</q-step>

          <q-step
            :name="4"
            title="Create an ad"
            icon="add_comment"
          >
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with
            your ads, find out how to tell if they're running and how to resolve approval issues.
            <q-stepper-navigation>
              <q-btn
                color="primary"
                label="Finish"
              ></q-btn>
              <q-btn
                flat
                @click="step = 2"
                color="primary"
                label="Back"
                class="q-ml-sm"
              ></q-btn>
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      step: 1
    }
  }
}
</script>

<style>
</style>
