import '@test/base-test';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import MealInstructionsDialog from 'App/meals/MealInstructionsDialog';

function factory(dialog) {
  const vuetify = new Vuetify();
  const div = document.createElement('div');
  document.body.appendChild(div);
  return mount(MealInstructionsDialog, {
    vuetify,
    attachTo: div,
    sync: false,
    mocks: {
      $route: { params: {} },
    },
    propsData: {
      dialog,
    },
    stubs: ['v-dialog'],
  });
}

describe('MealInstructionsDialog.vue', () => {
  it('It is a Vue Instance', () => {
    const wrapper = factory();
    expect(wrapper).toBeTruthy();
    wrapper.destroy();
  });

  it('verifying if it is emiting event when canceling', async () => {
    const dialog = false;
    const wrapper = factory(dialog);
    const cancelSpy = jest.spyOn(wrapper.vm, 'cancel');
    const inputSearch = wrapper.find('#cancelBtn');

    inputSearch.trigger('click');
    await wrapper.vm.$nextTick();

    expect(cancelSpy).toBeCalled();
    expect(wrapper.vm.dialog).toBeFalsy();
    expect(wrapper.emitted('update:dialog')).toBeTruthy();
    
    wrapper.destroy();
  });
});
