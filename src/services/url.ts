// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

const isDev = process.env.NODE_ENV === 'development';

export const getUrl = (path: string) => {
  console.log(PROXY_ENV, API_HOST);
  const isProxy = PROXY_ENV === 'true';
  return isDev && isProxy ? path : API_HOST + path;
};

export const USER_LOGIN = '/auth/userLogin';

export const GET_USER_DATA = '/auth/getUserData';

export async function post(
  url: string,
  data: { [key: string]: any },
  headers?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    data?: any;
    code?: string | number;
    msg?: string;
  }>(getUrl(url), {
    method: 'POST',
    data,
    ...options,
    headers: { 'Content-Type': 'application/json;charset=UTF-8', ...options?.headers, ...headers },
  });
}
