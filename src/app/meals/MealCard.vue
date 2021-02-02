<template>
  <v-card
    class="mx-auto"
    min-height="550"
  >
    <v-img
      :src="strMealThumb"
      aspect-ratio="1"
    ></v-img>

    <v-card-title>
      {{ strMeal }}
    </v-card-title>

    <v-card-subtitle>
      <span>Area: {{ strArea }}</span>
      <p>Category: {{ strCategory }}</p>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="green lighten-2"
        text
        @click="show = !show"
      >
        Details
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <meal-instructions-dialog 
      :dialog.sync="show" 
      :key="strMeal" 
      :strMeal="strMeal"
      :strInstructions="strInstructions"
    />
    <!-- <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ strInstructions }}
        </v-card-text>
      </div>
    </v-expand-transition> -->
  </v-card>
</template>
<script>
  import MealInstructionsDialog from './MealInstructionsDialog.vue';

  export default {
    name: 'MealCard',
    components: {
      MealInstructionsDialog,
    },
    props: {
      strMeal: {
        type: String,
        default: '',
      },
      strMealThumb: {
        type: String,
        default: '',
      },
      strCategory: {
        type: String,
        default: '',
      },
      strArea: {
        type: String,
        default: '',
      },
      strInstructions: {
        type: String,
        default: '',
      },
    },
    data: () => ({
      show: false,
    }),
  }
</script>
