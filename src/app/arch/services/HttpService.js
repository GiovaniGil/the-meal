import axios from 'axios';
import Env from '@/plugins/env';

const httpService = axios.create({
  baseURL: Env.BASE_API_URL || '/',
});

// httpService.interceptors.request.use(/* istanbul ignore next */ (config) => {
//   const configure = config;
//   const token = getToken();
//   if (token) {
//     configure.headers.Authorization = `Bearer ${token}`;
//   }
//   return configure;
// });

// httpService.interceptors.request.use(/* istanbul ignore next */(config) => {
//   const configure = config;

//   configure.headers.common['x-api-key'] = 'key_cardhub_development';

//   return configure;
// });

export default httpService;
