import axios from "axios";
import { BASE_URL } from "./url.con";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const cubicApi = {
  get: (url, params) => instance.get(url, { params }),
  post: (url, data) => instance.post(url, data),
  patch: (url, data) => instance.patch(url, data),
  put: (url, data) => instance.put(url, data),
  delete: (url) => instance.delete(url),
};
