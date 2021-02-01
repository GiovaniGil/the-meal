import CrudRequest from 'Arch/crud/CrudRequest';

export default class MealsRequest extends CrudRequest {
  static baseUrl() {
    return 'https://www.themealdb.com/api/json/v1/1/search.php';
  }
}
