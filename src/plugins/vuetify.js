import Vue from 'vue';
import pt from 'vuetify/es5/locale/pt';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#A91314',
        secondary: '#F28F22',
        accent: '#82B1FF',
        error: '#A91314',
        info: '#2196F3',
        success: '#3FD65F',
        warning: '#FFBF00',
      },
    },
  },
  lang: {
    locales: { pt },
    current: 'pt',
  },
});
