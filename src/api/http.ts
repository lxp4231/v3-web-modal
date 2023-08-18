/* eslint-disable no-param-reassign */
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { HttpData, ObjectType } from './code';
import { shortError } from '@/utils/message';
import { Storage } from '@/utils/storage';
import { getCookie } from '@/utils/index';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});

request.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const token = getCookie('access_token') || null;
      if (token) {
        config.headers.Authorization = token;
      }
    }
    if (!import.meta.env.VITE_APP_BASE_URL) {
      config.url = `/api${config.url}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);
request.interceptors.response.use(
  async (response) => {
    if (response.config.responseType === 'blob') {
      return Promise.resolve(response);
    }
    if (response.data && response.data.code !== 200) {
      if (response.data.code === 401) {
        // 401, token失效
        Storage.clearStorage();
      }
      if (response.data?.error) {
        await shortError(response?.data?.error?.message || '出错了');
      }
    }
    return Promise.resolve(response);
  },
  async (error) => {
    try {
      await shortError(error?.response?.data?.error?.message || '出错了');
      console.log(error?.response);

      if (error?.response?.status === 401) {
        // 401, token失效
        Storage.clearStorage();
      }
    } catch (e) {
      console.log(e);
    }
    return Promise.reject(error);
  },
);
axiosRetry(request, { retries: 1 });

type HttpReturnType<T> = Promise<HttpData<T>>;
const httpRequest = async <T>(config: any): HttpReturnType<T> => {
  return new Promise((resolve, reject) => {
    request(config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const GET = <T>(url: string, params?: ObjectType): HttpReturnType<T> => {
  return httpRequest({
    method: 'GET',
    url,
    params,
  });
};

const POST = <T>(url: string, params?: ObjectType): HttpReturnType<T> => {
  return httpRequest({
    method: 'POST',
    url,
    data: JSON.stringify(params),
  });
};
const PUT = <T>(url: string, params?: ObjectType): HttpReturnType<T> => {
  return httpRequest({
    method: 'PUT',
    url,
    data: JSON.stringify(params),
  });
};
const DELETE = <T>(url: string, params?: ObjectType): HttpReturnType<T> => {
  return httpRequest({
    method: 'DELETE',
    url,
    data: JSON.stringify(params),
  });
};
export { request, GET, POST, PUT, DELETE };
export default httpRequest;
