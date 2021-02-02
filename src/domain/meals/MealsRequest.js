import CrudRequest from 'Arch/crud/CrudRequest';
import http from 'Arch/services/HttpService';

export default class MealsRequest extends CrudRequest {
  static baseUrl() {
    return '/v1/meals';
  }
  static list(search, queryParams = {}) {
    return http.get(`${this.baseUrl()}/${search}`, {
      params: queryParams,
    });
  }
}
