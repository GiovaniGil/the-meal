<template>
    <div>
      <v-container 
        class="fill-height"
        style="margin-bottom: 40px"
      >
        <v-layout
          column
        >
          <v-row>
               <v-app-bar
                app height="80px"
                color="white"
              >
                  <v-toolbar-title>
                    The Meal
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <meals-search
                    @search="search"
                    v-model="strSearch"
                    class="mx-8"
                  />
                </v-app-bar>
          </v-row>
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
        </v-layout>
      </v-container>
      <v-footer padless>
        <v-layout
          align-baseline
          justify-center
          my-8
          py-7
        >
          <v-flex
            shrink
          >
            <v-pagination
              v-model="pagination.page"
              :length="pages"
              :total-visible="7"
              circle
            />
          </v-flex>
        </v-layout>
      </v-footer>
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
      pagination: {
        page: 1,
      },
      pages: 0,
    }),
    methods: {
      search() {
        this.getMeals();
      },
      getMeals() {
        const loader = this.$loading.show();
        MealsRequest
          .list( this.strSearch, { currentPage: this.pagination.page } )
          .then((response) => {
            const { data } = response;
            this.pages = data.pages;
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
    watch: {
      strSearch: {
        handler() {
          this.pagination.page = 1;
        },
      },
      'pagination.page': {
        handler() {
          this.getMeals();
        },
      },
    },
    created() {
      this.getMeals();
    }
};
</script>
