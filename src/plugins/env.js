const BASE_API_URL = 'https://the-meal-api-test.herokuapp.com'; // default
module.exports = {
  BASE_API_URL,
  install: (Vue, config) => {
    const vueInstance = Vue;
    vueInstance.env = {};
    vueInstance.env.BASE_API_URL = config.BASE_API_URL || BASE_API_URL;

    vueInstance.prototype.$env = vueInstance.env;
  },
};
