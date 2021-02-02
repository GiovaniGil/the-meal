import MealsRequest from '@/domain/meals/MealsRequest';
import testCrudRequest from '@test/helpers/testCrudRequest';

describe('MealsRequest.js', () => {
  it('Should return a promisse on call integration methods', async () => {
    testCrudRequest(MealsRequest);
  });
});
