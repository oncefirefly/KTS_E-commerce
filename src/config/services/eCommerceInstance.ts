import axios from 'axios';
import { apiBaseURL } from '@config/apiBaseURL';

export const eCommerceInstance = axios.create({
  baseURL: apiBaseURL,
});
