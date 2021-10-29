<template>
  <div class="q-pa-sm q-mt-md row justify-center">
    <form class="q-gutter-md">
      <q-input
        outlined
        v-validate="'required|email'"
        v-model="form.email"
        label="Email"
        name="Email"
        :error="errors.has('Email')"
        :error-message="errors.first('Email')"
        bottom-slots
        @blur="$validator.validate('Email')"
      />
      <q-input
        outlined
        v-validate="'required'"
        v-model="form.username"
        label="Username"
        name="Username"
        :error="errors.has('Username')"
        :error-message="errors.first('Username')"
        bottom-slots
        @blur="$validator.validate('Username')"
      />
      <q-select
        outlined
        v-model="form.gender"
        :options="title"
        v-validate="'required'"
        label="Title"
        name="Title"
        :error="errors.has('Title')"
        :error-message="errors.first('Title')"
        @blur="$validator.validate('Title')"
      />
      <q-field
        outlined
        v-model="form.image"
        label="Profile Image"
        name="Profile Image"
        v-validate="'required'"
        :error="errors.has('Profile Image')"
        :error-message="errors.first('Profile Image')"
        bottom-slots
        @blur="$validator.validate('Profile Image')"
        hint="Pick an image file."
      >
        <template v-slot:control>
          <div class="q-pt-md row full-width">
            <div class="col-12 row items-center justify-center">
              <q-img
                :src="form.image ? form.image : ''"
                contain
                style="width: 250px;"
              />
            </div>
            <div class="col-12 row justify-end">
              <div class="q-px-sm">
                <input
                  ref="profileFilePicker"
                  type="file"
                  style="display:none"
                  accept="image/png, image/jpeg"
                  @change="chooseProfileImg"
                />
                <q-btn
                  icon="mdi-folder-image"
                  flat
                  color="primary"
                  round
                  @click="$refs.profileFilePicker.click()"
                />
                <q-btn
                  dense
                  flat
                  round
                  color="primary"
                  icon="mdi-close-circle-outline"
                  @click="form.image = ''"
                />
              </div>
            </div>
          </div>
        </template>
      </q-field>
      <q-field
        outlined
        v-model="form.signature"
        label="Signature"
        name="Signature"
        v-validate="'required'"
        :error="errors.has('Signature')"
        :error-message="errors.first('Signature')"
        bottom-slots
        @blur="$validator.validate('Signature')"
        hint="Write your signature using your mouse."
      >
        <template v-slot:control>
          <div class="q-pt-md row full-width">
            <div class="col-12 row justify-center">
              <VueSignaturePad
                style="border: lightgrey 1px solid;border-radius: 5px"
                width="300px"
                height="200px"
                ref="signaturePad"
              />
            </div>
            <div class="col-12 row justify-end">
              <div class="q-pa-sm">
                <q-btn
                  dense
                  flat
                  round
                  color="primary"
                  icon="mdi-content-save-outline"
                  @click="saveSignature"
                />
                <q-btn
                  dense
                  flat
                  round
                  color="primary"
                  icon="mdi-undo-variant"
                  @click="$refs.signaturePad.undoSignature()"
                />
                <q-btn
                  dense
                  flat
                  round
                  color="primary"
                  icon="mdi-close-circle-outline"
                  @click="
                    $refs.signaturePad.clearSignature()
                    form.signature = ''
                  "
                />
              </div>
            </div>
          </div>
        </template>
      </q-field>

      <div>
        <q-btn
          label="Post"
          type="submit"
          color="primary"
          class="full-width"
          @click.prevent="submit"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { getBase64 } from 'assets/utils/app-utils'

export default {
  data () {
    return {
      form: {
        email: '',
        username: '',
        image: null,
        signature: ''
      },
      title: ['Mr.', 'Mrs.', 'Ms.'],
      submitBtnLoading: false,
      submitBtnState: false,
      errorMsgs: []
    }
  },
  methods: {
    async submit () {
      const noErrs = await this.$validator.validate()
      if (!noErrs) {
        this.$q.notify({
          color: 'negative',
          message: 'There are errors in your fields.'
        })
        this.errorMsgs = this.$validator.errors.items.map(v => v.msg)
        console.log('error messages =>', this.errorMsgs)
        // TODO: QBanner Wrapper to collect all error messages
        return
      }
      this.errorMsgs = []
      this.$q.notify({
        color: 'positive',
        message: 'Submitted.'
      })
    },
    chooseProfileImg (e) {
      const file = e.target.files[0]
      getBase64(file).then(data => {
        this.form.image = data
      }).catch(() => {
        this.form.image = null
        this.$q.notify({
          type: 'negative',
          message: 'Failed to fetch file, please try a different one.'

        })
      })
    },
    saveSignature () {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      if (!isEmpty) {
        this.form.signature = data
      }
    }
  }

}
</script>

<style>
</style>
