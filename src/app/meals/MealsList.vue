<template>
    <div>
      <v-container>
        <v-row>
          <v-col sm="12" md="3" lg="4">
            <meals-search @search="search" v-model="strSearch"/>
          </v-col>
        </v-row>
        <v-fade-transition mode="out-in">
          <v-row>
            <v-col 
              v-for="meal in items"
              cols="12"
              sm="12"
              md="4"
              :key="meal.id"
            >
              <meal-card 
                :strArea="meal.strArea"
                :strMeal="meal.strMeal"
                :strMealThumb="meal.strMealThumb"
                :strCategory="meal.strCategory"
                :strInstructions="meal.strInstructions"
              />
            </v-col>
          </v-row>
        </v-fade-transition>
      </v-container>
    </div>
</template>

<script>
import MealCard from './MealCard.vue';
import MealsSearch from './MealsSearch.vue';
import MealsRequest from '@/domain/meals/MealsRequest';

export default {
    name: 'MealsList',
    components: { 
      MealCard,
      MealsSearch,
    },
    data: () => ({
      items: [],
      strSearch: '',
      error: '',
    }),
    methods: {
      search() {
        this.getMeals();
      },
      getMeals() {
        const loader = this.$loading.show();
        if(!this.strSearch) {
          this.items = [];
          loader.hide();
          return;
        }

        MealsRequest
          .list( { s: this.strSearch} )
          .then((response) => {
            const { data } = response;
            this.items = data.meals;
          })
          .catch(({ error }) => {
            this.error = error.message;
          })
          .finally(() => {
            setTimeout( () => {
              loader.hide();
            }, 2000);
          });    
      },
    },
    created() {
      this.getMeals();
    }
};
</script>

<style lang="sass" scoped>

</style>