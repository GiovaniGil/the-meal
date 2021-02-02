import '@test/base-test';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import MealsList from 'App/meals/MealsList';
import MealsRequest from 'Domain/meals/MealsRequest';
import MealsSearch from 'App/meals/MealsSearch.vue';

jest.useFakeTimers();
jest.mock('Domain/meals/MealsRequest', () => ({
  list: jest.fn().mockResolvedValue({
    data: {
      meals: [
        {
          idMeal: '52795',
          strMeal: 'Chicken Handi',
          strDrinkAlternate: null,
          strCategory: 'Chicken',
          strArea: 'Indian',
          strInstructions:
            'Take a large pot or wok, big enough to cook all the chicken, and heat the oil in it. Once the oil is hot, add sliced onion and fry them until deep golden brown. Then take them out on a plate and set aside.\r\nTo the same pot, add the chopped garlic and saut\u00e9 for a minute. Then add the chopped tomatoes and cook until tomatoes turn soft. This would take about 5 minutes.\r\nThen return the fried onion to the pot and stir. Add ginger paste and saut\u00e9 well.\r\nNow add the cumin seeds, half of the coriander seeds and chopped green chillies. Give them a quick stir.\r\nNext goes in the spices \u2013 turmeric powder and red chilli powder. Saut\u00e9 the spices well for couple of minutes.\r\nAdd the chicken pieces to the wok, season it with salt to taste and cook the chicken covered on medium-low heat until the chicken is almost cooked through. This would take about 15 minutes. Slowly saut\u00e9ing the chicken will enhance the flavor, so do not expedite this step by putting it on high heat.\r\nWhen the oil separates from the spices, add the beaten yogurt keeping the heat on lowest so that the yogurt doesn\u2019t split. Sprinkle the remaining coriander seeds and add half of the dried fenugreek leaves. Mix well.\r\nFinally add the cream and give a final mix to combine everything well.\r\nSprinkle the remaining kasuri methi and garam masala and serve the chicken handi hot with naan or rotis. Enjoy!',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
        }
      ],
    },
  }),
}));

function clearMocks() {
  MealsRequest.list.mockClear();
}

function factory($loading) {
  const vuetify = new Vuetify();
  const div = document.createElement('div');
  document.body.appendChild(div);
  return mount(MealsList, {
    vuetify,
    attachTo: div,
    sync: false,
    stubs: ['meals-search'],
    mocks: {
      $loading,
      $route: { params: {} },
    },
  });
}

describe('MealsList.vue', () => {
  let $loading;
  const hide = jest.fn();
  const show = jest.fn().mockReturnValue({ hide });

  afterEach(() => {
    clearMocks();
  });

  beforeEach(() => {
    $loading = {
      show,
      hide
    };
    show.mockClear();
    hide.mockClear();
  });

  it('Is a Vue Instance', () => {
    const wrapper = factory($loading);
    expect(wrapper).toBeTruthy();
    wrapper.destroy();
  });

  it('Verifying if its searching for the term', async () => {
    const wrapper = factory($loading);
    wrapper.vm.strSearch = 'meat';
    
    const input = wrapper.findComponent(MealsSearch);
    input.vm.$emit('search');
    await wrapper.vm.$nextTick();
    jest.runOnlyPendingTimers();
    expect(wrapper.vm.items.length).toBe(1);
    wrapper.destroy();
  });

  it('Verifying if its catching erro on endpoint call', async () => {
    MealsRequest.list.mockRejectedValue({
      error: {
        message: 'error',
      },
    });
    const wrapper = factory($loading);
    wrapper.vm.strSearch = 'meat';

    const input = wrapper.findComponent(MealsSearch);
    input.vm.$emit('search');
    await wrapper.vm.$nextTick();
    jest.runOnlyPendingTimers();
    expect(wrapper.vm.items.length).toBe(0);
    expect(wrapper.vm.error).toBe('error');
    wrapper.destroy();
  });
});
