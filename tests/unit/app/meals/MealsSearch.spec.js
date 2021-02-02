import '@test/base-test';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import MealsSearch from 'App/meals/MealsSearch';

function factory(value) {
  const vuetify = new Vuetify();
  const div = document.createElement('div');
  document.body.appendChild(div);
  return mount(MealsSearch, {
    vuetify,
    attachTo: div,
    sync: false,
    mocks: {
      $route: { params: {} },
    },
    propsData: {
      value,
    },
  });
}

describe('MealsSearch.vue', () => {
 it('Is a Vue Instance', () => {
   const wrapper = factory();
   expect(wrapper).toBeTruthy();
   wrapper.destroy();
 });
  
  it('verifying if its emiting event when leaving field', async () => {
    const wrapper = factory();
    const getDataSpy = jest.spyOn(wrapper.vm, 'setSearch');
    const inputSearch = wrapper.find('#searchField');
    
    inputSearch.trigger('blur');
    await wrapper.vm.$nextTick();

    expect(getDataSpy).toBeCalled();
    wrapper.destroy();
  });

  it('verifying if its emiting event when setting value', async () => {
    const wrapper = factory('teste');
    expect(wrapper.vm.getValue).toEqual('teste');
    
    wrapper.vm.getValue = 'test';
    expect(wrapper.emitted('input')).toBeTruthy();
    
    wrapper.vm.getValue = null;
    expect(wrapper.emitted('input')).toBeTruthy();
    wrapper.destroy();
  });  
});
