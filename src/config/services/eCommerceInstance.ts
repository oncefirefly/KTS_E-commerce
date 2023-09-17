import axios from 'axios';
import { apiBaseURL } from 'config/utils/apiBaseURL';

export const eCommerceInstance = axios.create({
  baseURL: apiBaseURL,
});
