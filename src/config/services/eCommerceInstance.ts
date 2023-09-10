import axios from 'axios';

export const eCommerceInstance = axios.create({
  baseURL: 'https://kts-store-api.glitch.me/api/',
});
