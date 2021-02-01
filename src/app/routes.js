export default [
  {
    path: '/',
    name: 'index',
    component: () => import('App/meals/MealsList.vue'),
  },
];
