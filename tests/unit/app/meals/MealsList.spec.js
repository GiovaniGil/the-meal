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
          strCategory: 'Chicken',
          strArea: 'Indian',
          strInstructions:
            'Take a large pot or wok, big enough to cook all the...',
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

  it('It is a Vue Instance', () => {
    const wrapper = factory($loading);
    expect(wrapper).toBeTruthy();
    wrapper.destroy();
  });

  it('Verifying if it is searching for the term', async () => {
    const wrapper = factory($loading);
    wrapper.vm.strSearch = 'meat';
    
    const input = wrapper.findComponent(MealsSearch);
    input.vm.$emit('search');
    await wrapper.vm.$nextTick();
    jest.runOnlyPendingTimers();
    expect(wrapper.vm.items.length).toBe(1);
    wrapper.destroy();
  });

  it('Verifying if it is catching error on endpoint call', async () => {
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

  it('Verifying if it is paginating', async () => {
    const wrapper = factory($loading);
    const getMealsSpy = jest.spyOn(wrapper.vm, 'getMeals');
    wrapper.vm.pagination.page = 2
    await wrapper.vm.$nextTick();
    expect(getMealsSpy).toBeCalled();
    wrapper.destroy();
  });
});
