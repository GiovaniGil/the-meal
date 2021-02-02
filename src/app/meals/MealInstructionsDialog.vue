<template>
  <v-layout
    row
    justify-center
  >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="38em"
    >
      <v-card
        pa-5
      >
        <v-card-title class="py-8">
          {{ strMeal }}
        </v-card-title>
        <v-card-text class="pt-0">
          <p v-html="cmptdStrInstructions" />
        </v-card-text>
        <v-card-actions class="py-8">
          <v-spacer />
          <v-btn
            id="cancelBtn"
            class="primary"
            @click.native="cancel()"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

export default {
  name: 'MealInstructionsDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    strMeal: {
      type: String,
      default: '',
    },
    strInstructions: {
      type: String,
      default: '',
    },
  },
  data: () => ({

  }),
  methods: {
    cancel() {
      this.$emit('update:dialog', false);
    },
  },
  computed: {
    cmptdStrInstructions() {
      return this.strInstructions.replace(/(?:\r\n|\r|\n)/g, '<br /><br />');
    },
  }
};
</script>