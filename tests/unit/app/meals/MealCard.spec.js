import '@test/base-test';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import MealCard from 'App/meals/MealCard';

function factory(mocks) {
  const vuetify = new Vuetify();
  const div = document.createElement('div');
  document.body.appendChild(div);
  return mount(MealCard, {
    vuetify,
    attachTo: div,
    sync: false,
    mocks: {
      $route: { params: {} },
      ...mocks,
    },
  });
}

describe('MealCard.vue', () => {
  it('It is a Vue Instance', () => {
    const wrapper = factory();
    expect(wrapper).toBeTruthy();
    wrapper.destroy();
  });
});
